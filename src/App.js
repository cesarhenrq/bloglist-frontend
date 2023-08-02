import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

import blogService from "./services/blogs";
import authService from "./services/auth";
import LogoutButton from "./components/LogoutButton";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);

  const handleLogin = (event) => {
    event.preventDefault();
    authService
      .authenticate(credentials)
      .then((user) => {
        setUser(user);
        setCredentials({ username: "", password: "" });
        window.localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
  };

  const handleCredentialsChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  useEffect(() => {
    user &&
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs))
        .catch((error) => console.log(error));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("user");
    loggedUserJSON && setUser(JSON.parse(loggedUserJSON));
  }, []);

  return (
    <div>
      {user ? (
        <>
          <UserInfo user={user} />
          <LogoutButton onClick={handleLogout} />
          <Blog blogs={blogs} />
        </>
      ) : (
        <LoginForm
          credentials={credentials}
          onSubmit={handleLogin}
          onChange={handleCredentialsChange}
        />
      )}
    </div>
  );
};

export default App;
