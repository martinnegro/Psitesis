//import { LoginButton } from '..';
import { useAuth0 } from '@auth0/auth0-react';
import { Redirect } from 'react-router-dom';
//import styles from './Landing.module.css';
//import IMG from '../../assets/imgLanding.jpg';

const Landing = () => {
	const { isAuthenticated, loginWithRedirect } = useAuth0();

	return (
		<div>
			{isAuthenticated ? (
				<Redirect to="/home" />
			) : (
				loginWithRedirect()
				/*<div className={styles.container}>
					<img src={IMG} className={styles.image} alt={"aaaa"}/>
					<h4 className={styles.information}>Encontra ARTÍCULOS escritos por expertos para ayudarte a hacer tu tesis</h4>
					<LoginButton btnText="Comencemos" loginWith="Redirect" />
				</div>*/
			)}
			<div></div>
		</div>
	);
};

export default Landing;
