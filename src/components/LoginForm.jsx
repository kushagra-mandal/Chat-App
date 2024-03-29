import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const projectID = "c06fb561-e78b-40bc-8500-4bef40c27b97";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	//	const [error, setError] = useState("");

	const success = () => {
		toast.success("Login Successful!", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const error = () => {
		toast.error("Wrong Credentials!", {
			position: "top-center",
			autoClose: 3000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const authObject = {
			"Project-ID": projectID,
			"User-Name": username,
			"User-Secret": password,
		};

		try {
			await axios.get("https://api.chatengine.io/chats", {
				headers: authObject,
			});

			localStorage.setItem("username", username);
			localStorage.setItem("password", password);

			window.location.reload();
			success();
			//setError("");
		} catch (err) {
			error();
			//notify();
			//setError("Oops, incorrect credentials.");
		}
	};

	return (
		<div className="wrapper">
			<div className="form">
				<h1 className="title">Chat Application</h1>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="input"
						placeholder="Username"
						required
					/>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="input"
						placeholder="Password"
						required
					/>
					<div align="center">
						<button type="submit" className="button">
							<span>Login</span>
						</button>
					</div>
				</form>
				{/* <h1>{error}</h1> */}
			</div>
			<ToastContainer />
		</div>
	);
};

export default LoginForm;
