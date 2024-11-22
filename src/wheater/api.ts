import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

export type WheaterAPIRequest = {
  longitude: number;
  latitude: number;
};

export type WheaterUnits = {
  time: string;
  interval: string;
  temperature_2m: string;
  relative_humidity_2m: string;
  weather_code: string;
};

export type CurrentWheater = {
  current_units: WheaterUnits;
  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    weather_code: number;
  };
};

export async function getCurrentWheater(ctx: QueryFunctionContext) {
  try {
    const response = await axios.get<CurrentWheater>(
      `${process.env.NEXT_PUBLIC_WHEATER_API}`,
      {
        params: {
          longitude: ctx.queryKey[1],
          latitude: ctx.queryKey[2],
          forecast_days: 1,
          timezone: "auto",
          current: "temperature_2m,relative_humidity_2m,weather_code",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    throw new Error(String(error));
  }
}

export type HourlyWheater = {
  hourly_units: WheaterUnits;
  hourly: {
    time: string[];
    interval: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weather_code: number[];
  };
};

export async function getHourlyWheater(ctx: QueryFunctionContext) {
  try {
    const response = await axios.get<HourlyWheater>(
      `${process.env.NEXT_PUBLIC_WHEATER_API}`,
      {
        params: {
          longitude: ctx.queryKey[1],
          latitude: ctx.queryKey[2],
          forecast_days: 1,
          timezone: "auto",
          hourly: "temperature_2m,relative_humidity_2m,weather_code",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    throw new Error(String(error));
  }
}


export type ForecastDailyUnits = {
  time: string;
  temperature_2m_min: string;
  temperature_2m_max: string;
  weather_code: string;
};

export type DailyWheater = {
  daily_units: ForecastDailyUnits;
  daily: {
    time: string[];
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    weather_code: number[];
  };
};

export async function getDailyWheater(ctx: QueryFunctionContext) {
  try {
    const response = await axios.get<DailyWheater>(
      `${process.env.NEXT_PUBLIC_WHEATER_API}`,
      {
        params: {
          longitude: ctx.queryKey[1],
          latitude: ctx.queryKey[2],
          forecast_days: 7,
          timezone: "auto",
          daily: "weather_code,temperature_2m_max,temperature_2m_min",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw new Error(error.message);
    throw new Error(String(error));
  }
}
