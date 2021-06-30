import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/authActions";
import createNotification from "../../utils/createNotification";

function ChangePasswordScreen() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return createNotification(
        "New password and confirm new password must be the same",
        "error"
      );
    }

    dispatch(changePassword({
      password,
      newPassword
    }));
  }

  return (
    <div className="change-password-screen">
      <form action="#" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="">Current Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="">New Password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="">Confirm New Password:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
            <button type="submit" className="button dark">Change password</button>
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordScreen;
