import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handles input changes and updates the credentials state
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
  
    try {
      // Make the login request
      const res = await axios.post("/auth/login", credentials, {
        withCredentials: true, // Include cookies for session
      });
  
      // Log the response to see what is being returned
      console.log("Login response:", res.data);
  
      // Check if the response contains user details
      if (res.data && res.data.details) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        alert("Login Successful");
        navigate("/");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data || { message: "Login failed" } });
    }
  };
  

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
