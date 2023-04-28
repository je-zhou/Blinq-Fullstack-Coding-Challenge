import { HubspotIntegration, IntegrationPartnerFactory, SalesforceIntegration, ZapierIntegration } from "./integrationPartners";

test("Integration Factory returns the correct Integration Partners", () => {
	const integrationPartners = IntegrationPartnerFactory.getIntegrationPartners();
	const salesforce = new SalesforceIntegration();
	const zapier = new ZapierIntegration();
	const hubspot = new HubspotIntegration();
	expect(integrationPartners).toContainEqual(salesforce);
	expect(integrationPartners).toContainEqual(zapier);
	expect(integrationPartners).toContainEqual(hubspot);
});

