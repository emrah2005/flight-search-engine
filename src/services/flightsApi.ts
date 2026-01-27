import axios from 'axios';
import { Flight } from '../types/flight';

const API_URL = import.meta.env.VITE_API_URL || '/.netlify/functions/flights';

const api = axios.create({
  baseURL: API_URL,
});

export const searchFlights = async (
  origin: string,
  destination: string,
  departureDate: string
): Promise<Flight[]> => {
  try {
    const response = await api.get('/search', {
      params: {
        origin,
        destination,
        departureDate,
      },
    });
    return response.data.flights || [];
  } catch (error) {
    console.error('Flight search error:', error);
    return [];
  }
};

export const autocompleteAirports = async (query: string) => {
  try {
    const response = await api.get('/autocomplete', {
      params: { query },
    });
    return response.data.airports || [];
  } catch (error) {
    console.error('Autocomplete error:', error);
    return [];
  }
};
