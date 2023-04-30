import React, { useState } from 'react'
import styles from "./IntegrationTileSubMenu.module.css";
import buttonStyles from "@styles/Button.module.css"
import SubMenuField from './SubMenuField';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';


interface IIntegrationTileSubMenu {
	requiredParams: Array<string>
}

export default function IntegrationTileSubMenu({ requiredParams }: IIntegrationTileSubMenu) {
	const fields = requiredParams.map((field) => <SubMenuField fieldName={field} />)

	const [isLoading, setIsLoading] = useState(false);

	function onClick() {
		setIsLoading(true);

		setTimeout(() => {
			console.log('Mocking a delay to connect with the integration partner');
			setIsLoading(false);
		}, 1000);
	}

	return (
		<div className={styles.subMenuContainer}>
			{fields}
			<button
				className={`${buttonStyles.button} ${isLoading ? buttonStyles.loading : buttonStyles.connect}`}
				onClick={onClick}>
				{isLoading ? <LoadingIndicator/> : "Connect"}
			</button>
		</div>
	)
}

