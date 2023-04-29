import React from 'react'
import styles from "./Home.module.css";
import Navbar from '@components/Navbar/Navbar';
import Content from '@components/Content/Content';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<Content></Content>

			{/* <h1 className={styles.title}>Blinq</h1>

			<p className={styles.description}>Manage your integrations here</p>

			<div className={styles.grid}>Build here</div> */}
		</main>
	)
}
