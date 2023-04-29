import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
	id: String,
	title: { type: String, required: true, unique: true },
	description: { type: String },
	cover: { type: String },
	author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});

const Book = models.Book || model('Book', bookSchema);

export default Book;
