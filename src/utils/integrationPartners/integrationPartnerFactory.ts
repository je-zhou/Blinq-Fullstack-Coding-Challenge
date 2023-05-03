import { IntegrationPartner } from "./integrationPartners";
import { HubspotIntegration } from "./partners/hubspotIntegrationPartner";
import { SalesforceIntegration } from "./partners/salesforceIntegrationPartner";
import { ZapierIntegration } from "./partners/zapierIntegrationPartner";

export class IntegrationPartnerFactory {
	static getIntegrationPartners(): Array<IntegrationPartner> {
		return [
			new SalesforceIntegration(),
			new ZapierIntegration(),
			new HubspotIntegration(),
		]
	}
}