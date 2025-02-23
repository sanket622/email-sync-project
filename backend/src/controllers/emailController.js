import Email from '../models/emailModel.js';

export async function getEmails(req, res) {
    const emails = await Email.find();
    res.json(emails);
}
