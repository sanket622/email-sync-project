import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    from: String,
    to: String,
    subject: String,
    date: Date,
    body: String,
    category: { type: String, enum: ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"] }, // AI-based categorization
}, { timestamps: true });

export default mongoose.model('Email', emailSchema);
