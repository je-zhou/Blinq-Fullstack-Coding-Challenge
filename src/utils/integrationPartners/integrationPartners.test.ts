import { IntegrationPartnerFactory } from "./integrationPartnerFactory";
import { HubspotIntegration } from "./partners/hubspotIntegrationPartner";
import { SalesforceIntegration } from "./partners/salesforceIntegrationPartner";
import { ZapierIntegration } from "./partners/zapierIntegrationPartner";

test("Integration Factory returns the correct Integration Partners", () => {
	const integrationPartners = IntegrationPartnerFactory.getIntegrationPartners();
	const salesforce = new SalesforceIntegration();
	const zapier = new ZapierIntegration();
	const hubspot = new HubspotIntegration();
	expect(integrationPartners).toContainEqual(salesforce);
	expect(integrationPartners).toContainEqual(zapier);
	expect(integrationPartners).toContainEqual(hubspot);
});

describe("Salesforce Integration Class working as intended", () => {
	const salesforce = new SalesforceIntegration();

	test("Salesforce required parameters are client_id and client_secret", () => {
		const params = salesforce.getParamsList();

		expect(params).toContain("client_id");
		expect(params).toContain("client_secret");
		expect(params.length).toBe(2);
	});
})

describe("Zapier Integration Class working as intended", () => {
	const zapier = new ZapierIntegration();

	test("Zapier required parameter is api_key", () => {
		const params = zapier.getParamsList();

		expect(params).toContain("api_key");
		expect(params.length).toBe(1);
	});
})

describe("Hubspot Integration Class working as intended", () => {
	const hubspot = new HubspotIntegration();

	test("Hubspot required parameters are tenant_domain, client_id and client_secret", () => {
		const params = hubspot.getParamsList();

		expect(params).toContain("tenant_domain");
		expect(params).toContain("client_id");
		expect(params).toContain("client_secret");
		expect(params.length).toBe(3);
	});
})