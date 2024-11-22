"use client";

import { CurrentWheater } from "../api";
import { WheaterModeToString } from "../utils";
import Image from "next/image";

export const CurrentWheaterCard = ({
  data,
}: {
  data: CurrentWheater | undefined;
}) => {
  const weather_condition = data
    ? WheaterModeToString(data.current.weather_code)
    : {
        text: "-",
        icon: (
          <Image
            className="animate-pulse"
            src="/icons/clear_sky.png"
            alt="loading..."
            width={150}
            height={150}
          />
        ),
      };
  return (
    <div className="current-wheater-card">
      <div className="current-wheater-card-icon-wrapper">
        {weather_condition.icon}
        <p className="current-wheater-card-code" data-testid="weather-cond">
          {weather_condition.text}
        </p>
      </div>
      <div className="current-wheater-card-body text-black dark:text-gray-100">
        <div>
          <p className="title">Temperature</p>
          {data ? (
            <p data-testid="temp">
              {`${data?.current.temperature_2m || "-"} ${
                data?.current_units.temperature_2m || "-"
              }`}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
        <div>
          <p className="title">Humidity</p>
          {data ? (
            <p data-testid="hum">
              {data.current.relative_humidity_2m}{" "}
              {data.current_units.relative_humidity_2m}
            </p>
          ) : (
            <p>-</p>
          )}
        </div>
      </div>
    </div>
  );
};
