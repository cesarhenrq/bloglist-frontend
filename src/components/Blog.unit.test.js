import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;

  const blog = {
    title: 'Test title',
    author: 'Test author',
    url: 'Test url',
    likes: 0,
    user: {
      name: 'Test user',
    },
  };

  const mockOnLike = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} onLike={mockOnLike} onDelete={mockOnDelete} />,
    ).container;
  });

  test('renders title and author', () => {
    const visibleElement = screen.getByText('Test title Test author');
    expect(visibleElement).toBeDefined();
  });

  test('does not render url and likes by default', () => {
    const hiddenElement = container.querySelector('.blog-post-info');
    expect(hiddenElement).toHaveStyle('display: none');
  });

  test('renders url and likes when button is clicked', () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    user.click(button);

    const visibleElement = screen.getByText('Test url');
    expect(visibleElement).toBeDefined();
  });

  test('calls event handler twice when like button is clicked twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.click(button);
    await user.click(button);

    expect(mockOnLike.mock.calls).toHaveLength(2);
  });
});
