import { useState } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider  } from "firebase/auth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { BsGoogle } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";

const Signup = () => {
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "https://salt-backend.herokuapp.com/signup";
			const token = await axios.post(url, data);
			navigate("/login");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.error);
			}
		}
	};
	const loginWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		await signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			localStorage.setItem("token", credential.idToken);
			window.location = "/";
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorMessage = error.message;
			setError(errorMessage);
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
	};

	const loginWithFacebook = async () => {
		const provider = new FacebookAuthProvider();
		const auth = getAuth();
		await signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			// console.log(credential)
			localStorage.setItem("token", credential.idToken);
			window.location = "/";
			// ...
		}).catch((error) => {
			// Handle Errors here.
			const errorMessage = error.message;
			setError(errorMessage);
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
		});
	};

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
					<div className={styles.login_btn}>
						<button type="button" onClick={loginWithGoogle} className={styles.social_btn}>
								<BsGoogle/>
						</button>
						<button type="button" onClick={loginWithFacebook} className={styles.social_btn}>
								<FaFacebookF/>
						</button>
					</div>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
