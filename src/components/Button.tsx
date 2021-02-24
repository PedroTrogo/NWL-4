import React from "react";
import styles from "../styles/components/Button.module.css";

const Button = (props: React.HTMLProps<HTMLButtonElement>) => {
	const { title = "" } = props;

	return(
		<button {...props} type="button" className={styles.container}>
			{title}
		</button>
	);
}

export default Button;