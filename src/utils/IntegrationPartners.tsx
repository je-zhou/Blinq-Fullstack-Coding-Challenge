interface IIntegrationPartner {
	name: string;
	description: string;
	imgUrl: string;
	requiredParams: Array<string>;
}

class IntegrationPartner {
	name: string;
	description: string;
	imgUrl: string;
	requiredParams: Array<string>;

	constructor(options: IIntegrationPartner) {
		this.name = options.name;
		this.description = options.description;
		this.imgUrl = options.imgUrl;
		this.requiredParams = options.requiredParams;
	}

	async connect() {
		console.log("Connecting!");
	}

	async disconnect() {
		console.log("Disconnecting!");
	}
}

class ZapierIntegration extends IntegrationPartner {
	private api_key: string | undefined
	
	constructor() {
		const options: IIntegrationPartner = {
			name: "Zapier",
			description: "Zapier is a web-based automation tool that allows users to connect various applications and automate tasks between them without any coding. It enables businesses to streamline their workflows and boost productivity.",
			imgUrl: "",
			requiredParams: ["api_key"],
		}

		super(options);
	}

	async connect() {
		const response = await fetch('/api/integrations/zapier', {
			method:"POST",
			body: "",
			headers: {
				"Content-Type": "application/json",
			}
		});
	}


}