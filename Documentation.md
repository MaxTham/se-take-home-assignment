## Documentation for Feedme Software Engineer Take Home Assignment

### Tech Stack

Frontend: Next.js, React, TailwindCSS

Backend: Next.js API Routes

DB: MongoDB

State Management: useState / useEffect

## Setup Instruction

1. Clone the project from the repository

```bash
git clone https://github.com/MaxTham/se-take-home-assignment.git
```

2.Install dependency

```bash
 npm install
```

3. Edit the environment variables in .env.local file
   4.Run the program

```bash
npm run dev
```

## Features

✅ Create & delete bots

✅ Create VIP and Normal orders

✅ Real-time UI update

✅ Pop-up feedback modals (success/error)

## Components

### components/bots/

1.BotCard.jsx
Displays a list or grid of all bot instances. Reacts to refresh triggers to re-fetch bot data.

2.BotItem.jsx
Represents a single bot in the list. Handles display logic for individual bot attributes.

### components/control/

1.ControlCard.jsx
Main control panel with buttons to: create/delete bots, and create new orders. Also handles action feedback via pop-up modals.

### components/modals/

1.PopUpModal.jsx
A reusable modal popup component for showing success or error messages. Used in ControlCard. Auto-dismisses after a few seconds.

###components/orders/
1.OrderCard.jsx
Displays the current list of orders, both pending and completed. Refreshes when orderRefreshTrigger updates.

2.OrderItem.jsx
Represents an individual order. Handles UI for order details and interactions like assign or complete.

### components/title/

1.Header.jsx
Top-level page header.

2.MainTitle.jsx
Main page title shown in the dashboard.

3.SubTitle.jsx
Subheading component for use under titles

## Utilities (/utils)

1.bot.js
Handles all bot-related backend logic: create, delete, fetch, and update bots in the database.

2.mongodb.js
Exports a clientPromise to connect to the MongoDB instance. Used as the base connector for all DB operations.

3.order.js
Manages order-related logic: create, assign, complete, and fetch orders from the database.

4.reset.js
Provides logic for resetting database state

## API Route (/app/api)

/api
├── bots/
│ ├── create/ → POST endpoint to create a new bot
│ ├── delete/ → DELETE endpoint to delete a bot
│ ├── edit/ → POST endpoint to edit bot properties
│ └── get/ → GET endpoint to retrieve bots
├── orders/
│ ├── assign/ → POST to assign a bot to an order
│ ├── complete/ → POST to mark an order as complete
│ ├── create/ → POST to create a new order
│ ├── edit/ → POST to update an order
│ ├── get/ → GET to retrieve pending/complete orders
│ └── reset/ → POST to reset/clear orders and bots status
