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
    <div className="blog-form-container">
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={blog.title}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="author"
            id="author"
            value={blog.author}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            name="url"
            id="url"
            value={blog.url}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit" id="create-blog-button">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  handleBlogPost: PropTypes.func.isRequired,
};

export default BlogForm;
