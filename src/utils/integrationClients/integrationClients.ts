import { Contact } from "database";

export interface IIntegrationClient {
	name: string;
	requiredParams: Array<string>
}

// These Integration Clients are replicating the Integration Partner side code and how they handle the data being sent by Blinq
export class IntegrationClient {
	name: string;
	requiredParams: Array<string>

	constructor(options: IIntegrationClient) {
		this.name = options.name;
		this.requiredParams = options.requiredParams;
	}

	connect(passedParameters: { [key: string]: string }, contactDetails: Array<Contact>): boolean {

		for (let i = 0; i < this.requiredParams.length; i++) {
			const param = this.requiredParams[i];

			// Very simple parameter checking, if there is a value for each required parameter the connection is successful
			if (!passedParameters[param]) return false;
		}

		// If the connection is successful, the client takes int he contact details and syncs it with their own database

		// syncContactDetails(contactDetails)

		return true;
	}

	disconnect(passedParameters: { [key: string]: string }): boolean {

		// // Search database for the record matching the passed parameters 

		// const userToBeDeleted = findMatch(passedParameter);

		// // if successful delete record and return true

		// if (userToBeDeleted){
		// 	deletedUser(userToBeDeleted);
		// 	return true;
		// }

		// // if unsuccessful return false

		// return false;

		return true; // For mocking purposes, we will always return true
	}
}

// Superclasses
export class SalesforceIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Salesforce",
			requiredParams: ["client_id", "client_secret"],
		}

		super(options);
	}
}

export class ZapierIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Zapier",
			requiredParams: ["api_key"],
		}

		super(options);
	}
}

export class HubspotIntegrationClient extends IntegrationClient {

	constructor() {
		const options: IIntegrationClient = {
			name: "Zapier",
			requiredParams: ["api_key"],
		}

		super(options);
	}

	// Hubspot requires Blinq to specify which fields the contact details should be mapped to
	// To accomodate we will override the default connect function and pass new one specific for Hubspot
	connect(passedParameters: { [key: string]: string }, contactDetails: Array<Contact>): boolean {

		for (let i = 0; i < this.requiredParams.length; i++) {
			const param = this.requiredParams[i];

			// Very simple parameter checking, if there is a non-null value for each required parameter the connection is successful
			if (!passedParameters[param]) return false;
		}

		// syncContactDetailsHubspotSpecific(contactDetails)

		return true;
	}
}

export class IntegrationClientsFactory {
	static getClientByID(id: string): IntegrationClient | undefined {
		switch (id) {
			case "Salesforce":
				return new SalesforceIntegrationClient();
			case "Zapier":
				return new ZapierIntegrationClient();
			case "Hubspot":
				return new HubspotIntegrationClient();

			// New Integration Clients to be added here ***

			default:
				return undefined;
		}
	}
}
