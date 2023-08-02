import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import LogoutButton from "./components/LogoutButton";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

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
  const [notification, setNotification] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.authenticate(credentials);

      setUser(user);
      setCredentials({ username: "", password: "" });
      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        error: true,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
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

  const handleBlogPost = async (event) => {
    event.preventDefault();
    const token = getToken();
    try {
      const newBlog = await blogService.create(blog, token);

      setBlogs([...blogs, newBlog]);
      setBlog({
        title: "",
        author: "",
        url: "",
      });

      setNotification({
        message: `A new blog ${blog.title} by ${blog.author} added`,
        error: false,
      });

      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (error) {
      setNotification({
        message: error.response.data.error,
        error: true,
      });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        setNotification({
          message: error.response.data.error,
          error: true,
        });
      }
    };
    user && fetchBlogs();
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
          <Notification notification={notification} />
          <BlogForm
            blog={blog}
            onChange={handleBlogChange}
            onSubmit={handleBlogPost}
          />
          <Blog blogs={blogs} />
        </>
      ) : (
        <>
          <Notification notification={notification} />
          <LoginForm
            credentials={credentials}
            onSubmit={handleLogin}
            onChange={handleCredentialsChange}
          />
        </>
      )}
    </div>
  );
};

export default App;
