import React from "react";

const Form = props => (
  <form onSubmit={props.getData}>
    <select type="text" name="dataset" placeholder="Dataset...">
      <option selected value="ActualTotalLoad">Actual Total Load</option>
      <option value="AggregatedGenerationPerType">Aggregated Generation Per Type</option>
      <option value="DayAheadTotalLoadForecast">Day Ahead Total Load Forecast</option>
      <option value="ActualvsForecast">Actual vs Forecast</option>
    </select>

    <input type="text" name="areaName" placeholder="Area Name..." />
    
    <select type="text" name="resolution" placeholder="Resolution...">
      <option selected value="PT60M">Every 60 minutes</option>
      <option value="PT30M">Every 30 minutes</option>
      <option value="PT15M">Every 15 minutes</option>
    </select>
    <input type="text" name="date" placeholder="Date..."/>
    <select type="text" name="productionType" placeholder="Production Type...">
      <option selected value="AllTypes">All Types</option>
      <option value="Fossil Gas">Fossil Gas</option>
      <option value="Hydro Run-of-river and poundage">Hydro Run-of-river and poundage</option>
      <option value="HydroPumpedStorage">Hydro Pumped Storage</option>
      <option value="Hydro Water Reservoir">Hydro Water Reservoir</option>
      <option value="Fossil Hard coal">Fossil Hard coal</option>
      <option value="Nuclear">Nuclear</option>
      <option value="Fossil Brown coal/Lignite">Fossil Brown coal/Lignite</option>
      <option value="Fossil Oil">Fossil Oil</option>
      <option value="Fossil Oil shale">Fossil Oil shale</option>
      <option value="Biomass">Biomass</option>
      <option value="Fossil Peat">Fossil Peat</option>
      <option value="Wind Onshore">Wind Onshore</option>
      <option value="Wind Offshore">Wind Offshore</option>
      <option value="Fossil Coal-derived gas">Fossil Coal-derived gas</option>
      <option value="Waste">Waste</option>
      <option value="Solar">Solar</option>
      <option value="Geothermal">Geothermal</option>
      <option value="Other renewable">Other renewable</option>
      <option value="Marine">Marine</option>
      <option value="AC Link">AC Link</option>
      <option value="Transformer">Transformer</option>
      <option value="DC Link">DC Link</option>
      <option value="Substation">Substation</option>
      <option value="Other">Other</option>
    </select>
    <select type="text" name="visualization" >
      <option selected value="Table">Table</option>
      <option value="Chart">Chart</option>
    </select>
    <button>Get Data</button>
  </form>
);

export default Form;
