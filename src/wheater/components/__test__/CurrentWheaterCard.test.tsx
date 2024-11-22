import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CurrentWheaterCard } from "../CurrentWheaterCard";

describe(`displaying current weather icon`, () => {
  render(
    <CurrentWheaterCard
      data={{
        current_units: {
          time: "iso8601",
          interval: "seconds",
          temperature_2m: "°C",
          relative_humidity_2m: "%",
          weather_code: "wmo code",
        },
        current: {
          time: "2024-11-20T14:00",
          interval: 900,
          temperature_2m: 3.0,
          relative_humidity_2m: 82,
          weather_code: 3,
        },
      }}
    />
  );

  it("render weather conditions correcty", () => {
    expect(screen.getByTestId("weather-cond").textContent).toBe("Overcast");
  });
  it("render temperature correcty", () => {
    expect(screen.getByTestId("temp").textContent).toBe("3 °C");
  });
  it("render humidity correcty", () => {
    expect(screen.getByTestId("hum").textContent).toBe("82 %");
  });
});
