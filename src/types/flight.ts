export interface Flight {
  id?: string;
  price: number;
  airline: string;
  duration: string;
  stops: number;
  departureTime: string;
  arrivalTime: string;
  origin: string;
  destination: string;
  departureDate?: string;
  returnDate?: string;
}
