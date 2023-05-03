// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IntegrationClient } from "@utils/integrationClients/integrationClient";
import { IntegrationClientsFactory } from "@utils/integrationClients/integrationClientFactory";
import { Contact, Database } from "database";
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
			await postHandler(id, body, res);
			break;
		// case "GET":
		// 	// Handle connection checks to make sure user is still integrated with service
		default:
			res.setHeader('Allow', ['POST']);
			res.status(403).end(`Method ${method} Not Allowed`);
			break;
	}
}

async function postHandler(id: string, body: any, res: NextApiResponse<Data>) {
	const client = IntegrationClientsFactory.getClientByID(id); // Get the right Integration Client based on id passed to the API route, if no client then throws error

	if (body.type === "connect") {
		await connectToClient(client, body.params, body.contacts, res);
	}
	else if (body.type === "disconnect") {
		await disconnectFromClient(client, body.params, res);
	}
	else {
		res.status(406).json({ outcome: "Error: Invalid connection type. Please pass either 'connect' or 'disconnect' as the value for the key 'type'" });
	}

}

async function connectToClient(client: IntegrationClient, params: { [key: string]: any }, contacts: Array<Contact>, res: NextApiResponse<Data>) {
	const connectionOutcome = await client.connect(params, contacts);

	// If success, return status 200
	if (connectionOutcome) {
		res.status(200).json({ outcome: "Connection Success!: Integration Complete" });
	} else {
		// If fail due to client side error, return status 402
		res.status(402).json({ outcome: "Connection Failed: Client Side Error" });
	}
}

async function disconnectFromClient(client: IntegrationClient, params: { [key: string]: any }, res: NextApiResponse<Data>) {
	const connectionOutcome = await client.disconnect(params);

	// If success, return status 200
	if (connectionOutcome) {
		res.status(200).json({ outcome: "Successfully Disconnected" });
	} else {
		// If fail due to client side error, return status 403
		res.status(404).json({ outcome: "Failed to Disconnect: Client Side Error" });
	}
}