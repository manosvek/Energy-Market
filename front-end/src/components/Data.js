import React from "react";
import {Redirect} from 'react-router-dom';
import StickyHeadTable from "./Tables";
import Charts from "./Charts";

const Data = props =>
(
  <div className="weather__info">
    {
      !props.error && props.visualization==="Table" &&
      <StickyHeadTable
      actual_value={props.actual_value}
      time={props.time}
      forecast_value={props.forecast_value}
      type={props.type}
      day={props.day}
      month={props.month}
      dataset={props.dataset}
     />
    }
    {
      !props.error && props.visualization==="Chart" &&
      <Charts
        actual_value={props.actual_value}
        time={props.time}
        forecast_value={props.forecast_value}
        type={props.type}
        day={props.day}
        month={props.month}
        dataset={props.dataset}
      />
    }

    {
      props.error && <p className="weather__value">{props.error}</p>
    }
    {
      props.login && <Redirect to="/" />
    }
  </div>
);

export default Data;
