import { suggestReply } from "../services/aiCategorization.js";
export async function suggestReplies(req, res) {
    const { emailBody } = req.body;
    const reply = await suggestReply(emailBody);
    res.json({ reply });
}
