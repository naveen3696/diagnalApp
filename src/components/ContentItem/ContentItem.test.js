import React from 'react';
import { render, screen } from '@testing-library/react';
import ContentItem from './ContentItem';

test('renders content item with correct poster image and name', () => {
  const item = {
    'poster-image': 'poster1.jpg',
    name: 'Movie Title',
  };

  render(<ContentItem item={item} />);

  const posterImage = screen.getByAltText(item.name);
  expect(posterImage).toBeInTheDocument();
  expect(posterImage).toHaveAttribute('src', `https://test.create.diagnal.com/images/${item['poster-image']}`);

  const titleElement = screen.getByText(item.name);
  expect(titleElement).toBeInTheDocument();
});

test('renders content item with placeholder image when poster image is missing', () => {
    const item = {
      'poster-image': 'posterthatismissing.jpg',
      name: 'Movie Title',
    };
  
    render(<ContentItem item={item} />);
  
    const posterImage = screen.getByAltText(item.name);
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png');
  });
  
test('renders content item with default values when item prop is undefined', () => {
  const item = undefined; 
  render(<ContentItem item={item} />);
  
  const contentItemElement = screen.queryByAltText('Movie Title');
  expect(contentItemElement).toBeNull();
});

test('renders content item with correct CSS class', () => {
  const item = {
    'poster-image': 'poster1.jpg',
    name: 'Movie Title',
  };

  render(<ContentItem item={item} />);

  const contentItemElement = screen.getByAltText('Movie Title');
  expect(contentItemElement).toBeInTheDocument();
  expect(contentItemElement.parentElement).toHaveClass('content-item');
});
