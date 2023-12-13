import { useState } from "react";
import { useLoginMutation } from "./authSlice.js";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

// Login Form
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //calls Login endpoint
  const [login, { isLoading: loginLoading, error: loginError }] =
    useLoginMutation();

  // awaits successful Login, and navigates to edit page
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!username.trim() || !password.trim()) {
    //   setError("Incorrect username and/or password");
    // }
    try {
      await login({ username, password }).unwrap();
      navigate("/edit");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="loginHeader">
        <h1>Login</h1>
        <p>Log in to your store, or register to create a new store</p>
      </div>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>
          Welcome! <br />
          Please log in!
        </h2>
        <label className="form-labels">Username: </label>
        <input
          className="form-inputs"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="form-labels">Password: </label>
        <input
          className="form-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button">Log In</button>
      </form>
      {loginError && <p role="alert">{loginError}</p>}
      <div className="register">
        <p>Don't have a store yet? Register here:</p>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </>
  );
};

export default Login;
