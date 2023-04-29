import React from 'react'
import styles from "./IntegrationTileSubMenu.module.css";

interface IIntegrationTileSubMenu {
	requiredParams: Array<string>
}

export default function IntegrationTileSubMenu({ requiredParams }: IIntegrationTileSubMenu) {
	return (
		<div className={styles.subMenuContainer}>{requiredParams}</div>
	)
}
