import { Schema, model, models } from 'mongoose';

const bookSchema = new Schema({
	id: String,
	name: { type: String, required: true, unique: true },
	authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
});

const Book = models.Book || model('Book', bookSchema);

export default Book;
