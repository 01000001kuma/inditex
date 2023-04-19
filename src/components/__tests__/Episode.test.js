import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Podcast from './Podcast';

describe('Podcast', () => {
  it('should fetch podcast data and render it on the page', async () => {
    const mockData = {
      results: [
        {
          collectionId: 934552872,
          artworkUrl600: 'https://example.com/artwork.jpg',
          collectionName: 'Podcast Name',
          artistName: 'Podcast Artist',
          description: '<p>Podcast description</p>'
        },
        {
          trackId: 12345,
          trackName: 'Episode Name',
          description: '<p>Episode description</p>',
          collectionViewUrl: 'https://example.com/episode.mp3'
        }
      ]
    };
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockData)
    });

    render(<Podcast />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByAltText('Podcast Name')).toBeInTheDocument();
    expect(screen.getByText('Podcast Name')).toBeInTheDocument();
    expect(screen.getByText('By: Podcast Artist')).toBeInTheDocument();
    expect(screen.getByText('Podcast description')).toBeInTheDocument();
    expect(screen.getByText('Episode Name')).toBeInTheDocument();
    expect(screen.getByText('Episode description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });
});
