import React from 'react'
import styles from "./Home.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<h1 className={styles.title}>Blinq</h1>

			<p className={styles.description}>Manage your integrations here</p>

			<div className={styles.grid}>Build here</div>
		</main>
	)
}
