import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; 
import ContentGrid from './ContentGrid';

jest.mock('axios');

describe('ContentGrid Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
  });

  it('fetches data and renders items', async () => {
    const mockData = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Movie 1', id: 1 },
              { name: 'Movie 2', id: 2 },
            ],
          },
        },
      },
    };
    axios.get.mockResolvedValue(mockData);

    render(<ContentGrid searchTerm="" />);

    const item1 = await screen.findByText('Movie 1');
    const item2 = screen.getByText('Movie 2');
    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();

    const loadingSpinner = screen.queryByTestId('loading-spinner');
    expect(loadingSpinner).toBeNull();
  });

  it('handles empty search results', async () => {
    const mockData = {
      data: {
        page: {
          'content-items': {
            content: [{ name: 'Romantic Movie', id: 1 },
              { name: 'Comedy Movie', id: 2 },],
          },
        },
      },
    };
    axios.get.mockResolvedValue(mockData);

    render(<ContentGrid searchTerm="nonexistent" />);

    const noItemsMessage = await screen.findByText(/no item matching search criteria/i);
    expect(noItemsMessage).toBeInTheDocument();
  });

  it('handles search term change and filtering', async () => {
    const mockData = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Romantic Movie', id: 1 },
              { name: 'Comedy Movie', id: 2 },
            ],
          },
        },
      },
    };
    axios.get.mockResolvedValue(mockData);

    render(<ContentGrid searchTerm="comedy" />);

    const romanticMovie = screen.queryByText('Romantic Movie');
    const comedyMovie = await screen.findByText('Comedy Movie');
    expect(romanticMovie).toBeNull();
    expect(comedyMovie).toBeInTheDocument();
  });

  it('handles pagination on scroll', async () => {
    const mockDataPage1 = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Movie 1', id: 1 },
            ],
          },
        },
      },
    };

    const mockDataPage2 = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Movie 2', id: 2 },
            ],
          },
        },
      },
    };

    axios.get.mockResolvedValueOnce(mockDataPage1);
    axios.get.mockResolvedValueOnce(mockDataPage2);

    render(<ContentGrid searchTerm="" />);

    const movie1 = await screen.findByText('Movie 1');
    expect(movie1).toBeInTheDocument();

    fireEvent.scroll(window, { target: { scrollY: 1000 } });

    const movie2 = await screen.findByText('Movie 2');
    expect(movie2).toBeInTheDocument();
  });
});
