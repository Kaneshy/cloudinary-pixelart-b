import mongoose from 'mongoose';

const TagsSchema = new mongoose.Schema({
    tags: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Check if the model is already defined to avoid re-defining it
const Tags = mongoose.models && mongoose.models.Tags
    ? mongoose.models.Tags
    : mongoose.model('Tags', TagsSchema);

export default Tags;