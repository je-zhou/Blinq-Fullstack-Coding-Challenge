// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IntegrationClientsFactory } from "@utils/integrationClients/integrationClientFactory";
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

			const client = IntegrationClientsFactory.getClientByID(id); // Get the right Integration Client based on id passed to the API route, if no client then throws error

			// Check if the id passed in is a valid Integration Partner
			if (body.type === "connect") {

				const connectionOutcome = await client.connect(body.params, body.contacts);

				// If success, return status 200
				if (connectionOutcome) {
					res.status(200).json({ outcome: "Connection Success!: Integration Complete" });
				} else {
					// If fail due to client side error, return status 402
					res.status(402).json({ outcome: "Connection Failed: Client Side Error" })
				}
			} else if (body.type === "disconnect") {

				const connectionOutcome = await client.disconnect(body.params);

				// If success, return status 200
				if (connectionOutcome) {
					res.status(200).json({ outcome: "Successfully Disconnected" });
				} else {
					// If fail due to client side error, return status 403
					res.status(404).json({ outcome: "Failed to Disconnect: Client Side Error" })
				}
			} else {
				res.status(406).json({ outcome: "Error: Invalid connection type. Please pass either 'connect' or 'disconnect' as the value for the key 'type'" })
			}

			break;
		default:
			res.setHeader('Allow', ['POST']);
			res.status(403).end(`Method ${method} Not Allowed`);
			break;
	}
}