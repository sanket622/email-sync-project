Video Demonstration Link = [https://drive.google.com/file/d/1HPYz2Xjxb-IDe8EUcN2wdWK7HgiXpb5O/view?usp=drivesdk]

Email Sync API Backend

1. Overview

This is a Node.js and Express.js backend for an AI-powered email processing system. It integrates MongoDB, Elasticsearch, IMAP, Pinecone, and OpenAI to provide functionalities such as:

2. Email synchronization via IMAP

AI-powered email categorization (e.g., Spam, Interested, Not Interested)
Search functionality using Elasticsearch
AI-generated email replies via OpenAI
Vector-based data retrieval using Pinecone

3. Features

Fetch Emails: Connects to multiple IMAP accounts, retrieves unread emails, and stores them in MongoDB.
Categorize Emails: Uses OpenAI to classify emails into predefined categories.
Store and Index Emails: Saves emails in MongoDB and indexes them in Elasticsearch for fast searching.
Search Emails: Queries Elasticsearch for relevant emails based on user input.
Suggest AI-Powered Replies: Uses OpenAI and Pinecone to generate responses to emails.

4. Technologies Used

Node.js - Backend runtime
Express.js - API framework
MongoDB & Mongoose - Database for storing emails
Elasticsearch - Search engine for emails
IMAP (node-imap & mailparser) - Fetching emails
Pinecone - AI-powered vector storage for intelligent retrieval
OpenAI API - AI email categorization & reply generation
dotenv - Environment variables management
cors & express.json - Middleware for handling requests

5. Installation

Clone the repository
git clone https://github.com/your-repo/email-sync-api.git
cd email-sync-api

6. Install dependencies

npm install
Set up environment variables (.env file)

PORT=8080
MONGO_URI=mongodb://localhost:27017/email-sync
ELASTICSEARCH_HOST=http://localhost:9200
ELASTICSEARCH_USER=elastic
ELASTICSEARCH_PASS=changeme
IMAP_USER=your-email@gmail.com
IMAP_PASS=your-email-password
IMAP_USER1=another-email@gmail.com
IMAP_PASS1=another-password
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX_NAME=email-index
OPENAI_API_KEY=your-openai-key

7. Run the server

npm start

8. API Endpoints

1. Email Synchronization (IMAP & MongoDB)
Fetch Emails & Store in MongoDB

GET /api/emails
Fetches all stored emails from the database.

2. AI-Powered Email Categorization
POST /api/categoriseEmail
Categorizes and stores an email using OpenAI.

3️. Search Emails (Elasticsearch)
GET /api/search?query=keyword
Searches stored emails based on a keyword.

4️. AI-Powered Email Reply Suggestion
POST /api/AiReply
Suggests a reply to an email using AI.

9. Key Functionalities

1. Email Synchronization
File: src/services/imapService.js

Connects to IMAP accounts
Fetches unread emails from the last 30 days
Stores emails in MongoDB
Listens for new emails in real time

2. AI-Powered Email Categorization
File: src/services/aiCategorization.js

Uses OpenAI to classify emails into categories:
Interested
Meeting Booked
Not Interested
Spam
Out of Office

3. Email Search (Elasticsearch)

File: src/services/elasticService.js

Indexes emails in Elasticsearch
Searches stored emails by content

4. AI-Powered Email Reply Suggestion

File: src/services/aiCategorization.js

Uses Pinecone to retrieve relevant past emails
Uses OpenAI to generate a professional reply

10. Development Commands
Start the server:

npm start
npm run dev

11. Contributing

Fork the repo
Create a new branch (feature-xyz)
Commit changes (git commit -m "Added xyz feature")
Push to branch (git push origin feature-xyz)
Open a Pull Request
