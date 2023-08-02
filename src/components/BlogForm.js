import React from "react";

const BlogForm = ({ blog, onChange, onSubmit }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          Title:
          <input
            type='text'
            name='title'
            value={blog.title}
            onChange={onChange}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            name='author'
            value={blog.author}
            onChange={onChange}
          />
        </div>
        <div>
          url:
          <input type='text' name='url' value={blog.url} onChange={onChange} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
