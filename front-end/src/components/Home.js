import React from "react";
import Titles from "./Titles";
import Form from "./Form";
import Data from "./Data";
import Logout from "./Logout";
import {Redirect} from 'react-router-dom';
import 'react-base-table/styles.css';

const fakeState = {
  actual_value: undefined,
  forecast_value: undefined,
  type: undefined,
  time: undefined,
  day: undefined,
  month: undefined,
  dataset: undefined,
  visualization: undefined
}

class Home extends React.Component{

  state ={
    token: this.props.token,
    error: undefined,
    login: undefined,
    flag: undefined
  }
  getData = async (e) => {
    e.preventDefault();
    fakeState.actual_value = undefined
    fakeState.time = undefined
    fakeState.day = undefined
    fakeState.month = undefined
    fakeState.forecast_value = undefined
    const dataset = e.target.elements.dataset.value;
    fakeState.dataset = dataset;
    const areaName = e.target.elements.areaName.value;
    const resolution = e.target.elements.resolution.value;
    const date = e.target.elements.date.value;
    fakeState.visualization = e.target.elements.visualization.value;
    const productionType = e.target.elements.productionType.value;
    var timeRange = undefined;
    console.log(dataset);
    console.log(this.state.token);

    if(date.length===10)
      { timeRange = "date"}

    else if(date.length===7){
       timeRange = "month"
    }
    else if(date.length===4){
       timeRange = "year"
    }
    const options = {
      method: 'GET',
      headers: {
        'X-OBSERVATORY-AUTH': this.state.token
      }
    };

    if(dataset !== "AggregatedGenerationPerType"  && areaName && resolution && date ) {
      const api_call = await fetch(`https://localhost:8765/energy/api/${dataset}/${areaName}/${resolution}/${timeRange}/${date}&format=json`, options);
      const data = await api_call.json();
      console.log(data);

      if(data.message === "Bad Request") {
        this.setState({
          error: "Try different data",
          login: undefined,
          flag: true

        });
      }
      else if(data.message === "No data") {
        console.log(data.message)
        this.setState({
          error: "No such data",
          login: undefined,
          flag: true

        });
      }
      else if(data.Authorization || data.message === "Not Authorized") {
        this.setState({
          error: undefined,
          login: "false",
          flag: true

        });
        console.log(this.state.login);
      }
      else {
        if (dataset === "ActualTotalLoad") {
          console.log("data from ActualTotalLoad")
          fakeState.actual_value = []

          if(date.length===10) { // yyyy-mm-dd
            fakeState.time = []
            for (var i in data){
              fakeState.time.push(data[i].DateTimeUTC.substring(11,16))
              fakeState.actual_value.push(data[i].ActualTotalLoadValue)
            }
          }
          else if(date.length===7) { // yyyy-mm
            fakeState.day = []
            for (var i in data){
              fakeState.day.push(data[i].Day)
              fakeState.actual_value.push(data[i].ActualTotalLoadByDayValue)
            }
          }
          else if(date.length===4) { // yyyy
            fakeState.month = []
            for (var i in data){
              fakeState.month.push(data[i].Month)
              fakeState.actual_value.push(data[i].ActualTotalLoadByMonthValue)
            }
          }
          console.log(fakeState.actual_value)
          console.log(fakeState.time)
          this.setState({
            error: undefined,
            login: undefined,
            flag: true
          });
        }
        else if (dataset === "DayAheadTotalLoadForecast") {
          console.log("data from DayAheadTotalLoadForecast")
          fakeState.forecast_value = []

          if(date.length===10) { // yyyy-mm-dd
            fakeState.time = []
            for (var i in data){
              fakeState.time.push(data[i].DateTimeUTC.substring(11,16))
              fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastValue)
            }
          }
          else if(date.length===7) { // yyyy-mm
            fakeState.day = []
            for (var i in data){
              fakeState.day.push(data[i].Day)
              fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastByDayValue)
            }
          }
          else if(date.length===4) { // yyyy
            fakeState.month = []
            for (var i in data){
              fakeState.month.push(data[i].Month)
              fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastByMonthValue)
            }
          }
          this.setState({
            error: undefined,
            login: undefined,
            flag: true
          });
        }
        else if (dataset === "ActualvsForecast") {
          console.log("data from ActualvsForecast")
          fakeState.actual_value = []
          fakeState.forecast_value = []

          if(date.length===10) {  // yyyy-mm-dd
            fakeState.time = []
            for (var i in data){
             fakeState.time.push(data[i].DateTimeUTC.substring(11,16))
             fakeState.actual_value.push(data[i].ActualTotalLoadValue)
             fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastValue)
            }
          }
          else if(date.length===7) { // yyyy-mm
            fakeState.day = []
            for (var i in data){
             fakeState.day.push(data[i].Day)
             fakeState.actual_value.push(data[i].ActualTotalLoadByDayValue)
             fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastByDayValue)
            }
          }
          else if(date.length===4) { // yyyy
            fakeState.month = []
            for (var i in data){
             fakeState.month.push(data[i].Month)
             fakeState.actual_value.push(data[i].ActualTotalLoadByMonthValue)
             fakeState.forecast_value.push(data[i].DayAheadTotalLoadForecastByMonthValue)
            }
          }
          console.log(this.state.actual_value)
          console.log(this.state.forecast_value)
          this.setState({
            error: undefined,
            login: undefined,
            flag: true
          });
        }
      }
    }
    else if (dataset === "AggregatedGenerationPerType" && areaName && resolution && date && productionType) {
      const api_call = await fetch(`https://localhost:8765/energy/api/${dataset}/${areaName}/${productionType}/${resolution}/${timeRange}/${date}&format=json`, options);
      const data = await api_call.json();
      if(data.message === "Bad Request") {
        this.setState({
          error: "Bad Request",
          login: undefined,
          flag: true

        });
      }
      else if(data.message === "No data") {
        this.setState({
          error: "No such data",
          login: undefined,
          flag: true

        });
      }
      else if(data.Authorization || data.message === "Not Authorized") {
        this.setState({
          error: undefined,
          login: "false",
          flag: true
        });
        console.log(this.state.login);
      }
      else {
        if (dataset === "AggregatedGenerationPerType") {
          console.log("data from AggregatedGenerationPerType")
          fakeState.actual_value = []
          fakeState.type = []

          if(date.length===10) { // yyyy-mm-dd
            fakeState.time = []
            for (var i in data){
              fakeState.time.push(data[i].DateTimeUTC.substring(11,16))
              fakeState.actual_value.push(data[i].ActualGenerationOutputValue)
              fakeState.type.push(data[i].ProductionType)
            }
          }
          else if(date.length===7) { // yyyy-mm
            fakeState.day = []
            for (var i in data){
              fakeState.day.push(data[i].Day)
              fakeState.actual_value.push(data[i].ActualGenerationOutputByDayValue)
              fakeState.type.push(data[i].ProductionType)
            }
          }
          else if(date.length===4) { // yyyy
            fakeState.month = []
            for (var i in data){
              fakeState.month.push(data[i].Month)
              fakeState.actual_value.push(data[i].ActualGenerationOutputByMonthValue)
              fakeState.type.push(data[i].ProductionType)
            }
          }
          this.setState({
            error: undefined,
            login: undefined,
            flag: true
          });
        }
      }

    }
    else {
      console.log("error: no data!!");
      this.setState({
        error: "Please insert values to see the results",
        login: undefined,
        flag: true
      });
    }
  }

  render(){
    console.log(this.state.error)
    console.log(this.state.flag)
    return (
      <div>
        {!this.props.token && <Redirect to="/" />}
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="column1 title-container">
                  <Titles />
                </div>
                <div className="column2 form-container">
                  <Logout token={this.state.token} />
                  {' '}
                  <Form getData={this.getData}/>

                  {this.state.flag  && <Data
                    actual_value={fakeState.actual_value}
                    forecast_value={fakeState.forecast_value}
                    type={fakeState.type}
                    error={this.state.error}
                    login={this.state.login}
                    time={fakeState.time}
                    day={fakeState.day}
                    month={fakeState.month}
                    dataset={fakeState.dataset}
                    visualization={fakeState.visualization}
                  />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Home;
