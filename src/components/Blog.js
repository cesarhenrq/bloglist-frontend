import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
  };

  const buttonLabel = visible ? 'hide' : 'view';

  const blogInfoVisibility = { display: visible ? '' : 'none' };

  const handleBlogLike = () => {
    onLike({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
      _id: blog.id,
    });
  };

  const handleBlogDelete = () => {
    const shouldDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    );
    shouldDelete && onDelete(blog);
  };

  const isBlogCreatedByLoggedInUser = () => {
    const loggedInUserId = JSON.parse(
      window.localStorage.getItem('user'),
    ).username;
    return blog.user.username === loggedInUserId;
  };

  return (
    <div className="blog-post">
      {blog.title} {blog.author}{' '}
      <button onClick={handleVisibility}>{buttonLabel}</button>
      <div style={blogInfoVisibility} className="blog-post-info">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={handleBlogLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {isBlogCreatedByLoggedInUser() && (
          <button onClick={handleBlogDelete}>remove</button>
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
