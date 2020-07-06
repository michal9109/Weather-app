import React from "react";

const Result = (props) => {
  const {
    date,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    err,
    city,
    clouds,
    description,
    icon,
  } = props.weather;

  let content = null;

  if (!err && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleString();
    const sunsetTime = new Date(sunset * 1000).toLocaleString();
    content = (
      <div className="form__result">
        <h2 className="form__header">{city}</h2>
        <h4 className="form__date">{date}</h4>
        <div className="form__temp-icon">
          <span className="form__temp">{temp} &#176;C</span>
          <div className="form__icon">
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="icon weather"
            />
            <span>{description}</span>
          </div>
        </div>
        <ul className="form__list">
          <li className="form__data">
            Sunrise time <span>{sunriseTime}</span>
          </li>
          <li className="form__data">
            Sunset time <span>{sunsetTime}</span>
          </li>
          <li className="form__data">
            Wind <span>{wind} m/s</span>
          </li>
          <li className="form__data">
            Pressure <span>{pressure} hPa </span>
          </li>
          <li className="form__data">
            Clouds <span>{clouds} % of the sky </span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="form__err">
        {err ? `Nie mamy w bazie ${city}` : content}
      </div>
    </>
  );
};

export default Result;
