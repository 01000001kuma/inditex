import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import Cards from "../components/Cards";

describe('Cards coomponent', () => {
  test('renders Cards component', () => {
    render(<Cards />);
    const title= screen.getByText(/Buscar podcast/i);
    expect(title).toBeInTheDocument();
  });

  test('filters podcasts based on search term', async () => {
    render(<Cards />);
    const searchImput = screen.getByPlaceholderText(/Buscar podcast/i);
    fireEvent.change(searchImput, { target: { value: 'coding' } });
    await waitFor(() => {
        const podcastTitles = screen.getAllByText(/coding/i);
        expect(podcastTitles.length).toBeGraterThan(0);
    });
});
});