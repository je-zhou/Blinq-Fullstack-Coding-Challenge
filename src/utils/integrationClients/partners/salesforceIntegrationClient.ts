import { IIntegrationClient, IntegrationClient } from "../integrationClient";

// Superclasses
export class SalesforceIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Salesforce",
			requiredParams: ["client_id", "client_secret"],
		}

		super(options);
	}
}
