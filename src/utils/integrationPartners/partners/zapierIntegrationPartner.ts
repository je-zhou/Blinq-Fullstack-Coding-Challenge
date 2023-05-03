import { IntegrationPartner, IIntegrationPartner } from "../integrationPartners";

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