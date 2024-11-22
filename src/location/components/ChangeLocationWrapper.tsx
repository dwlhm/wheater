import { BasicButton, BasicError, BasicLoading } from "@/components";
import { useState } from "react";
import { useGeolocationSearch } from "../hooks";
import { WheaterAPIRequest } from "@/wheater/api";

export type ChangeLocationData = { coords: WheaterAPIRequest; name: string };

export const ChangeLocationWrapper = ({
  onClose,
  onSelected,
}: {
  onClose: () => void;
  onSelected: (data: ChangeLocationData) => void;
}) => {
  const [desiredLocation, setDesiredLocation] = useState<string>("");

  const { isLoading, data, error } = useGeolocationSearch(desiredLocation);

  return (
    <div className="location-wrapper-popup">
      <div className="location-wrapper-popup-container responsive-xl">
        <div className="location-wrapper-popup-container-header">
          <h3>Change location</h3>
          <BasicButton
            className="btn"
            onClick={() => {
              onClose();
            }}
          >
            X
          </BasicButton>
        </div>
        <input
          type="text"
          placeholder="type your desired place"
          onChange={(e) => {
            setDesiredLocation(e.target.value);
          }}
        />
        <div className="result">
          {!desiredLocation ? (
            <p className="loading">waiting for your typing...</p>
          ) : isLoading ? (
            <BasicLoading />
          ) : (
            <div>
              {!data ? (
                error ? (
                  <BasicError error={error} />
                ) : (
                  <></>
                )
              ) : (
                data.results ? data.results.map((item) => (
                  <div
                    key={item.id}
                    className="wrapper"
                    onClick={() => {
                      onSelected({
                        coords: {
                          latitude: item.latitude,
                          longitude: item.longitude,
                        },
                        name: item.name,
                      });
                      onClose();
                    }}
                  >
                    <p className="geolocation-city-name">
                      {item.name}{" "}
                      <span>
                        {item.admin1 ? item.admin1 + "," : ""}
                        {item.country}
                      </span>
                    </p>
                    <p className="geolocation-city-coords">
                      {item.latitude}, {item.longitude}
                    </p>
                  </div>
                )) : <BasicError error={new Error("city not found.")} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
