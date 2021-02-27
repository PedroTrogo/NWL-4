import styles from "../styles/components/ChallengeBox.module.css";

import { useChallengesContext } from "../contexts/ChallengesContext";

const ChalengeBox = () => {
	const {  
		setHasChallengeInProgressState,
		addChallengesCompletedAmount,
		addCurrentXP,
		currentChallenge,
		setCurrentChallenge
	} = useChallengesContext();

	function handleChallengeFailed(){
		setHasChallengeInProgressState(false);
		setCurrentChallenge(null);
	}

	function handleChallengeCompleted(xp: number){
		addCurrentXP(xp);
		addChallengesCompletedAmount(1);
		setHasChallengeInProgressState(false);
		setCurrentChallenge(null);
	}

	return(
		<div className={styles.container}>
			{
				!currentChallenge
				?
				<div className={styles.challengeNotActive}>
					<strong>Inicie um ciclo para receber desafios a serem completados</strong>
					<p>
						<img src="icons/level-up.svg" alt="Level Up"/>
						Complete-os e ganhe experiência e avance de leve.
					</p>
				</div>
				:
				<div className={styles.challengeActive}>
					<header>Ganhe {currentChallenge.amount} xp</header>

					<main>
						<img src={currentChallenge.type == "body" ? "icons/body.svg" : "icons/eye.svg"}/>
						<strong>Novo desafio</strong>
						<p>{currentChallenge.description}</p>
					</main>

					<footer>
						<button
							type="button"
							className={styles.challengeFailedButton}
							onClick={handleChallengeFailed}
						>
							Falhei
						</button>
						<button
							type="button"
							className={styles.challengeCompletedButton}
							onClick={() => handleChallengeCompleted(currentChallenge.amount)}
						>
							Completei
						</button>
					</footer>
				</div>
			}

		</div>
	)
}

export default ChalengeBox;