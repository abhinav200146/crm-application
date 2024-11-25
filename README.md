# Mini CRM Application

This is a Mini CRM Application created as part of an assignment. The application allows users to ingest data, create audiences based on specific criteria, and send campaigns to those audiences. It features Google-based authentication and uses a pub/sub model with RabbitMQ for scalable data processing.

## Features

1. **Data Ingestion**
   - APIs to ingest data into customer and orders database.
   - Input data validation and ingestion via a pub/sub model using RabbitMQ.

2. **Campaign Management**
   - Create audiences based on various criteria (e.g., total spends, number of visits, last visit date).
   - Save audiences and view past campaigns.
   - Send personalized messages to audiences and track delivery status.

## Tech Stack

- **Frontend**: Next.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Message Broker**: RabbitMQ
- **Authentication**: Kinde (Google-based authentication)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- RabbitMQ
- Kinde account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mini-crm.git
   cd mini-crm
2. Install dependencies:
   ```bash
   npm install
3. Create a .env.local file in the root directory and add the following environment variables:
   ```bash
    MONGODB_URI=your_mongodb_connection_string
    RABBITMQ_URL=your_rabbitmq_connection_string
    KINDE_CLIENT_ID=<your_kinde_client_id>
    KINDE_CLIENT_SECRET=<your_kinde_client_secret>
    KINDE_ISSUER_URL=https://<your_kinde_subdomain>.kinde.com
    KINDE_SITE_URL=http://localhost:3000
    KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
    KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard
## Running the Application
1. Start the RabbitMQ server:
    ```bash
    rabbitmq-server
2. Start the Next.js development server:
    ```bash
    npm run dev
3. Start the campaign consumer:
    ```bash
    node consumers/campaignConsumer.js
Visit http://localhost:3000 to see the application in action

## API Endpoints
#### Data Ingestion
- POST /api/customers
    - Ingest customer data.
    - Request Body:
        ``` json    
        {
          "name": "John Doe",
          "email": "john@example.com",
          "totalSpends": 12000,
          "numberOfVisits": 5,
          "lastVisitDate": "2023-06-01"
        }
- POST /api/orders
    - Ingest order data.
    - Request Body:
        ```json
        {
          "customerId": "customer_id",
          "orderAmount": 3000,
          "orderDate": "2023-06-08"
        }
#### Campaign Management
- POST /api/campaigns
    - Create a campaign.
    - Request Body:
        ```json
        {
          "rules": [
            { "field": "totalSpends", "operator": ">", "value": 10000 },
            { "field": "numberOfVisits", "operator": "<=", "value": 3 }
          ],
          "message": "Hi, here is 10% off on your next order!"
        }
- GET /api/campaigns
    - Get all campaigns.
## Acknowledgements
- kinde
- RabbitMQ
- Vercel
