import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import LogoutButton from "./components/LogoutButton";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import authService from "./services/auth";

import getToken from "./utils/getToken";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef(null);

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

  const handleBlogPost = async (blog) => {
    const token = getToken();
    try {
      blogFormRef.current.toggleVisibility();
      const newBlog = await blogService.create(blog, token);

      setBlogs([
        ...blogs,
        {
          ...newBlog,
          user: {
            username: user.username,
            name: user.name,
            id: newBlog.user,
          },
        },
      ]);

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

  const handleBlogLike = async (blog) => {
    const token = getToken();
    try {
      const updatedBlog = await blogService.update(blog, token);

      setBlogs(
        blogs
          .map((blog) =>
            blog.id === updatedBlog.id
              ? {
                  ...updatedBlog,
                  user: {
                    username: blog.user.username,
                    name: blog.user.name,
                    id: updatedBlog.user,
                  },
                }
              : blog
          )
          .sort((a, b) => b.likes - a.likes)
      );
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
        blogs.sort((a, b) => b.likes - a.likes);
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
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm handleBlogPost={handleBlogPost} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} onClick={handleBlogLike} />
          ))}
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
