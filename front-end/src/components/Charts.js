import React from "react";
import {Bar, Line} from 'react-chartjs-2';

const data2 = {
        labels: undefined,
        datasets: [{
        label: undefined,
        backgroundColor: '#f16051',
        borderColor: '#f16051',
        data: undefined,
        },
        {
        label: undefined,
        backgroundColor: '#51e2f1',
        borderColor: '#51e2f1',
        data: undefined,
        }
        ]
      };

const options = {
        maintainAspectRatio: false,
        legend: {
            labels: {
                fontColor: "white"
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "white"
                }
            }]
        }
    }

const data = {
        labels: undefined,
        datasets: [{
        label: undefined,
        color: '#f16051',
        borderColor: '#f16051',
        data: undefined,
        }]
};

const data3 = {
        labels: undefined,
        datasets: [{
        label: undefined,
        backgroundColor: '#f16051',
        borderColor: '#f16051',
        data: undefined,
      }]};

export default function Charts(props) {

  if(props.dataset === "ActualTotalLoad"){
    data2.labels = undefined
    data3.labels = undefined
    if(props.time){
      data.labels = props.time;
      console.log(data.datasets[0])
      data.datasets[0].label = "Actual Total Load";
      data.datasets[0].data = props.actual_value;
    }
    else if (props.day){
      data.labels = props.day;
      console.log(data.datasets[0])
      data.datasets[0].label = "Actual Total Load By Day Value";
      data.datasets[0].data = props.actual_value;
    }
    else if (props.month){
      data.labels = props.month;
      console.log(data.datasets[0])
      data.datasets[0].label = "Actual Total Load By Month Value";
      data.datasets[0].data = props.actual_value;
    }

  }

  else if(props.dataset === "DayAheadTotalLoadForecast"){
    data2.labels = undefined
    data3.labels = undefined

    if(props.time){
      data.labels = props.time;
      console.log(data.datasets[0])
      data.datasets[0].label = "Day Ahead Total Load Forecast";
      data.datasets[0].data = props.forecast_value;
    }
    else if(props.day){
      data.labels = props.day;
      console.log(data.datasets[0])
      data.datasets[0].label = "Day Ahead Total Load Forecast";
      data.datasets[0].data = props.forecast_value;
    }
    else if(props.month){
      data.labels = props.month;
      console.log(data.datasets[0])
      data.datasets[0].label = "Day Ahead Total Load Forecast";
      data.datasets[0].data = props.forecast_value;
    }
  }

  else if(props.dataset === "ActualvsForecast"){
    data.labels = undefined
    data3.labels = undefined

    if(props.time){
      data2.labels = props.time;
      console.log(data2.datasets[0])
      data2.datasets[0].label = "Actual";
      data2.datasets[0].data = props.actual_value;
      data2.datasets[1].label = "Forecast";
      data2.datasets[1].data = props.forecast_value;
    }
    else if(props.day){
      data2.labels = props.day;
      console.log(data2.datasets[0])
      data2.datasets[0].label = "Actual";
      data2.datasets[0].data = props.actual_value;
      data2.datasets[1].label = "Forecast";
      data2.datasets[1].data = props.forecast_value;
    }
    else if(props.month){
      data2.labels = props.month;
      console.log(data2.datasets[0])
      data2.datasets[0].label = "Actual";
      data2.datasets[0].data = props.actual_value;
      data2.datasets[1].label = "Forecast";
      data2.datasets[1].data = props.forecast_value;
    }
  }

  else if(props.dataset === "AggregatedGenerationPerType" ){
    data2.labels = undefined
    data.labels = undefined

    if(props.time){
      data3.labels = props.time;
      console.log(data.datasets[0])
      data3.datasets[0].label = "Aggregated Generation Per Type";
      data3.datasets[0].data = props.actual_value;
    }
    else if(props.day){
      data3.labels = props.day;
      console.log(data.datasets[0])
      data3.datasets[0].label = "Aggregated Generation Per Type";
      data3.datasets[0].data = props.actual_value;
    }
    else if(props.month){
      data3.labels = props.month;
      console.log(data.datasets[0])
      data3.datasets[0].label = "Aggregated Generation Per Type";
      data3.datasets[0].data = props.actual_value;
    }
  }


  return(
    <div>
      {data.labels && < Line data={data} options={options} height={400}
          width={1000}/>}
      {data3.labels && < Bar data={data3} options={options} height={400}
          width={1000}/>}
      {data2.labels && < Bar data={data2} options={options} height={400}
          width={1000}/>}
    </div>
  );
}
