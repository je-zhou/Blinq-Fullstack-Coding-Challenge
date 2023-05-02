import { IntegrationPartner } from '@utils/integrationPartners'
import React, { useState } from 'react'
import styles from './IntegrationTile.module.css';
import buttonStyles from "@styles/Button.module.css";
import Image from 'next/image';
import IntegrationTileSubMenu from './IntegrationTileSubMenu';

interface IIntegrationTile {
	integrationPartner: IntegrationPartner
}

export default function IntegrationTile({ integrationPartner }: IIntegrationTile) {

	const [isOpen, setIsOpen] = useState(false);

	const toggleSubMenu = () => {
		setIsOpen(!isOpen);
	};

	let buttonClassType = isOpen ? buttonStyles.back :
		integrationPartner.isConnected ? buttonStyles.manage :
			buttonStyles.connect

	const buttonMsg =
		isOpen ? "Back" :
			integrationPartner.isConnected ? "Manage" :
				"Connect"

	return (
		<div className={styles.container}>
			<div className={styles.tileBackground}>
				<div className={styles.tileRow}>
					{/* Logo */}
					<div className={styles.logoContainer}>
						<Image src={integrationPartner.imgPath} height={80} width={80} />
					</div>
					{/* Title and Description */}
					<div className={styles.textContainer}>
						<div className={styles.tileRow}>
							<p className={styles.title}>
								{integrationPartner.name}
							</p>
							{integrationPartner.isConnected ?
								<p className={styles.connectedText}> • Connected</p> :
								<></>
							}
						</div>
						<p>{integrationPartner.description}</p>
					</div>
					{/* Connect Button */}
					<div className={styles.buttonContainer}>
						{
							integrationPartner.isConnected && isOpen ?
								<button className={`${buttonStyles.button} ${buttonStyles.disconnect}`} onClick={toggleSubMenu}>
									Disconnect
								</button> :
								<></>
						}
						<button className={`${buttonStyles.button} ${buttonClassType}`} onClick={toggleSubMenu}>
							{buttonMsg}
						</button>

					</div>
				</div>
			</div>
			{/* Submenu */}
			{isOpen && (
				<div className="sub-menu">
					<IntegrationTileSubMenu integrationPartner={integrationPartner} toggleSubMenu={toggleSubMenu} />
				</div>
			)}
		</div>

	)
}
