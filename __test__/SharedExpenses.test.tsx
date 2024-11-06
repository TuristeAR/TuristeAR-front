import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom'; 
import SharedExpenses from '../src/pages/SharedExpenses';
import useFetchItinerary from '../src/utilities/useFetchItinerary';
import '@testing-library/jest-dom';


jest.mock('../src/utilities/useFetchItinerary', () => jest.fn());

const mockItinerary = {
  id: 1,
  name: 'Itinerario de prueba',
};

describe('SharedExpenses Component', () => {
  beforeEach(() => {
    (useFetchItinerary as jest.Mock).mockReturnValue({ itinerary: mockItinerary });
  });


  it('should display the itinerary name', () => {
    render(
      <MemoryRouter initialEntries={['/sharedExpenses/1']}>
        <Routes>
          <Route path="/sharedExpenses/:itineraryId" element={<SharedExpenses />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(mockItinerary.name)).toBeInTheDocument();
  });
  
  it('should show the expense form when clicking "Agregar gasto"', () => {
    render(
      <MemoryRouter initialEntries={['/sharedExpenses/1']}>
        <Routes>
          <Route path="/sharedExpenses/:itineraryId" element={<SharedExpenses />} />
        </Routes>
      </MemoryRouter>
    );

    const addButton = screen.getByText(/Añadir Gasto/i);
    fireEvent.click(addButton);

    const backButtons = screen.getAllByText(/volver/i);
  
    expect(backButtons[0]).toBeInTheDocument();
  });
 
  
});
