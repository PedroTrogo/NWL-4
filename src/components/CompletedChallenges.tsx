import styles from "../styles/components/CompletedChallenges.module.css";

import { useChallengesContext } from "../contexts/ChallengesContext";

const CompletedChallenges = () => {
	const { challengesCompletedAmount } = useChallengesContext();

	return(
		<div className={styles.container}>
			<span>Desafios Completos</span>
			<span>{String(challengesCompletedAmount).padStart(2, "0")}</span>
		</div>
	)
}

export default CompletedChallenges;