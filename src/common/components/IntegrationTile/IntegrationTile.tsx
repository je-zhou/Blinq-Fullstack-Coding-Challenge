import { IntegrationPartner } from '@utils/integrationPartners'
import React, { useState } from 'react'
import styles from './IntegrationTile.module.css';
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
					<div className={styles.logoContainer}>
						<Image src={integrationPartner.imgPath} height={80} width={80} />
					</div>
					<div className={styles.textContainer}>
						<p className={styles.title}>{integrationPartner.name}</p>
						<p>{integrationPartner.description}</p>
					</div>
					<div>
						<button className={`${styles.button} ${isOpen ? styles.back : styles.connect}`} onClick={toggleSubMenu}>
							{isOpen ? "Back" : "Connect"}
						</button>
					</div>

				</div>
			</div>
			{isOpen && (
				<div className="sub-menu">
					<IntegrationTileSubMenu requiredParams={integrationPartner.getParamsList()} />
				</div>
			)}
		</div>

	)
}
