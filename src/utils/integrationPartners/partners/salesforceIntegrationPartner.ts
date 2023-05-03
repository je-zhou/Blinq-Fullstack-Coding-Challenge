import { IntegrationPartner, IIntegrationPartner } from "../integrationPartners";

export class SalesforceIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "Salesforce",
			description: "Salesforce is a cloud-based customer relationship management (CRM) software that helps businesses manage their sales, marketing, and customer service activities. It allows companies to streamline their operations and improve their customer relationships.",
			imgPath: "/assets/integration_partners/salesforce.png",
			isConnected: false,
			requiredParams: { client_id: "", client_secret: "" },
		}

		super(options);
	}
}