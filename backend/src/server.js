import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import emailRoutes from './routes/emailRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import suggestRoutes from './routes/suggestRoutes.js';
import categorizeRoutes from './routes/categorizeRoutes.js';
import { connectAllIMAPAccounts } from './services/imapService.js';
import { connectToElasticsearch } from './services/elasticService.js';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/emails', emailRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/AiReply', suggestRoutes);
app.use('/api/categoriseEmail', categorizeRoutes);

const PORT = process.env.PORT || 8080;

// Root endpoint
app.get("/server", (req, res) => {
    res.send("Server is running successfully!");
});

// Start the server
app.listen(PORT, async () => {
    console.log(`🚀 Server running on port ${PORT}`);
    
    try {
        // Connect to multiple IMAP accounts in parallel
        await connectAllIMAPAccounts();
        console.log("📬 IMAP Accounts Connected Successfully");

        // Connect to Elasticsearch
        await connectToElasticsearch();
        console.log("🔍 Connected to Elasticsearch");
    } catch (error) {
        console.error("❌ Error during startup:", error);
    }
});

console.log("IMAP Users:", process.env.IMAP_USER, process.env.IMAP_USER1);
