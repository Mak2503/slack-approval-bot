# 🛡️ Slack Approval Bot

A lightweight Slack bot built with Express and Slack API that lets users send approval requests via a modal. Approvers receive interactive messages to approve or deny, and the requester is notified accordingly.

---

## 🚀 Features

- Slash command to trigger modal
- Modal with:
  - Approver dropdown
  - Description input
- Sends request to approver via app DM
- Requester gets a confirmation message
- Notifications on decision for both parties

---

## 🧱 Project Structure

```slack-approvals/
├── app # Express entry point
├── routes/ # Route handlers
├── services/ # Slack API logic
├── utils/ # Block builders
├── tests/ # Jest test cases
├── .env # Environment variables
└── package.json
```

## Install Dependencies

```npm install```

## Configure `.env`

Create a `.env` file:

```
PORT=3000
SLACK_BOT_TOKEN=xoxb-your-slack-bot-token
```

## 🚦 Start the App

```npm run dev```

## ✅ Usage

- Type your slash command (e.g., /approve-test) in Slack.
- Choose an approver and enter a description.
- Approver receives request in app DM with buttons.
- Requester gets notified once decision is made.
