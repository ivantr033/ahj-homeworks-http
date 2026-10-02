/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
export default class TicketView {
  /**
   * Генерирует HTML-разметку для одного тикета
   * @param {Object} ticket - Объект тикета
   * @returns {HTMLElement} - Готовый DOM-элемент
   */
  render(ticket) {
    const row = document.createElement('div');
    row.className = 'ticket-row';
    row.dataset.id = ticket.id;

    const dateObj = new Date(ticket.created);
    const dateStr = `${dateObj.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })} ${dateObj.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    row.innerHTML = `
      <div class="ticket-main-bar">
        <div class="status-checkbox ${ticket.status ? 'checked' : ''}" data-action="toggle"></div>
        <div class="ticket-name-text" data-action="expand">${ticket.name}</div>
        <div class="ticket-date-stamp">${dateStr}</div>
        <button class="action-circle-btn" data-action="edit" title="Редактировать">✎</button>
        <button class="action-circle-btn" data-action="delete" title="Удалить">x</button>
      </div>
      <div class="ticket-description-body" style="display: none;"></div>
    `;

    return row;
  }
}
