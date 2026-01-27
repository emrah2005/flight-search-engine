import { useState } from 'react';
import { Container, Box, Paper, Grid, TextField, Button, Card, CardContent, Typography, CircularProgress, Grid2 } from '@mui/material';
import { searchFlights } from '../services/flightsApi';
import { Flight } from '../types/flight';

const Home = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departure, setDeparture] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [maxPrice, setMaxPrice] = useState(9999);
  const [stops, setStops] = useState('any');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchFlights(from, to, departure);
      let filtered = results;
      if (stops !== 'any') {
        const maxStops = stops === 'nonstop' ? 0 : 1;
        filtered = filtered.filter(f => f.stops <= maxStops);
      }
      filtered = filtered.filter(f => f.price <= maxPrice);
      setFlights(filtered);
    } catch (error) {
      console.error('Search error:', error);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          FlightEngine - Find the Best Flights in Seconds
        </Typography>
        <Paper sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="From" value={from} onChange={(e) => setFrom(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth label="To" value={to} onChange={(e) => setTo(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField fullWidth type="date" label="Departure" InputLabelProps={{ shrink: true }} value={departure} onChange={(e) => setDeparture(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Button fullWidth variant="contained" size="large" onClick={handleSearch} disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Search Flights'}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {flights.length > 0 && (
          <Grid2 container spacing={2}>
            {flights.map((flight, idx) => (
              <Grid2 key={idx} size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{flight.airline}</Typography>
                    <Typography>${flight.price}</Typography>
                    <Typography variant="body2">{flight.duration}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}
      </Container>
    </Box>
  );
};

export default Home;
