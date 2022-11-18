import { useEffect, useState } from 'react';

export interface Country {
  id: string;
  geonameId: number;
  name: string;
}

export interface AdminDivision1 {
  id: string;
  geonameId: number;
  name: string;
}

export interface AdminDivision2 {
  id: string;
  geonameId: number;
  name: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface RootObject {
  id: string;
  geonameId: number;
  type: string;
  name: string;
  population: number;
  elevation: number;
  timezoneId: string;
  country: Country;
  adminDivision1: AdminDivision1;
  adminDivision2: AdminDivision2;
  score: number;
  coordinates: Coordinates;
}

interface Args {
  value: string;
  limit?: number;
}

const LOCATION_URL = 'https://spott.p.rapidapi.com/places';

const fecthLocation = ({ value, limit = 5 }: Args) => {
  const [location, setLocation] = useState<RootObject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
      'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPID_API_HOST as string
    }
  };

  useEffect(() => {
    if (value) {
      const fetchLocation = async () => {
        setLoading(true);
        const res = await fetch(`${LOCATION_URL}?&limit=${limit}&q=${value}`, options);
        const data = await res.json();
        setLocation(data);

        setLoading(false);
      };

      fetchLocation();
    }
  }, [value, limit]);

  return { loading, location };
};

export default fecthLocation;
