import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { logout } from "../store/userSlice";

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);
  
  const handleLogout = () => {
    dispatch(logout());
  };
  
  return (
    <div>
      <h2>{t("profile.title")}</h2>
      
      {user ? (
        <div>
          <p>{t("profile.email")}: {user.email}</p>
          <button onClick={handleLogout}>{t("profile.logout")}</button>
        </div>
      ) : (
        <p>{t("auth.login")}</p>
      )}
    </div>
  );
};

export default ProfilePage;