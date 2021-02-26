import "../styles/globals.css";

import ChallengesContextProvider from "../contexts/ChallengesContext";
  
function App({ Component, pageProps }) {

  	return(
	<ChallengesContextProvider>
		<Component {...pageProps} />
	</ChallengesContextProvider>  
	);
}

export default App;
