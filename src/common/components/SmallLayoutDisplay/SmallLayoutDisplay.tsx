import React from 'react';
import styles from './SmallLayoutDisplay.module.css'
import { ConnectButton } from '@components/Buttons/Buttons';

export default function SmallLayoutDisplay() {
	return (
		<div className={styles.smallLayoutDisplay}>
			<p>
				The Blinq dashboard isn’t current optimised for mobile. For the best mobile experience download the Blinq app using the following link.
			</p>
			<ConnectButton
				text='Download the app'
				onClick={() => window.open('https://play.google.com/store/apps/details?id=com.rabbl.blinq')} />
		</div>
	)
}
