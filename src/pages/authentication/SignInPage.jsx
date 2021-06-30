import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./auth.css";
import createNotification from "../../utils/createNotification";
import { signin } from "../../actions/authActions";

function SignInPage(props) {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const { loading, error, userInfo } = authReducer;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSubmitted && !loading && !error) {
      createNotification(`Welcome back, ${userInfo.username}`);
      return props.history.push("/");
    } else if (isSubmitted && !loading && error) {
      setIsSubmitted(false);
      createNotification(error, "error");
    } else {
    }
  }, [isSubmitted, loading, error, props.history, userInfo]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(signin({ email, password }));

    setIsSubmitted(true);
  };

  return (
    <div id="sign-in-page" className="auth-page section-padding">
      <div className="auth-form-container">
        <div className="container">
          <h2>Login to your account</h2>
          <form action="#" onSubmit={onSubmitHandler}>
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
              />
            </div>

            <div className="form-group">
              <button type="submit" className="button primary block">
                Sign In
              </button>

              <Link to="/signup" className="text-primary">
                Create new account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
