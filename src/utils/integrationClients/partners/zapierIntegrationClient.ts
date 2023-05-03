import { IIntegrationClient, IntegrationClient } from "../integrationClient";

export class ZapierIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Zapier",
			requiredParams: ["api_key"],
		}

		super(options);
	}
}