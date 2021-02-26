import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";
import { useChallengesContext } from "../contexts/ChallengesContext";

let countdownTimeout: NodeJS.Timeout;
const MAX_TIME =  0.1 * 60;

const Countdown = () => {
	const { 
		setHasChallengeInProgressState,
		hasChallengeInProgress,
		startNewChallenge,
	} = useChallengesContext();
	const [time, setTime] = useState(MAX_TIME);
	const [isActive, setIsActive] = useState(false);
	const [hasCountdownFinihed, setHasCountdownFinished] = useState(false);

	const minutes = String(Math.floor(time / 60)).padStart(2, '0');
	const secons = String(time % 60).padStart(2, '0');

	useEffect(() => {
		if(isActive && time > 0){
			countdownTimeout = setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}else if(isActive && time === 0){
			setHasCountdownFinished(true);
		}
	}, [isActive, time]);

	useEffect(() => {
		if(!hasChallengeInProgress)
			resetCoutdown();

	}, [hasChallengeInProgress])

	function startStopCountdown(){
		setIsActive(!isActive);
		startNewChallenge();
		setHasCountdownFinished(false);
	}

	function resetCoutdown(){
		clearTimeout(countdownTimeout);
		setHasChallengeInProgressState(false);
		setHasCountdownFinished(false);
		setIsActive(false);
		setTime(MAX_TIME);
	}

	return (
		<div>
			<div className={styles.container}>
				<div>
					<span>{minutes.charAt(0)}</span>
					<span>{minutes.charAt(1)}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secons.charAt(0)}</span>
					<span>{secons.charAt(1)}</span>
				</div>
			</div>

			{
				hasCountdownFinihed
				?
				<button 
					onClick={startStopCountdown} 
					type="button" 
					className={styles.buttonContainer}
					disabled
				>
					Ciclo finalizado
				</button>
				:
				<>
					{
					!isActive
						? 
						<button 
							onClick={startStopCountdown} 
							type="button" 
							className={styles.buttonContainer}
						>
							Iniciar um ciclo
						</button>
						:
						<button 
							onClick={resetCoutdown} 
							type="button" 
							className={styles.buttonContainer +" "+ styles.buttonContainerActive}
						>
							Abandonar ciclo X
						</button>
					}
				</>
			}

		</div>
	);
}

export default Countdown;