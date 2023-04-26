import { Schema, model, models } from 'mongoose';

const authorSchema = new Schema({
	id: String,
	name: { type: String, required: true, unique: true },
	nationality: String,
});

const Author = models.Author || model('author', authorSchema);

export default Author;
