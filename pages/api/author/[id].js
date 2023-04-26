import dbConnect from '@/lib/dbConnect';
import Author from '@/models/authorModel';

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();

	switch (method) {
		case 'GET' /* Get a model by its ID */:
			try {
				const author = await Author.findById(id);
				if (!author) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: author });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'PUT' /* Edit a model by its ID */:
			try {
				const author = await Author.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!author) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: author });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		case 'DELETE' /* Delete a model by its ID */:
			try {
				const deletedAuthor = await Author.deleteOne({ _id: id });
				if (!deletedAuthor) {
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
