import { IntegrationPartner } from '@utils/integrationPartners'
import React from 'react'
import styles from './IntegrationTile.module.css';
import Image from 'next/image';

interface IIntegrationTile {
	integrationPartner: IntegrationPartner
}

export default function IntegrationTile({ integrationPartner }: IIntegrationTile) {
	return (
		<div className={styles.container}>
			<div className={styles.tileRow}>
				<div className={styles.logoContainer}>
					<Image src={integrationPartner.imgPath} height={80} width={80} />
				</div>
				<div className={styles.textContainer}>
					<p className={styles.title}>{integrationPartner.name}</p>
					<p>{integrationPartner.description}</p>
				</div>
				<div>
					<button className={styles.connectButton}>
						Connect
					</button>
				</div>

			</div>
		</div>
	)
}
