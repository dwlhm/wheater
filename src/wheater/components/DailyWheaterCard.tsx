import { DailyWheater } from "../api";
import { WheaterModeToString } from "../utils";

export const DailyWheaterCard = ({ data }: { data: DailyWheater }) => {
  return (
    <div className="forecast-wheater-card">
      <h3>Daily Weather</h3>
      <div className="container">
        {data.daily?.time.map((item, index) => (
          <div className="wrapper" key={item}>
            <p className="w-code">
              {WheaterModeToString(data.daily.weather_code[index]).text}
            </p>
            <div className="body">
              <p>
                <span className="sub-title">temp.</span>
                <span>
                  {data.daily.temperature_2m_min[index]}
                  {data.daily_units.temperature_2m_min}
                </span>
              </p>
              <p>
                <span className="sub-title">hum.</span>
                <span>
                  {data.daily.temperature_2m_max[index]}
                  {data.daily_units.temperature_2m_max}
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
