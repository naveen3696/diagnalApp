import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders Header component with initial title', () => {
    render(<App />);
    const headerTitle = screen.getByText('Romantic Comedy');
    expect(headerTitle).toBeInTheDocument();
  });

  test('changes header title when clicking on search icon', () => {
    render(<App />);
    const searchIcon = screen.getByAltText('Search');
    fireEvent.click(searchIcon);
    
    const headerTitle = screen.getByPlaceholderText('Search Movie');
    expect(headerTitle).toBeInTheDocument();
  });

  test('back button in Header resets search state', () => {
    render(<App />);
    
    const searchIcon = screen.getByAltText('Search');
    fireEvent.click(searchIcon);

    let headerTitle = screen.getByPlaceholderText('Search Movie');
    expect(headerTitle).toBeInTheDocument();

    const backButton = screen.getByAltText('Back');
    fireEvent.click(backButton);

    headerTitle = screen.getByText('Romantic Comedy');
    expect(headerTitle).toBeInTheDocument();
  });
});
