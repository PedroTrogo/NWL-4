import { createContext, useContext, useState } from "react";

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
	const baseXP = Math.pow((userLevel * 1) * 4, 2);

	function addCurrentXP(amount: number) {
		const newXP = currentXP + amount;

		if(newXP >= baseXP){
			setUserLevel(userLevel + 1);
			setCurrentXP(newXP - baseXP);
		}
		else{
			setCurrentXP(currentXP + amount);
		}
		
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
		setCurrentChallenge(ChallengesDB[index]);
		setHasChallengeInProgress(true);
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