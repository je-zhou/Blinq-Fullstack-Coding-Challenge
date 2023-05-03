import { IIntegrationClient, IntegrationClient } from "../integrationClient";

export class HubspotIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Hubspot",
			requiredParams: ["tenant_domain", "client_id", "client_secret"],
		}

		super(options);
	}
}
