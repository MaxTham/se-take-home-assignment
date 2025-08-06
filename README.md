## Documentation for Feedme Software Engineer Take Home Assignment

### Tech Stack

**Frontend**
Next.js, React, TailwindCSS

**Backend**
Next.js API Routes

**DB**
MongoDB

**State Management**
useState / useEffect

## Setup Instruction

1.**Clone the project from the repository**

```bash
git clone https://github.com/MaxTham/se-take-home-assignment.git
```

2.**Install dependency**

```bash
 npm install
```

3.**Edit the environment variables in .env.local file**<br>
4.**Run the program**

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

1.**BotCard.jsx**<br>
Displays a list or grid of all bot instances. Reacts to refresh triggers to re-fetch bot data.

2.**BotItem.jsx**<br>
Represents a single bot in the list. Handles display logic for individual bot attributes.

### components/control/

1.**ControlCard.jsx**<br>
Main control panel with buttons to: create/delete bots, and create new orders. Also handles action feedback via pop-up modals.

### components/modals/

1.**PopUpModal.jsx**<br>
A reusable modal popup component for showing success or error messages. Used in ControlCard. Auto-dismisses after a few seconds.

### components/orders/

1.**OrderCard.jsx**<br>
Displays the current list of orders, both pending and completed. Refreshes when orderRefreshTrigger updates.

2.**OrderItem.jsx**<br>
Represents an individual order. Handles UI for order details and interactions like assign or complete.

### components/title/

1.**Header.jsx**<br>
   Top-level page header.

2.**MainTitle.jsx**<br>
Main page title shown in the dashboard.

3.**SubTitle.jsx**<br>
Subheading component for use under titles

## Utilities (/utils)

1.**bot.js**<br>
Handles all bot-related backend logic: create, delete, fetch, and update bots in the database.

2.**mongodb.js**<br>
Exports a clientPromise to connect to the MongoDB instance. Used as the base connector for all DB operations.

3.**order.js**<br>
Manages order-related logic: create, assign, complete, and fetch orders from the database.

4.**reset.js**<br>
Provides logic for resetting database state

## API Route (/app/api)

### Bot Endpoints (/api/bots)

1.**POST /api/bots/create**<br>
 Create a new bot.

2.**DELETE /api/bots/delete**<br>
    Delete a specific bot.

3.**POST /api/bots/edit**<br>
    Update bot properties (e.g., name, status).

4.**GET /api/bots/get**<br>
    Retrieve all bots.

### Order Endpoints (/api/orders)

1.**POST /api/orders/assign**<br>
    Assign a bot to an order.

2.**POST /api/orders/complete**<br>
    Mark an order as completed.

3.**POST /api/orders/create**<br>
    Create a new order.

4.**POST /api/orders/edit**<br>
    Update order details.

5.**GET /api/orders/get**<br>
    Retrieve pending or completed orders.

6.**POST /api/orders/reset**<br>
    Reset all orders and bot status
