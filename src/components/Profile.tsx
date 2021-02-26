import styles from "../styles/components/Profile.module.css";

import { useChallengesContext } from "../contexts/ChallengesContext";

const Profile = () => {
	const { userLevel } = useChallengesContext();

	return(
		<div className={styles.profileContainer}>
			<img src="https://github.com/PedroTrogo.png" alt="Pedro Trogo"/>
			<div>
				<strong>Pedro Trogo</strong>
				<p>
					<img src="icons/level.svg" alt="Level"/>
					Level {userLevel}
				</p>
			</div>
		</div>
	)
}

export default Profile;