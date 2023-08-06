import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let container;
  const mockHandleBlogPost = jest.fn();

  beforeEach(() => {
    container = render(
      <BlogForm handleBlogPost={mockHandleBlogPost} />,
    ).container;
  });

  test('calls event handler with correct details when a new blog is created', async () => {
    const user = userEvent.setup();
    const titleInput = container.querySelector('#title');
    const authorInput = container.querySelector('#author');
    const urlInput = container.querySelector('#url');
    const submitButton = container.querySelector('button');

    await user.type(titleInput, 'Test title');
    await user.type(authorInput, 'Test author');
    await user.type(urlInput, 'Test url');
    await user.click(submitButton);

    expect(mockHandleBlogPost.mock.calls).toHaveLength(1);
    expect(mockHandleBlogPost.mock.calls[0][0]).toEqual({
      title: 'Test title',
      author: 'Test author',
      url: 'Test url',
    });
  });
});
