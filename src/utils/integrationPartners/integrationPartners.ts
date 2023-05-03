import { Database } from "database";

export interface APIOutcome {
	status: number,
	message: string
}

export interface IIntegrationPartner {
	name: string;
	description: string;
	imgPath: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string }
}

// Base Class

export class IntegrationPartner {
	name: string;
	description: string;
	imgPath: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string }

	constructor(options: IIntegrationPartner) {
		this.name = options.name;
		this.description = options.description;
		this.imgPath = options.imgPath;
		this.isConnected = options.isConnected;
		this.requiredParams = options.requiredParams;
	}

	async connect(paramVals: { [key: string]: string }): Promise<APIOutcome> {

		console.log(`Trying to integrate with ${this.name}`);

		const contacts = Database.getContacts();

		// Send a request to Blinq's API route and pass the collected parameters to try connect to external client
		const response = await fetch(`/api/integrations/${this.name}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "connect",
					params: paramVals,
					contacts: contacts
				}),
			});

		const status = response.status;
		const json = await response.json();

		// return the API outcome
		return { status: status, message: json.outcome }
	}

	async disconnect(paramVals: { [key: string]: string }): Promise<APIOutcome> {
		console.log(`Trying to disconnect from ${this.name}`);

		// Send a request to Blinq's API route and pass the collected parameters to try disconnect from external client
		const response = await fetch(`/api/integrations/${this.name}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					type: "disconnect",
					params: paramVals,
				}),
			});

		const status = response.status;
		const json = await response.json();

		// return the API outcome
		return { status: status, message: json.outcome }
	}

	getParamsList(): Array<string> {
		return Object.keys(this.requiredParams);
	}

	// Clear the saved param data
	resetParams(): void {
		Object.keys(this.requiredParams).forEach((key) => {
			this.requiredParams[key] = "";
		})
	}
}

// Superclasses

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


export class ZapierIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "Zapier",
			description: "Zapier is a web-based automation tool that allows users to connect various applications and automate tasks between them without any coding. It enables businesses to streamline their workflows and boost productivity.",
			imgPath: "/assets/integration_partners/zapier.png",
			isConnected: false,
			requiredParams: { api_key: "" },
		}

		super(options);
	}
}

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

		console.log(`Trying to integrate with ${this.name}`);

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


export class IntegrationPartnerFactory {
	static getIntegrationPartners(): Array<IntegrationPartner> {
		return [
			new SalesforceIntegration(),
			new ZapierIntegration(),
			new HubspotIntegration(),
		]
	}
}