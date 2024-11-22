import { HourlyWheater } from "../api";
import { WheaterModeToString } from "../utils";

export const HourlyWheaterCard = ({ data }: { data: HourlyWheater }) => {
  return (
    <div className="forecast-wheater-card">
      <h3>Hourly Weather</h3>
      <div className="container">
        {data.hourly.time.map((item, index) => (
          <div className="wrapper" key={item}>
            <p className="w-code">
              {WheaterModeToString(data.hourly.weather_code[index]).text}
            </p>
            <div className="body">
              <p>
                <span className="sub-title">temp.</span>
                <span>
                  {data.hourly.temperature_2m[index]}
                  {data.hourly_units.temperature_2m}
                </span>
              </p>
              <p>
                <span className="sub-title">hum.</span>
                <span>
                  {data.hourly.relative_humidity_2m[index]}
                  {data.hourly_units.relative_humidity_2m}
                </span>
              </p>
            </div>
            <p className="timestamp">{item.replace("T", " ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
