import React, { FormEventHandler, useState } from 'react'
import styles from "./IntegrationTileSubMenu.module.css";
import buttonStyles from "@styles/Button.module.css"
import SubMenuField from './SubMenuField';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import { APIOutcome, IntegrationPartner } from '@utils/integrationPartners';


interface IIntegrationTileSubMenu {
	integrationPartner: IntegrationPartner,
	toggleSubMenu: Function,
}

export default function IntegrationTileSubMenu({ integrationPartner, toggleSubMenu }: IIntegrationTileSubMenu) {

	const [isLoading, setIsLoading] = useState(false); // Loading state

	// Field values will be recorded in an Object: key - Field Name, value - Value
	// This Object will then be submitted to the API to try connect with the Integration Partner
	const [paramVals, setParamVals] = useState<{ [key: string]: string }>(integrationPartner.requiredParams);

	// Turning the list of required parameters into Field Components
	const fields = integrationPartner.getParamsList().map((field) => {
		return <SubMenuField key={field} fieldName={field} paramVals={paramVals} setParamVals={setParamVals} />
	}
	);

	// Once the fields have passed client side form validation, send an API request to connect to the Integration Partner
	async function onSubmit(event: any) {
		// Prevent form from refreshing page
		event.preventDefault()

		console.log(paramVals)

		// Start loading UI
		setIsLoading(true);

		// Pass in the field values as the required parameters to connect to the integration partner
		const outcome: APIOutcome = await integrationPartner.connect(paramVals);

		if (outcome.status === 200) {
			console.log(outcome.message);
			integrationPartner.isConnected = true;
			integrationPartner.requiredParams = paramVals
			toggleSubMenu();
		} else {
			console.log(outcome.message)
		}


		setIsLoading(false);
	}

	return (
		<form className={styles.subMenuContainer} onSubmit={onSubmit}>
			{/* Fields */}
			{fields}
			{/* Connect Button */}
			<button
				className={`${buttonStyles.button} ${isLoading ? buttonStyles.loading : buttonStyles.connect}`}
				type='submit'
			>
				{isLoading ? <LoadingIndicator /> : integrationPartner.isConnected ? "Save" : "Connect"}
			</button>
		</form>
	)
}