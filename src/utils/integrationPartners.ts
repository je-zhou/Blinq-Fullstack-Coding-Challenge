export interface IIntegrationPartner {
	name: string;
	description: string;
	imgPath: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string | undefined }
}

// Base Class

export class IntegrationPartner {
	name: string;
	description: string;
	imgPath: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string | undefined }

	constructor(options: IIntegrationPartner) {
		this.name = options.name;
		this.description = options.description;
		this.imgPath = options.imgPath;
		this.isConnected = options.isConnected;
		this.requiredParams = options.requiredParams;
	}

	async connect(paramVals: { [key: string]: string }): Promise<void> {

		console.log(`Trying to integrate with ${this.name}`);

		const response = await fetch(`/api/integrations/${this.name}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(paramVals),
			});
	}

	async disconnect(): Promise<void> {
		console.log("Disconnecting!");
	}

	getParamsList(): Array<string> {
		return Object.keys(this.requiredParams);
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
			requiredParams: { client_id: undefined, client_secret: undefined },
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
			requiredParams: { api_key: undefined },
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
			requiredParams: { tenant_domain: undefined, client_id: undefined, client_secret: undefined, field_mappings: undefined },
		}

		super(options);
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