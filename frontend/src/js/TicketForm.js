/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.overlay = null;
    this.init();
  }

  init() {
    this.overlay = document.getElementById('modal-overlay');
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.id = 'modal-overlay';

      const modalBox = document.createElement('div');
      modalBox.id = 'modal-box';

      this.overlay.appendChild(modalBox);
      document.body.appendChild(this.overlay);
    }
  }

  showAdd(onSubmit, onCancel) {
    const box = this.overlay.querySelector('#modal-box');
    box.innerHTML = `
      <div class="modal-title-text">Добавить тикет</div>
      <form id="ticket-modal-form">
        <div class="modal-form-group">
          <label>Краткое описание</label>
          <input type="text" id="modal-input-name" required class="modal-input-field" />
        </div>
        <div class="modal-form-group">
          <label>Подробное описание</label>
          <textarea id="modal-input-description" rows="3" required class="modal-input-field" style="resize:none;"></textarea>
        </div>
        <div class="modal-buttons-row">
          <button type="button" id="modal-btn-cancel" class="modal-btn-action">Отмена</button>
          <button type="submit" class="modal-btn-action">Ok</button>
        </div>
      </form>
    `;
    this.bindEvents(onSubmit, onCancel);
  }

  showEdit(name, description, onSubmit, onCancel) {
    const box = this.overlay.querySelector('#modal-box');
    box.innerHTML = `
      <div class="modal-title-text">Изменить тикет</div>
      <form id="ticket-modal-form">
        <div class="modal-form-group">
          <label>Краткое описание</label>
          <input type="text" id="modal-input-name" required class="modal-input-field" value="${name}" />
        </div>
        <div class="modal-form-group">
          <label>Подробное описание</label>
          <textarea id="modal-input-description" rows="3" required class="modal-input-field" style="resize:none;">${description}</textarea>
        </div>
        <div class="modal-buttons-row">
          <button type="button" id="modal-btn-cancel" class="modal-btn-action">Отмена</button>
          <button type="submit" class="modal-btn-action">Ok</button>
        </div>
      </form>
    `;
    this.bindEvents(onSubmit, onCancel);
  }

  showDelete(onConfirm, onCancel) {
    const box = this.overlay.querySelector('#modal-box');
    box.innerHTML = `
      <div class="modal-title-text">Удалить тикет</div>
      <p class="modal-description-text">
        Вы уверены, что хотите удалить тикет? Это действие необратимо.
      </p>
      <div class="modal-buttons-row" style="border-top:1px solid #cbd5e0; padding-top:12px;">
        <button type="button" id="modal-btn-cancel" class="modal-btn-action">Отмена</button>
        <button type="button" id="modal-btn-confirm" class="modal-btn-action">Ok</button>
      </div>
    `;

    this.overlay.style.display = 'flex';

    box.querySelector('#modal-btn-cancel').addEventListener('click', () => {
      this.close();
      if (onCancel) onCancel();
    });

    box.querySelector('#modal-btn-confirm').addEventListener('click', () => {
      this.close();
      if (onConfirm) onConfirm();
    });
  }

  bindEvents(onSubmit, onCancel) {
    this.overlay.style.display = 'flex';
    const form = this.overlay.querySelector('#ticket-modal-form');
    const cancelBtn = this.overlay.querySelector('#modal-btn-cancel');

    cancelBtn.addEventListener('click', () => {
      this.close();
      if (onCancel) onCancel();
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#modal-input-name').value.trim();
      const description = form.querySelector('#modal-input-description').value.trim();
      this.close();
      if (onSubmit) onSubmit({ name, description });
    });
  }

  close() {
    this.overlay.style.display = 'none';
    this.overlay.querySelector('#modal-box').innerHTML = '';
  }
}
