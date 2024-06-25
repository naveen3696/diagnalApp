import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';


jest.mock('./Header.css', () => ({}));

describe('Header Component', () => {
  let setSearchTermMock;

  beforeEach(() => {
    setSearchTermMock = jest.fn();
    render(<Header setSearchTerm={setSearchTermMock} />);
  });

  test('renders header with title when search is not active', () => {
    expect(screen.getByText('Romantic Comedy')).toBeInTheDocument();
    expect(screen.getByAltText('Search')).toBeInTheDocument();
    expect(screen.queryByPlaceholderText('Search Movie')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Back')).not.toBeInTheDocument();
  });

  test('activates search input on search icon click', () => {
    fireEvent.click(screen.getByAltText('Search'));

    expect(screen.queryByText('Romantic Comedy')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Search')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Back')).toBeInTheDocument();
  });

  test('deactivates search input on back icon click', () => {
    fireEvent.click(screen.getByAltText('Search'));

    expect(screen.getByPlaceholderText('Search Movie')).toBeInTheDocument();
    expect(screen.getByAltText('Back')).toBeInTheDocument();

    fireEvent.click(screen.getByAltText('Back'));

    expect(screen.queryByPlaceholderText('Search Movie')).not.toBeInTheDocument();
    expect(screen.queryByAltText('Back')).not.toBeInTheDocument();
    expect(screen.getByText('Romantic Comedy')).toBeInTheDocument();
    expect(setSearchTermMock).toHaveBeenCalledWith('');
  });

  test('updates search term on input change', () => {
    fireEvent.click(screen.getByAltText('Search'));

    const searchInput = screen.getByPlaceholderText('Search Movie');
    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(setSearchTermMock).toHaveBeenCalledWith('test');
  });
});
