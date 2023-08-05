import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? "hide" : "view";

  const blogInfoVisibility = { display: visible ? "" : "none" };

  return (
    <div className='blog-post'>
      {blog.title} {blog.author}{" "}
      <button onClick={handleVisibility}>{buttonLabel}</button>
      <div style={blogInfoVisibility}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  );
};

export default Blog;
