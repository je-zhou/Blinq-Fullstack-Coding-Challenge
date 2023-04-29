import React from 'react'
import styles from "./IntegrationTileSubMenu.module.css";
import buttonStyles from "@styles/Button.module.css"
import SubMenuField from './SubMenuField';


interface IIntegrationTileSubMenu {
	requiredParams: Array<string>
}

export default function IntegrationTileSubMenu({ requiredParams }: IIntegrationTileSubMenu) {
	const fields = requiredParams.map((field) => <SubMenuField fieldName={field} />)

	return (
		<div className={styles.subMenuContainer}>
			{fields}
			<button className={`${buttonStyles.button} ${buttonStyles.connect}`}>
				Connect
			</button>
		</div>
	)
}
