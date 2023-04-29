import dbConnect from '@/lib/dbConnect';
import Book from '@/models/bookModel';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const book = await Book.findById(id).populate('author');
				if (!book) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: book });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const book = await Book.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				}).populate('authorId');
				if (!book) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: book });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const deletedBook = await Book.deleteOne({ _id: id });
				if (!deletedBook) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		default:
			res.status(400).json({ success: false });
			break;
	}
}
