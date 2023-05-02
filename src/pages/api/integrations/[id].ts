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

			const client = IntegrationClientsFactory.getClientByID(id); // Get the right Integration Client based on id passed to the API route

			// Check if the id passed in is a valid Integration Partner
			if (client) {

				const contacts = Database.getContacts(); // Get the current User's contacts to sync with third party client

				const connectionOutcome = await client.connect(body, contacts); // Use the provided parameters to try sync and await outcome

				// If success, return status 200
				if (connectionOutcome) {
					res.status(200).json({ outcome: "Connection Success!: Integration Complete" });
				} else {
					// If fail due to client side error, return status 402
					res.status(402).json({ outcome: "Connection Failed: Client Side Error" })
				}
			} else {
				res.status(401).json({ outcome: "Connection Failed: Invalid Integration Client" });
			}
			break;
		default:
			res.setHeader('Allow',  ['POST']);
			res.status(403).end(`Method ${method} Not Allowed`);
			break;
	}
}