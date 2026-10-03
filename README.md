# Домашнее задание к занятию "7. Работа с HTTP" (HelpDesk)

[![Build Status](https://github.com/ivantr033/ahj-homeworks-http/actions/workflows/deploy.yml/badge.svg)](https://github.com/ivantr033/ahj-homeworks-http/actions/workflows/deploy.yml)

## 🌐 Ссылка на развертывание (GitHub Pages)
*   **HelpDesk (Основное задание):** [Открыть приложение](https://ivantr033.github.io/ahj-homeworks-http/)

---

## 🛠️ Архитектура проекта и Спецификация API

В рамках данного домашнего задания реализован интерфейс службы поддержки (HelpDesk), взаимодействующий с сервером по протоколу HTTP. Модуль демонстрирует использование архитектурного стиля **RPC (Remote Procedure Call)**.

### 📋 HelpDesk API (Архитектурный стиль RPC)
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

## 🚀 Инструкция по локальному запуску

### 1. Запуск Backend сервера:
```bash
cd backend
npm install
npm start
```

### 2. Запуск Frontend части:
```bash
cd frontend
npm install
npm start
```
