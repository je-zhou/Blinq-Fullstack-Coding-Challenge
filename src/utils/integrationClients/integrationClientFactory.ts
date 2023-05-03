import { HubspotIntegrationClient } from "./partners/hubspotIntegrationClient";
import { IntegrationClient } from "./integrationClient";
import { SalesforceIntegrationClient } from "./partners/salesforceIntegrationClient";
import { ZapierIntegrationClient } from "./partners/zapierIntegrationClient";

export class IntegrationClientsFactory {
	static getClientByID(id: string): IntegrationClient {
		switch (id.toLowerCase()) {
			case "salesforce":
				return new SalesforceIntegrationClient();
			case "zapier":
				return new ZapierIntegrationClient();
			case "hubspot":
				return new HubspotIntegrationClient();

			// New Integration Clients to be added here

			default:
				throw Error("Integration Partner does not exist")
		}
	}
}
