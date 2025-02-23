import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    from: String,
    to: String,
    subject: String,
    date: Date,
    body: String,
  }, { timestamps: true });

export default mongoose.model('Email', emailSchema);
