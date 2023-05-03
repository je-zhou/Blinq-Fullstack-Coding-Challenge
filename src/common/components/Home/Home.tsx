import React from 'react'
import styles from "./Home.module.css";
import Navbar from '@components/Navbar/Navbar';
import Content from '@components/Content/Content';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<Content></Content>
		</main>
	)
}
