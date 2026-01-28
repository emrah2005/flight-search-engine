const axios = require('axios');

const getAmadeusToken = async () => {
  try {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.AMADEUS_CLIENT_ID,
        client_secret: process.env.AMADEUS_CLIENT_SECRET
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Token error:', error);
    throw error;
  }
};

const searchFlights = async (origin, destination, departureDate) => {
  try {
    const token = await getAmadeusToken();
    const response = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', {
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults: 1,
      },
      headers: { Authorization: `Bearer ${token}` }
    });
    
    return (response.data.data || []).map(flight => ({
      id: flight.id,
      price: flight.price.total,
      airline: flight.validatingAirlineCodes[0] || 'Unknown',
      duration: flight.itineraries[0].duration || 'N/A',
      stops: (flight.itineraries[0].segments.length - 1) || 0,
      departureTime: flight.itineraries[0].segments[0].departure.at,
      arrivalTime: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at,
      origin,
      destination
    }));
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};

exports.handler = async (event) => {
  const { queryStringParameters = {} } = event;
  
  if (event.path.endsWith('/search')) {
    const { origin, destination, departureDate } = queryStringParameters;
    const flights = await searchFlights(origin, destination, departureDate);
    return {
      statusCode: 200,
      body: JSON.stringify({ flights })
    };
  }
  
  return { statusCode: 404, body: 'Not found' };
};
