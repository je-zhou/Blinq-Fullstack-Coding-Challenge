import { Database } from "database";
import { IntegrationPartner, IIntegrationPartner, APIOutcome } from "../integrationPartners";

export class HubspotIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "Hubspot",
			description: "Hubspot is an all-in-one inbound marketing, sales, and customer service software that helps businesses attract, engage, and delight customers. It offers a suite of tools for lead generation, lead management, social media marketing, email marketing, and more, all in one platform.",
			imgPath: "/assets/integration_partners/hubspot.png",
			isConnected: false,
			requiredParams: { tenant_domain: "", client_id: "", client_secret: "" },
		}

		super(options);
	}

	// Hubspot requires Blinq to specify which fields the contact details should be mapped to
	// To accomodate we will override the default connect function and pass new one specific for Hubspot
	async connect(paramVals: { [key: string]: string; }): Promise<APIOutcome> {

		const contacts = Database.getContacts();

		// Custom field mapping for Hubspot
		const field_mappings = {
			firstName: "given_name",
			lastName: "family_name",
			hs_custom_field1234: "met_at_location",
		}

		const newParams: { [key: string]: any } = { ...paramVals, field_mappings: field_mappings }

		// Send a request to Blinq's API route and pass the collected parameters to try connect to external client
		const response = await fetch(`/api/integrations/${this.name}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "connect",
					params: newParams,
					contacts: contacts
				}),
			});

		const status = response.status;
		const json = await response.json();

		// return the API outcome
		return { status: status, message: json.outcome }
	}
}