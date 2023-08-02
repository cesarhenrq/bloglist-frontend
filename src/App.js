import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";

import blogService from "./services/blogs";
import authService from "./services/auth";

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
      .then((user) => setUser(user))
      .catch((error) => {
        console.log(error);
      });
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

  return (
    <div>
      {user ? (
        <>
          <UserInfo user={user} />
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
