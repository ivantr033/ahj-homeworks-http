import createRequest from './api/createRequest';

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor() {
    this.baseUrl = 'http://localhost:7070';
  }

  // GET ?method=allTickets - список тикетов
  list(callback) {
    createRequest({
      url: `${this.baseUrl}/?method=allTickets`,
      method: 'GET',
      callback,
    });
  }

  // GET ?method=ticketById&id=<id> - полное описание тикета
  get(id, callback) {
    createRequest({
      url: `${this.baseUrl}/?method=ticketById&id=${id}`,
      method: 'GET',
      callback,
    });
  }

  // POST ?method=createTicket - создание тикета
  create(data, callback) {
    createRequest({
      url: `${this.baseUrl}/?method=createTicket`,
      method: 'POST',
      data,
      callback,
    });
  }

  // POST ?method=updateById&id=<id> - обновление объекта типа Ticket по id
  update(id, data, callback) {
    createRequest({
      url: `${this.baseUrl}/?method=updateById&id=${id}`,
      method: 'POST',
      data,
      callback,
    });
  }

  // GET ?method=deleteById&id=<id> - удалить объект типа Ticket по id
  delete(id, callback) {
    createRequest({
      url: `${this.baseUrl}/?method=deleteById&id=${id}`,
      method: 'GET',
      callback,
    });
  }
}
