import { createContext, useContext, useState, useEffect } from "react";

const ChallengeContext = createContext({});

import ChallengesDB, { IChallengeData} from "../db/challenges";

interface IProps {
	children: React.ReactNode;
}

export default function ChallengesContextProvider({ children }: IProps) {
	const [ userLevel, setUserLevel ] = useState(1);
	const [ currentXP, setCurrentXP ] = useState(0);
	const [hasChallengeInProgress, setHasChallengeInProgress] = useState(false);
	const [challengesCompletedAmount, setChallengesCompletedAmount] = useState(0);
	const [currentChallenge, setCurrentChallenge] = useState<IChallengeData | null>(null);
	const baseXP = Math.pow((userLevel * 1) * 3, 2);

	useEffect(() => {
		Notification.requestPermission();
		
	}, [])
	
	function addCurrentXP(amount: number) {
		let newXP = currentXP + amount;
		let newBaseXP = baseXP;
		let newLevel = userLevel;

		while(newXP >= newBaseXP){
			newXP -= newBaseXP;
			newLevel ++;
			newBaseXP = Math.pow((newLevel * 1) * 4, 2);
		}
		
		setUserLevel(newLevel);
		setCurrentXP(newXP);
	}

	function addLevel(amount: number){
		setUserLevel(userLevel + amount);
	}	

	function addChallengesCompletedAmount(amount: number) {
		setChallengesCompletedAmount(challengesCompletedAmount + amount);
	}

	function setHasChallengeInProgressState (state: boolean) {
		setHasChallengeInProgress(state);
	}

	function startNewChallenge(){
		const index = Math.floor(Math.random() *  ChallengesDB.length);
		const chalenge = ChallengesDB[index];
		setCurrentChallenge(chalenge);
		setHasChallengeInProgress(true);
		
		if(Notification.permission === "granted"){
			new Audio("./notification.mp3");
			
			new Notification("Novo desafio 🎉", {
				body: `Valendo ${chalenge.amount}xp`,
			});
		}
	}

	return (
		<ChallengeContext.Provider value={{
			userLevel,
			currentXP,
			baseXP,
			addCurrentXP,
			addLevel,
			hasChallengeInProgress,
			setHasChallengeInProgressState,
			challengesCompletedAmount,
			addChallengesCompletedAmount,
			currentChallenge,
			setCurrentChallenge,
			startNewChallenge
		}}>
			{ children }
		</ChallengeContext.Provider>
	)
}

interface IChallengeContextProps {
	userLevel?: number;
	currentXP?: number;
	baseXP?: number;
	addCurrentXP?: (amount: number) => void;
	addLevel?: (amount: number) => void;
	hasChallengeInProgress?: boolean;
	setHasChallengeInProgressState?: (state: boolean) => void;
	challengesCompletedAmount?: number;
	addChallengesCompletedAmount?: (amount: number) => void;
	currentChallenge?: IChallengeData;
	setCurrentChallenge?: (value: null | IChallengeData) => void;
	startNewChallenge?: () => void;
}


export function useChallengesContext() {
	const challengeContext: IChallengeContextProps = useContext(ChallengeContext);

	return challengeContext;
}