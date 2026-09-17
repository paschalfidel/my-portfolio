import mongoose from 'mongoose';

 const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        maxlength: [254, 'Email cannot exceed 254 characters']
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
        trim: true,
        minlength: [10, 'Message must be at least 10 characters'],
        maxlength: [1000, 'Message cannot exceed 1000 characters']
    },
    status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread'
    },
    ipAddress: {
    type: String,
    default: null
    },
    userAgent: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }     
 })


 // Create index for better query performance
 contactSchema.index({ createdAt: -1 });
 contactSchema.index({ status: 1 });
 contactSchema.index({ email: 1});

 const Contact = mongoose.model('Contact', contactSchema);

 export default Contact;
