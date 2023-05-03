import React from 'react'
import styles from "./Home.module.css";
import Navbar from '@components/Navbar/Navbar';
import Content from '@components/Content/Content';
import SmallLayoutDisplay from '@components/SmallLayoutDisplay/SmallLayoutDisplay';

export default function Home() {
	return (
		<main className={styles.main}>
			<Navbar></Navbar>
			<Content></Content>
			<SmallLayoutDisplay />
		</main>
	)
}
