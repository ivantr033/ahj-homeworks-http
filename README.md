# Домашнее задание к занятию "7. Работа с HTTP"

[![Build Status](https://github.com)](https://github.com)

## 🌐 Ссылки на развертывание (GitHub Pages)
*   **HelpDesk (Основное задание):** [Открыть приложение](https://github.io)
*   **Modern Image Manager (Задача со звёздочкой):** [Открыть приложение](https://github.io)

---

## 🛠️ Архитектура проекта и Спецификация API

В рамках данного домашнего задания реализовано два независимых модуля взаимодействия с сервером по протоколу HTTP, демонстрирующих различные архитектурные стили (RPC и REST).

### 📋 1. HelpDesk API (Архитектурный стиль RPC)
Взаимодействие построено на вызове удаленных процедур через передачу названия метода в Query Parameters (`?method=...`). Данные передаются в формате JSON.

#### **CREATE**
*   **[POST]** `http://localhost:7070/?method=createTicket`
    *   *Тело запроса:* JSON-строка (`{ name, description, status: false }`)
    *   *Ответ:* Созданный объект `Ticket` с уникальным ID на сервере.

#### **READ**
*   **[GET]** `http://localhost:7070/?method=allTickets`
    *   *Ответ:* Массив объектов типа `Ticket` (краткое описание, без полного `description`).
*   **[GET]** `http://localhost:7070/?method=ticketById&id=<id>`
    *   *Ответ:* Полный объект `Ticket` (включая детальное поле `description`).

#### **UPDATE**
*   **[POST]** `http://localhost:7070/?method=updateById&id=<id>`
    *   *Тело запроса:* JSON-строка с обновляемыми полями (`{ name, description }` или `{ status }`).
    *   *Ответ:* Обновленный массив всех тикетов.

#### **DELETE**
*   **[GET]** `http://localhost:7070/?method=deleteById&id=<id>`
    *   *Ответ:* Статус `204 No Content` при успешном удалении.

---

### 🖼️ 2. Modern Image Manager (Архитектурный стиль REST)
Взаимодействие построено вокруг ресурса `/files`. Идентификаторы передаются как часть URL-пути, а бинарные данные отправляются через интерфейс `FormData`.

#### **CREATE**
*   **[POST]** `http://localhost:3000/files`
    *   *Тело запроса:* `FormData` с бинарным файлом под ключом `file`.
    *   *Ответ:* Объект созданного файла (`{ file: { id, filename, path } }`).

#### **READ**
*   **[GET]** `http://localhost:3000/files`
    *   *Ответ:* Массив всех загруженных файлов на сервере (`{ files: [...] }`).
*   **[GET]** `http://localhost:3000/files/:id`
    *   *Ответ:* Получение метаданных конкретного файла по его уникальному ID.

#### **DELETE**
*   **[DELETE]** `http://localhost:3000/files/:id`
    *   *Ответ:* Статус `204 No Content` после физического удаления файла с диска сервера.

---

## 🚀 Инструкция по локальному запуску

### 1. Запуск Backend серверов:
```bash
# Запуск HelpDesk Backend (Порт 7070)
cd helpdesk/backend
npm install
npm start

# Запуск Image Manager Backend (Порт 3000)
cd image-manager/backend
npm install
npm start
```

### 2. Запуск Frontend части:
```bash
cd helpdesk/frontend
npm install
npm start
```
