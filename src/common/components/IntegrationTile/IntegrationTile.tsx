import { APIOutcome, IntegrationPartner } from '@utils/integrationPartners/integrationPartners'
import React, { useState } from 'react'
import styles from './IntegrationTile.module.css';
import buttonStyles from "@styles/Button.module.css";
import Image from 'next/image';
import IntegrationTileSubMenu from './IntegrationTileSubMenu';
import LoadingIndicator from '@components/LoadingIndicator/LoadingIndicator';
import { toast } from 'react-hot-toast';

interface IIntegrationTile {
	integrationPartner: IntegrationPartner
}

export default function IntegrationTile({ integrationPartner }: IIntegrationTile) {

	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const toggleSubMenu = () => {
		setIsOpen(!isOpen);
	};

	async function disconnect() {

		setIsLoading(true); // Start loading UI

		// Pass in the field values as the required parameters to connect to the integration partner
		const outcome: APIOutcome = await integrationPartner.disconnect(integrationPartner.requiredParams);

		if (outcome.status === 200) {
			integrationPartner.isConnected = false;
			integrationPartner.resetParams();
			toggleSubMenu();
			toast.success(outcome.message)
		} else {
			toast.error(`Error code: ${outcome.status} - ${outcome.message}`)
		}

		console.log(outcome.message);
		setIsLoading(false);
	}

	// Logic for button UI
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
					{/* Buttons */}
					<div className={styles.buttonContainer}>
						{
							integrationPartner.isConnected && isOpen ?
								<button className={`${buttonStyles.button} ${buttonStyles.disconnect}`} onClick={disconnect}>
									{isLoading ? <LoadingIndicator /> : "Disconnect"}
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
					<IntegrationTileSubMenu integrationPartner={integrationPartner} toggleSubMenu={toggleSubMenu} isLoading={isLoading} setIsLoading={setIsLoading} />
				</div>
			)}
		</div>

	)
}
