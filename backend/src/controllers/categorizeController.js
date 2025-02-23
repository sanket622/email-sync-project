export const categorizeAndStoreEmail = async (req, res) => {
    try {
        const { from, to, subject, date, body } = req.body;

        if (!from || !to || !subject || !body) {
            return res.status(400).json({ message: "Missing required email fields." });
        }

        // Categorize the email using AI
        let category = await categorizeEmail(body);

        // Ensure category is valid
        const validCategories = ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"];
        if (!validCategories.includes(category)) {
            category = "Not Interested"; // Default fallback
        }

        // Store in MongoDB
        const newEmail = new Email({ from, to, subject, date, body, category });
        await newEmail.save();

        return res.status(201).json({ message: "Email categorized and stored successfully!", category });
    } catch (error) {
        console.error("❌ Error processing email:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
