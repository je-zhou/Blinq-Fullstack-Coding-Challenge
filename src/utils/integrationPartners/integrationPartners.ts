
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