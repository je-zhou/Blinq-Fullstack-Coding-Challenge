import React from 'react'
import styles from "./Home.module.css";
import Navbar from '@components/Navbar/Navbar';
import Body from '@components/Body/Body';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<Body></Body>

			{/* <h1 className={styles.title}>Blinq</h1>

			<p className={styles.description}>Manage your integrations here</p>

			<div className={styles.grid}>Build here</div> */}
		</main>
	)
}
