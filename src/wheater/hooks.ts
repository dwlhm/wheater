import { useQuery } from "@tanstack/react-query";
import {
  getCurrentWheater,
  getDailyWheater,
  getHourlyWheater,
  WheaterAPIRequest,
} from "./api";

export const useCurrentWheater = (req: WheaterAPIRequest) =>
  useQuery({
    queryKey: [
      `current.wheater${req.longitude}.${req.latitude}`,
      req.longitude,
      req.latitude,
    ],
    queryFn: getCurrentWheater,
    refetchInterval: 60000,
  });

export const useHourlyWheater = (req: WheaterAPIRequest) =>
  useQuery({
    queryKey: [
      `hourly.wheater.${req.latitude}.${req.longitude}`,
      req.longitude,
      req.latitude,
    ],
    queryFn: getHourlyWheater,
  });

export const useDailyWheater = (req: WheaterAPIRequest) =>
  useQuery({
    queryKey: [
      `daily.wheater.${req.latitude}.${req.longitude}`,
      req.longitude,
      req.latitude,
    ],
    queryFn: getDailyWheater,
  });
