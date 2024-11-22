"use client";

import { BasicButton, BasicError, BasicLoading } from "@/components";
import { ChangeLocationData, LocationWrapper } from "@/location/components";
import { useReverseGeolocation } from "@/location/hooks";
import { WheaterAPIRequest } from "@/wheater/api";
import { DailyWheaterCard, HourlyWheaterCard } from "@/wheater/components";
import { CurrentWheaterCard } from "@/wheater/components/CurrentWheaterCard";
import {
  useCurrentWheater,
  useDailyWheater,
  useHourlyWheater,
} from "@/wheater/hooks";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<WheaterAPIRequest>({
    longitude: 0,
    latitude: 0,
  });
  const [locationError, setLocationError] = useState<Error | null>(null);
  const [locationIsLoading, setLocationIsLoading] = useState<boolean>(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.getElementsByTagName("html")[0].className = isDarkTheme
      ? `dark`
      : `light`;
  }, [isDarkTheme]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation(coords);
          setLocationIsLoading(false);
          setLocationError(null);
        },
        (error) => {
          setLocationError(new Error(error.message));
          setLocationIsLoading(false);
        }
      );
    } else {
      setLocationError(new Error("browser not supported geolocaiton"));
      setLocationIsLoading(false);
    }
  }, []);

  const { isLoading, data, error } = useCurrentWheater(location);

  const {
    isLoading: isHourlyLoading,
    data: dataHourly,
    error: errorHourly,
  } = useHourlyWheater(location);

  const {
    isLoading: isDailyLoading,
    data: dataDaily,
    error: errorDaily,
  } = useDailyWheater(location);

  return (
    <div>
      <div className="responsive-sm mb-10">
        <LocationWrapper
          location={location}
          onChange={(data: ChangeLocationData) => {
            setLocation(data.coords);
          }}
        />
        {error ? (
          <BasicError error={new Error("Failed to get the weather info")} />
        ) : (
          <></>
        )}
        {locationError ? (
          <BasicError error={locationError}>
            <BasicButton
              className="text-black"
              onClick={() => {
                setLocationError(null);
              }}
            >
              X
            </BasicButton>
          </BasicError>
        ) : (
          <></>
        )}
        {locationIsLoading ? (
          <BasicLoading>getting geolocation info...</BasicLoading>
        ) : (
          <></>
        )}
        {isLoading ? <BasicLoading>load weather data...</BasicLoading> : <></>}
        <CurrentWheaterCard data={data} />
      </div>
      {isHourlyLoading ? (
        <BasicLoading>load hourly data...</BasicLoading>
      ) : !dataHourly ? (
        <BasicError
          error={
            errorHourly
              ? errorHourly
              : new Error("Failed to get the forecast data")
          }
        />
      ) : (
        <HourlyWheaterCard data={dataHourly} />
      )}
      {isDailyLoading ? (
        <BasicLoading>load daily data...</BasicLoading>
      ) : !dataDaily ? (
        <BasicError
          error={
            errorDaily
              ? errorDaily
              : new Error("Failed to get the forecast data")
          }
        />
      ) : (
        <DailyWheaterCard data={dataDaily} />
      )}
      <div className="flex justify-center items-center flex-col my-5">
        <BasicButton
          className="transition !bg-transparent hover:bg-transparent text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center"
          onClick={() => setIsDarkTheme((prev) => !prev)}
        >
          <p>Switch to {isDarkTheme ? `light` : `dark`}</p>
          {isDarkTheme ? (
            <ToggleRight className="size-8" />
          ) : (
            <ToggleLeft className="size-8" />
          )}
        </BasicButton>
      </div>
    </div>
  );
}
