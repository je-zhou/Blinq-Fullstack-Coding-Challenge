import { HubspotIntegrationClient } from "./partners/hubspotIntegrationClient";
import { IntegrationClientsFactory } from "./integrationClientFactory";
import { SalesforceIntegrationClient } from "./partners/salesforceIntegrationClient";
import { ZapierIntegrationClient } from "./partners/zapierIntegrationClient";

test("Integration Factory returns the correct Integration Clients", () => {
	const salesforce = IntegrationClientsFactory.getClientByID("Salesforce");
	const zapier = IntegrationClientsFactory.getClientByID("Zapier");
	const hubspot = IntegrationClientsFactory.getClientByID("Hubspot");
	expect(new SalesforceIntegrationClient()).toEqual(salesforce);
	expect(new ZapierIntegrationClient()).toEqual(zapier);
	expect(new HubspotIntegrationClient()).toEqual(hubspot);
});

describe("Salesforce Integration Client working as intended", () => {
	const salesforce = new SalesforceIntegrationClient();

	test("Salesforce required parameters are client_id and client_secret", () => {
		const params = salesforce.requiredParams;

		expect(params).toContain("client_id");
		expect(params).toContain("client_secret");
		expect(params.length).toBe(2);
	});
})

describe("Zapier Integration Client working as intended", () => {
	const zapier = new ZapierIntegrationClient();

	test("Zapier required parameter is api_key", () => {
		const params = zapier.requiredParams

		expect(params).toContain("api_key");
		expect(params.length).toBe(1);
	});
})

describe("Hubspot Integration Client working as intended", () => {
	const hubspot = new HubspotIntegrationClient();

	test("Hubspot required parameters are tenant_domain, client_id and client_secret", () => {
		const params = hubspot.requiredParams;

		expect(params).toContain("tenant_domain");
		expect(params).toContain("client_id");
		expect(params).toContain("client_secret");
		expect(params.length).toBe(3);
	});
})