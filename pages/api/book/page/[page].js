import dbConnect from '@/lib/dbConnect';
import {
	getBooksFilteredAndPaginated,
	getTotalBooks,
} from '@/utils/mongooseOperations';

export default async function handler(req, res) {
	const {
		// query { page, filter } from /api/book/page/0?filter=george
		query,
	} = req;

	await dbConnect();

	try {
		const { books, count } = await getBooksFilteredAndPaginated(query);
		res.status(200).json({
			success: true,
			data: books,
			count: count,
		});
	} catch (error) {
		res.status(400).json({ success: false });
	}
}
