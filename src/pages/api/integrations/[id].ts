// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IntegrationClientsFactory } from "@utils/integrationClients/integrationClients";
import { Database } from "database";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	outcome: string;
};

export default async function handler(
	_req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	const { method, body } = _req;
	const id = _req.query.id as string;

	switch (method) {
		case 'POST':
			// Get the right Integration Client based on id passed to the API call
			const client = IntegrationClientsFactory.getClientByID(id);

			// Check if the id passed in is a valid Integration Partner
			if (client) {
				// Get the current User's contact details so we can pass to third party client to sync
				const contacts = Database.getContacts();

				// Use the provided parameters to try sync and await outcome
				const connectionOutcome = await client.connect(body, contacts);

				// If success, return status 200, and a JSON message saying success!
				if (connectionOutcome) {
					res.status(200).json({ outcome: "Connection Success!" });
				} else {
					// If fail, return status 401, and a JSON message detailing the error
					res.status(401).json({ outcome: "Connection Failure!" })
				}
			}
			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}