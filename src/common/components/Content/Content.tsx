import React from 'react'
import styles from './Content.module.css';
import { IntegrationPartnerFactory } from '@utils/integrationPartners/integrationPartners';
import IntegrationTile from '@components/IntegrationTile/IntegrationTile';
import { Toaster } from 'react-hot-toast';

export default function Content() {
	// Import the integration partners
	const integrationPartners = IntegrationPartnerFactory.getIntegrationPartners();
	const integrationTiles = integrationPartners.map((partner) => <IntegrationTile key={partner.name} integrationPartner={partner} />)

	return (
		<div className={styles.content}>
			<Toaster />
			<h1 className={styles.title}>Integrations</h1>
			{
				integrationTiles
			}
		</div>
	)
}
