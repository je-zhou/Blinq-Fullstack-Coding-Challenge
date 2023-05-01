import React, { FormEventHandler, useState } from 'react'
import styles from "./IntegrationTileSubMenu.module.css";
import buttonStyles from "@styles/Button.module.css"
import SubMenuField from './SubMenuField';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import { IntegrationPartner } from '@utils/integrationPartners';


interface IIntegrationTileSubMenu {
	integrationPartner: IntegrationPartner
}

export default function IntegrationTileSubMenu({ integrationPartner }: IIntegrationTileSubMenu) {

	const [isLoading, setIsLoading] = useState(false); // Loading state

	// Field values will be recorded in an Object: key - Field Name, value - Value
	// This Object will then be submitted to the API to try connect with the Integration Partner
	const [paramVals, setParamVals] = useState<{ [key: string]: string }>({});

	// Turning the list of required parameters into Field Components
	const fields = integrationPartner.getParamsList().map((field) =>
		<SubMenuField fieldName={field} setParamVals={setParamVals} />
	);

	// Once the fields have passed client side form validation, send an API request to connect to the Integration Partner
	async function onSubmit(event: any) {
		// Prevent form from refreshing page
		event.preventDefault()

		// Start loading UI
		setIsLoading(true);

		await integrationPartner.connect(paramVals);

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
				{isLoading ? <LoadingIndicator /> : "Connect"}
			</button>
		</form>
	)
}