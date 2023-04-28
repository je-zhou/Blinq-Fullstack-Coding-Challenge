interface IIntegrationPartner {
	name: string;
	description: string;
	imgUrl: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string | undefined }
}

// Base Class

class IntegrationPartner {
	name: string;
	description: string;
	imgUrl: string;
	isConnected: boolean;
	requiredParams: { [key: string]: string | undefined }

	constructor(options: IIntegrationPartner) {
		this.name = options.name;
		this.description = options.description;
		this.imgUrl = options.imgUrl;
		this.isConnected = options.isConnected;
		this.requiredParams = options.requiredParams;
	}

	async connect(): Promise<void> {
		console.log("Connecting!");
	}

	async disconnect(): Promise<void> {
		console.log("Disconnecting!");
	}
}

// Superclasses

class SalesforceIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "Salesforce",
			description: "Salesforce is a cloud-based customer relationship management (CRM) software that helps businesses manage their sales, marketing, and customer service activities. It allows companies to streamline their operations and improve their customer relationships.",
			imgUrl: "",
			isConnected: false,
			requiredParams: { client_id: undefined, client_secret: undefined },
		}

		super(options);
	}

	async connect(): Promise<void> {

	}

	async disconnect(): Promise<void> {

	}
}


class ZapierIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "Zapier",
			description: "Zapier is a web-based automation tool that allows users to connect various applications and automate tasks between them without any coding. It enables businesses to streamline their workflows and boost productivity.",
			imgUrl: "",
			isConnected: false,
			requiredParams: { api_key: undefined },
		}

		super(options);
	}

	async connect(): Promise<void> {

	}

	async disconnect(): Promise<void> {

	}
}

class HubspotIntegration extends IntegrationPartner {
	constructor() {
		const options: IIntegrationPartner = {
			name: "hubspot",
			description: "Hubspot is an all-in-one inbound marketing, sales, and customer service software that helps businesses attract, engage, and delight customers. It offers a suite of tools for lead generation, lead management, social media marketing, email marketing, and more, all in one platform.",
			imgUrl: "",
			isConnected: false,
			requiredParams: { tenant_domain: undefined, client_id: undefined, client_secret: undefined, field_mappings: undefined },
		}

		super(options);
	}

	async connect(): Promise<void> {

	}

	async disconnect(): Promise<void> {

	}
}


class IntegrationPartnerFactory {
	getIntegrationPartners() {
		return [
			new SalesforceIntegration(),
			new ZapierIntegration(),
			new HubspotIntegration(),
		]
	}
}