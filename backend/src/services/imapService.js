import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import imapConfigs from '../config/imapConfig.js';
import Email from '../models/emailModel.js';
import { indexEmail } from './elasticService.js';
import { categorizeEmail } from './aiCategorization.js';

/**
 * Processes and stores a single email
 */
async function processEmail(imap, msg, seqno) {

    msg.on('body', async (stream) => {
        try {
            const parsed = await simpleParser(stream);

            // Categorize email using AI
            const category = await categorizeEmail(parsed.text);

            // Save email in MongoDB
            const email = new Email({
                messageId: parsed.messageId,
                from: parsed.from.text,
                to: parsed.to.text,
                subject: parsed.subject,
                body: parsed.text,
                folder: 'INBOX',
                category,
                receivedAt: parsed.date,
            });

            await email.save();

            // Index email in Elasticsearch
            await indexEmail(email);
        } catch (error) {
            console.error('❌ Error processing email:', error);
        }
    });
}

/**
 * Fetches unread emails from the last 30 days
 */
function fetchEmails(imap) {
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - 30); // Last 30 days

    imap.search([['SINCE', sinceDate.toISOString().split('T')[0]]], (err, results) => {
        if (err) {
            console.error('❌ Error searching emails:', err);
            return;
        }

        if (!results.length) {
            console.log('✅ No new emails found.');
            return;
        }

        const fetch = imap.fetch(results, { bodies: '' });

        fetch.on('message', (msg, seqno) => processEmail(imap, msg, seqno));
        fetch.once('error', (err) => console.error('❌ Fetch error:', err));
    });
}

/**
 * Listens for real-time email updates using IDLE mode
 */
function listenForNewEmails(imap) {
    imap.on('mail', (numNewMsgs) => {
        console.log(`🔔 New email detected (${numNewMsgs} new message(s)).`);
        fetchEmails(imap);
    });

    imap.on('update', () => {
        console.log('🔄 IMAP updated, checking for new emails...');
        fetchEmails(imap);
    });

    console.log('📡 Listening for new emails...');
}

/**
 * Establishes a persistent IMAP connection
 */
function connectToIMAP(config) {
    try {
        const imap = new Imap(config);

        imap.once('ready', () => {
            console.log(`📬 IMAP Connected: ${config.user}`);

            imap.openBox('INBOX', false, (err) => {
                if (err) {
                    console.error(`❌ Error opening INBOX for ${config.user}:`, err);
                    return;
                }

                console.log(`📂 INBOX opened for ${config.user}`);
                fetchEmails(imap);
                listenForNewEmails(imap);
            });
        });

        imap.once('error', (err) => {
            console.error(`❌ IMAP error for ${config.user}:`, err);
            setTimeout(() => connectToIMAP(config), 5000); // Auto-reconnect after 5s
        });

        imap.once('end', () => {
            console.log(`📭 IMAP connection closed for ${config.user}. Reconnecting...`);
            setTimeout(() => connectToIMAP(config), 5000);
        });

        console.log(`🔌 Connecting to IMAP: ${config.user}`);
        imap.connect();
    } catch (err) {
        console.error('❌ IMAP Connection Error:', err);
    }
}

/**
 * Connects all IMAP accounts in parallel
 */
export async function connectAllIMAPAccounts() {
    imapConfigs.forEach(connectToIMAP);
}
