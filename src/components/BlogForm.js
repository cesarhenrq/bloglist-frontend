import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleBlogPost }) => {
  const [blog, setBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleBlogPost(blog);
    setBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            value={blog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired,
};

export default BlogForm;
