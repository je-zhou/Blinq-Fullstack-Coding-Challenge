import { APIOutcome, IntegrationPartner } from '@utils/integrationPartners/integrationPartners'
import React, { ReactComponentElement, useState } from 'react'
import styles from './IntegrationTile.module.css';
import Image from 'next/image';
import IntegrationTileSubMenu from './IntegrationTileSubMenu';
import { toast } from 'react-hot-toast';
import { DisconnectButton, BackButton, ManageButton, ConnectButton } from '@components/Buttons/Buttons';


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

		// console.debug(outcome.message);
		setIsLoading(false);
	}

	// Logic for button UI
	let button = <ConnectButton onClick={toggleSubMenu} text={'Connect'} />;

	if (isOpen) {
		button = <BackButton onClick={toggleSubMenu} text={'Back'} />
	} else if (integrationPartner.isConnected) {
		button = <ManageButton onClick={toggleSubMenu} text={'Manage'} />
	}

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
								<DisconnectButton onClick={disconnect} text={'Disconnect'} isLoading={isLoading} /> :
								<></>
						}
						{button}
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
