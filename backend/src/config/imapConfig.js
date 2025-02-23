import dotenv from 'dotenv';

dotenv.config();

export default [{
    user: process.env.IMAP_USER || '',  
    password: process.env.IMAP_PASS || '',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
},
{
    user: process.env.IMAP_USER1 || '',  
    password: process.env.IMAP_PASS1 || '',
    host: 'imap.gmail.com',
    port: 993,
    tls: true
}];
