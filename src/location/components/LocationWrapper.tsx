import { BasicButton, BasicError, BasicLoading } from "@/components";
import { WheaterAPIRequest } from "@/wheater/api";
import { MapPinCheckInside } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import {
  ChangeLocationData,
  ChangeLocationWrapper,
} from "./ChangeLocationWrapper";
import { useReverseGeolocation } from "../hooks";

export const LocationWrapper = ({
  location,
  onChange,
}: {
  location: WheaterAPIRequest;
  onChange: (data: ChangeLocationData) => void;
}) => {
  const [popup, setPopup] = useState<ReactNode>(<></>);
  const [newLocation, setNewLocation] = useState<WheaterAPIRequest>(location);

  const close = () => {
    setPopup(<></>);
  };

  const {
    isLoading,
    data: dataLocation,
    error,
  } = useReverseGeolocation(newLocation);

  return (
    <>
      <div className="location-wrapper">
        <MapPinCheckInside className="icon" />
        <div className="location-wrapper-body">
          {isLoading ? (
            <BasicLoading />
          ) : dataLocation ? (
            dataLocation.city == "" ? (
              "0,0"
            ) : (
              <p>
                {dataLocation.city}, <span>{dataLocation.locality}</span>
              </p>
            )
          ) : error ? (
            <BasicError className="error-text-red-style"
              error={
                error.message == "Request failed with status code 403"
                  ? new Error("no network")
                  : error
              }
            />
          ) : (
            "-"
          )}
        </div>
        <BasicButton
          className="location-wrapper-action"
          onClick={() => {
            setPopup(
              <ChangeLocationWrapper
                onClose={() => close()}
                onSelected={(data) => {
                  onChange(data);
                  setNewLocation(data.coords);
                }}
              />
            );
          }}
        >
          Change
        </BasicButton>
      </div>
      {popup}
    </>
  );
};
