const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        PublishYear: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
);

exports.Book = mongoose.model('Book', bookSchema);