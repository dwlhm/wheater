import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

export type Geolocation = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  timezone: string;
  country: string;
  country_id: number;
  admin1: string;
};

export type GeolocationsSearch = {
  results: Geolocation[];
  generationtime_ms: number;
};

export async function getGeolocations(ctx: QueryFunctionContext) {
  try {
    const response = await axios.get<GeolocationsSearch>(
      `${process.env.NEXT_PUBLIC_GEOLOCATION_API}`,
      {
        params: {
          name: ctx.queryKey[1],
          count: 26,
          language: "en",
          format: "json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    throw new Error(String(error));
  }
}

export type ReverseGeolocation = {
  latitude: number;
  longitude: number;
  continent: string;
  countryName: string;
  PrincipalSubdivision: string;
  city: string;
  locality: string;
  postcode: string;
};

export async function getReverseGeolocation(ctx: QueryFunctionContext) {
  try {
    const response = await axios.get<ReverseGeolocation>(
      `${process.env.NEXT_PUBLIC_REVERSE_GEOLOCATION_API}`,
      {
        params: {
          latitude: ctx.queryKey[1],
          longitude: ctx.queryKey[2],
          localityLanguage: "en",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    throw new Error(String(error));
  }
}

