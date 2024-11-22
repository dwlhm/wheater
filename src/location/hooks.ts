import { useQuery } from "@tanstack/react-query";
import { getGeolocations, getReverseGeolocation } from "./api";
import { WheaterAPIRequest } from "@/wheater/api";

export const useGeolocationSearch = (name: string) =>
  useQuery({
    queryKey: [`current.location.coords.${name}`, name],
    queryFn: getGeolocations,
    retry: false,
    refetchInterval: false,
  });

export const useReverseGeolocation = (coords: WheaterAPIRequest) =>
  useQuery({
    queryKey: [
      `current.location.name.${coords.latitude}.${coords.longitude}`,
      coords.latitude,
      coords.longitude,
    ],
    queryFn: getReverseGeolocation,
    retry: false,
    refetchInterval: false,
  });
