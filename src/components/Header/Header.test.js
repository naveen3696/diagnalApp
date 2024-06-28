import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders header with default title', () => {
    render(<Header setSearchTerm={() => {}} />);
    const headerTitle = screen.getByText(/romantic comedy/i);
    expect(headerTitle).toBeInTheDocument();
  });

  it('toggles search mode when search icon is clicked', () => {
    const setSearchTerm = jest.fn();
    render(<Header setSearchTerm={setSearchTerm} />);
    
    const searchIcon = screen.getByAltText('Search');
    fireEvent.click(searchIcon);
    
    const searchInput = screen.getByPlaceholderText('Search Movie');
    expect(searchInput).toBeInTheDocument();
  });

  it('clears search term and exits search mode when back icon is clicked', () => {
    const setSearchTerm = jest.fn();
    render(<Header setSearchTerm={setSearchTerm} />);
    
    const searchIcon = screen.getByAltText('Search');
    fireEvent.click(searchIcon);
    
    const backIcon = screen.getByAltText('Back');
    fireEvent.click(backIcon);
    
    const searchInput = screen.queryByPlaceholderText('Search Movie');
    expect(searchInput).not.toBeInTheDocument();
  });

  it('updates search term when typing into the search input', () => {
    const setSearchTerm = jest.fn();
    render(<Header setSearchTerm={setSearchTerm} />);
    
    const searchIcon = screen.getByAltText('Search');
    fireEvent.click(searchIcon);
    
    const searchInput = screen.getByPlaceholderText('Search Movie');
    fireEvent.change(searchInput, { target: { value: 'Romantic' } });
    
    expect(setSearchTerm).toHaveBeenCalledWith('Romantic');
  });
});
