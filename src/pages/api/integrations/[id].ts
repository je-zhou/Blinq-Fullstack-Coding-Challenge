// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	name: string;
};

export default function handler(
	_req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method, body } = _req;
	const { id } = _req.query;

	switch (method) {
		case 'POST':
			// Get the right Integration Client based on id passed to the API call

			// Get the current User's contact details so we can pass to third party client to sync

			// Use the provided parameters to try sync and await outcome

			// If success, return status 200, and a JSON message saying success!

			// If fail, return status 40x, and a JSON message detailing the error

			res.json({ name: 'POST' });
			break;


		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}