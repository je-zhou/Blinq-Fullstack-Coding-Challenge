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
						<p className={styles.title}>{integrationPartner.name}</p>
						<p>{integrationPartner.description}</p>
					</div>
					{/* Connect Button */}
					<div>
						<button className={`${buttonStyles.button} ${isOpen ? buttonStyles.back : buttonStyles.connect}`} onClick={toggleSubMenu}>
							{isOpen ? "Back" : "Connect"}
						</button>
					</div>

				</div>
			</div>
			{/* Submenu */}
			{isOpen && (
				<div className="sub-menu">
					<IntegrationTileSubMenu integrationPartner={integrationPartner} />
				</div>
			)}
		</div>

	)
}
