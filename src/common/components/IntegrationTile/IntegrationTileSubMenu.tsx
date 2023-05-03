import React, { useState } from 'react'
import styles from "./IntegrationTileSubMenu.module.css";
import buttonStyles from "@styles/Button.module.css"
import SubMenuField from './SubMenuField';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import { APIOutcome, IntegrationPartner } from '@utils/integrationPartners/integrationPartners';
import { toast } from 'react-hot-toast';
import { deepCopy } from '@utils/utils';

interface IIntegrationTileSubMenu {
	integrationPartner: IntegrationPartner,
	toggleSubMenu: Function,
	isLoading: boolean,
	setIsLoading: Function,
}

export default function IntegrationTileSubMenu({ integrationPartner, toggleSubMenu, isLoading, setIsLoading }: IIntegrationTileSubMenu) {

	// Field values will be recorded in an Object: key - Field Name, value - Value
	// This Object will then be submitted to the API to try connect with the Integration Partner
	const [paramVals, setParamVals] = useState<{ [key: string]: string }>(deepCopy(integrationPartner.requiredParams));

	// Turning the list of required parameters into Field Components
	const fields = integrationPartner.getParamsList().map((field) => {
		return <SubMenuField key={field} fieldName={field} paramVals={paramVals} setParamVals={setParamVals} />
	});

	async function onSubmit(event: any) {

		event.preventDefault() // Prevent form from refreshing page
		setIsLoading(true);

		// Pass in the field values as the required parameters to connect to the integration partner
		const outcome: APIOutcome = await integrationPartner.connect({ ...paramVals });

		if (outcome.status === 200) {
			integrationPartner.isConnected = true;
			integrationPartner.requiredParams = paramVals
			toggleSubMenu();
			toast.success(outcome.message)
		} else {
			toast.error(`Error code: ${outcome.status} - ${outcome.message}`)
		}

		// console.debug(outcome.message);
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