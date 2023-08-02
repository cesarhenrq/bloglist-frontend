import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import LogoutButton from "./components/LogoutButton";
import BlogForm from "./components/BlogForm";

import blogService from "./services/blogs";
import authService from "./services/auth";

import getToken from "./utils/getToken";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [blog, setBlog] = useState({
    title: "",
    author: "",
    url: "",
  });
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

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const handleBlogPost = (event) => {
    event.preventDefault();
    const token = getToken();
    blogService
      .create(blog, token)
      .then((blog) => {
        setBlogs([...blogs, blog]);
        setBlog({
          title: "",
          author: "",
          url: "",
        });
      })
      .catch((error) => console.log(error));
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
          <BlogForm
            blog={blog}
            onChange={handleBlogChange}
            onSubmit={handleBlogPost}
          />
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
