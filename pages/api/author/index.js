import dbConnect from '@/lib/dbConnect';
import Author from '@/models/authorModel';
import { createAuthor } from '@/utils/mongooseOperations';

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();

	switch (method) {
		case 'GET':
			try {
				const authors = await Author.find(
					{}
				); /* find all the data in our database */
				res.status(200).json({ success: true, data: authors });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case 'POST':
			try {
				const author = await createAuthor(req.body);
				res.status(201).json({ success: true, data: author });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
			break;
	}
}
