import { useState, useEffect } from "react";
import styles from "../styles/components/Countdown.module.css";

import Button from "../components/Button";

const Countdown = () => {
	const [time, setTime] = useState(25 * 60);
	const [active, setActive] = useState(false);

	const minutes = String(Math.floor(time / 60)).padStart(2, '0');
	const secons = String(time % 60).padStart(2, '0');

	useEffect(() => {
		if(active && time > 0){
			setTimeout(() => {
				setTime(time - 1);
			}, 1000);
		}
	}, [active, time]);

	function startStopCountdown(){
		setActive(!active);
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

			<Button onClick={startStopCountdown} title={!active ? "Iniciar um ciclo" : "Parar ciclo"}/>
		</div>
	);
}

export default Countdown;