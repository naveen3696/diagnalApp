import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ContentGrid from './ContentGrid';

jest.mock('axios'); 

describe('ContentGrid Component', () => {
  test('renders content grid with initial data and handles scrolling', async () => {
    // Mock data to simulate the response from axios
    const mockData = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Item 1', 'poster-image': 'poster1.jpg' },
              { name: 'Item 2', 'poster-image': 'poster2.jpg' },
              // Add more items as needed
            ],
          },
        },
      },
    };

    // Mock axios.get to return mockData when called
    axios.get.mockResolvedValue(mockData);

    // Render the ContentGrid component
    render(<ContentGrid searchTerm="" />);

    // Wait for the initial rendering of items (assuming it's synchronous or useEffect-based)
    // In this case, we can wait for the first item to be rendered
    const item1 = await screen.findByAltText('Item 1');
    expect(item1).toBeInTheDocument();

    // Simulate scrolling by firing a scroll event on window
    fireEvent.scroll(window, { target: { scrollY: 500 } });

    // Optionally, wait for the component to load more items or handle the scroll
    // Depending on your component implementation, you might need to adjust this part

    // Assert any expected behavior after scrolling, if applicable
  });

  test('filters items based on search term', async () => {
    const mockData = {
      data: {
        page: {
          'content-items': {
            content: [
              { name: 'Item 1', id: 1 },
              { name: 'Item 2', id: 2 },
            ]
          }
        }
      }
    };
    axios.get.mockResolvedValue(mockData);

    render(<ContentGrid searchTerm="item 1" />);

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    });
  });

});
