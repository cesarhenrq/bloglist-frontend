import { useState } from "react";

const Blog = ({ blog, onClick }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const blogInfoVisibility = { display: visible ? "" : "none" };

  const handleBlogLike = () => {
    onClick({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      _id: blog.id,
    });
  };

  return (
    <div className='blog-post'>
      {blog.title} {blog.author}{" "}
      <button onClick={handleVisibility}>{buttonLabel}</button>
      <div style={blogInfoVisibility}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleBlogLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
