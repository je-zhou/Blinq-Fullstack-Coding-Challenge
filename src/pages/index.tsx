import Home from "@modules/home/Home";
import type { NextPage } from "next";
import Head from "next/head";

const IndexPage: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Blinq • Integrations</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Home />
		</div>
	);
};

export default IndexPage;