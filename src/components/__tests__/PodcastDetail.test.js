import { render, screen } from "@testing-library/react";
import PodcastDetail from "../PodcastDetail";

describe('PodcastDetail component', () => {
    it('renders Podcast name and artist', () => {
        render(<PodcastDetail />);
        const podcastName = screen.getByText('Podcast Name');
        const podcastArtist = screen.getByText('Podcast Artist');
        expect(podcastName).toBeInTheDocument();
        expect(podcastArtist).toBeInTheDocument();
    });

    it('renders episodes table with correct number of rows', () => {
        render(<PodcastDetail />);
        const tableRows = screen.getAllByRole('row');
        // quitando uno para excluir el header row
        expect(tableRows.length - 1).toEqual(20);   
    });

    it('displays episode description when episode is clicked', () => {
        render(<PodcastDetail />);
        const episodeTitle = screen.getByText('Episode Title 1 ');
        episodeTitle.click();
        const episodeDescription = screen.getByText('Episode Description 1');
        expect(episodeDescription).toBeInTheDocument(); 
        
    });
});