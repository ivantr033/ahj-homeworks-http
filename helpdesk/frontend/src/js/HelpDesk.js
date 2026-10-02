import TicketForm from './TicketForm';
import TicketView from './TicketView';

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketForm = new TicketForm();
    this.ticketView = new TicketView();
    this.listContainer = null;
  }

  init() {
    this.container.innerHTML = `
      <div id="app-container">
        <div class="header-actions">
          <button id="global-add-ticket-btn">Добавить тикет</button>
        </div>
        <div id="tickets-list-container"></div>
      </div>
    `;

    this.listContainer = this.container.querySelector('#tickets-list-container');
    this.bindEvents();
    this.loadTickets();
  }

  bindEvents() {
    const addBtn = this.container.querySelector('#global-add-ticket-btn');
    addBtn.addEventListener('click', () => {
      this.ticketForm.showAdd((formData) => {
        this.ticketService.create(formData, (err) => {
          if (!err) this.loadTickets();
        });
      });
    });

    this.listContainer.addEventListener('click', (e) => {
      const { target } = e;
      const row = target.closest('.ticket-row');
      if (!row) return;

      const { id } = row.dataset;
      const action = target.dataset.action;

      if (action === 'toggle') {
        const checkbox = row.querySelector('.status-checkbox');
        const isChecked = checkbox.classList.contains('checked');
        this.ticketService.update(id, { status: !isChecked }, (err) => {
          if (!err) this.loadTickets();
        });
      } else if (action === 'expand') {
        this.handleExpand(row, id);
      } else if (action === 'edit') {
        this.ticketService.get(id, (err, ticket) => {
          if (!err && ticket) {
            this.ticketForm.showEdit(ticket.name, ticket.description, (formData) => {
              this.ticketService.update(id, formData, (updateErr) => {
                if (!updateErr) this.loadTickets();
              });
            });
          }
        });
      } else if (action === 'delete') {
        this.ticketForm.showDelete(() => {
          this.ticketService.delete(id, (err) => {
            if (!err) this.loadTickets();
          });
        });
      }
    });
  }

  loadTickets() {
    this.ticketService.list((err, tickets) => {
      if (err) {
        this.listContainer.innerHTML = '<p class="ticket-date-stamp" style="text-align:center; padding:16px;">Ошибка сервера</p>';
        return;
      }
      this.listContainer.innerHTML = '';
      if (!tickets || tickets.length === 0) {
        this.listContainer.innerHTML = '<p class="ticket-date-stamp" style="text-align:center; padding:16px;">Нет заявок</p>';
        return;
      }
      tickets.forEach((ticket) => {
        const row = this.ticketView.render(ticket);
        this.listContainer.appendChild(row);
      });
    });
  }

  handleExpand(rowElement, id) {
    const descBody = rowElement.querySelector('.ticket-description-body');
    if (descBody.style.display === 'block') {
      descBody.style.display = 'none';
      return;
    }
    this.ticketService.get(id, (err, ticket) => {
      if (!err && ticket) {
        descBody.innerText = ticket.description || 'Описание отсутствует.';
        descBody.style.display = 'block';
      }
    });
  }
}
