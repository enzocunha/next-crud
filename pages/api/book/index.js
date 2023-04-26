import dbConnect from '@/lib/dbConnect';
import Book from '@/models/bookModel';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const books = await Book.find().populate(
					'authorId'
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: books });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const books = await Book.create(
					req.body
				); /* create a new model in the database */
				res.status(201).json({ success: true, data: books });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
