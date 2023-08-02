const Blog = ({ blogs }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <div key={blog.id}>
        {blog.title} {blog.author}
      </div>
    ))}
  </div>
);

export default Blog;
