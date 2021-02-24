import Head from "next/head";

import ExperienceBar from "../components/ExperienceBar";
import Proifile from "../components/Profile";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import Button from "../components/Button";

import styles from "../styles/pages/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
		<Head>
			<title>Home | Move It</title>
		</Head>
		<ExperienceBar/>

		<section>
			<div>
				<Proifile/>
				<CompletedChallenges/>
				<Countdown/>
			</div>
			<div>
			</div>
		</section>
    </div>
  )
}