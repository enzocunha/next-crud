import dbConnect from '@/lib/dbConnect';
import { getBooksPaginated } from '@/utils/mongooseOperations';

export default async function handler(req, res) {
	const {
		query: { page },
	} = req;

	await dbConnect();

	try {
		const books = await getBooksPaginated(page);
		res.status(200).json({ success: true, data: books });
	} catch (error) {
		res.status(400).json({ success: false });
	}
}
