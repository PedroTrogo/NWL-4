import styles from "../styles/components/ExperienceBar.module.css";

import { useChallengesContext } from "../contexts/ChallengesContext";

const ExperienceBar = () => {
	const { currentXP, baseXP } = useChallengesContext();

	return(
		<header className={styles.experienceBar}>
			<span>0 xp</span>
				<div>
					<div style={{ width: String(currentXP / baseXP * 100)+"%" }} />
					<span className={styles.currentExperience} style={{ left: "50%" }}>
						{currentXP}xp
					</span>
				</div>
			<span>{baseXP} xp</span>
		</header>
	);
}

export default ExperienceBar;