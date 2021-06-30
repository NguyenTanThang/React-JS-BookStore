import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actions/authActions";
import createNotification from "../../utils/createNotification";
import { validatePassword } from "../../utils/validate";

import "./auth.css";

function SignUpPage(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const { loading, error } = authReducer;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return createNotification(
        "Password and confirm password must be the same",
        "error"
      );
    }

    if (validatePassword(password)) {
      dispatch(
        signup({
          username,
          email,
          password,
        })
      );
      setIsSubmitted(true);
    }
  };

  useEffect(() => {
    if (isSubmitted && !loading && !error) {
      createNotification(`Your account has been created. Please login`);
      return props.history.push("/signin");
    } else if (isSubmitted && !loading && error) {
      setIsSubmitted(false);
      createNotification(error, "error");
    } else {
    }
  }, [isSubmitted, loading, error, props.history, email]);

  return (
    <div id="sign-up-page" className="auth-page section-padding">
      <div className="auth-form-container">
        <div className="container">
          <h2>Create new Account</h2>
          <form action="#" onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label htmlFor="">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                required
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                required
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="button primary block">
                Sign Up
              </button>

              <Link to="/signin" className="text-primary">
                Login into your account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
