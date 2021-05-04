import { red, yellow } from '@material-ui/core/colors';
import {React,useEffect,useState} from 'react';
import {Line} from 'react-chartjs-2'
// import Line from 'react-chartjs-2';
import numeral from 'numeral';
const options ={
    legend:{
        display:false,
    },
    elements:{

        points:{
            radius:0 
        }
    },
    maintainAspectRation :false,
    tooltips:{
 mode:"index",
 intersect:false,
 calllbacks:{
     label:function(tooltipItem,data){
         return numeral(tooltipItem.value).format("+0.0");
     }
 },

    },
    scales:{

        xAxes:[
            {
                type:"time",
                time:{
                    format: "MM/DD/YY",
                    tooltipFormat:"ll",
                },
            },
        ],
        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                   callback: function(value,index,values)
                   {
return numeral(value).format("0a");
                   }
                },
            },
        ],

    },

};
function LineGraph() {
    const [data,setData] = useState({});
    useEffect(() => { 
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response=>response.json())
        .then(data=>{ 
            console.log(data);
            const chartData = buildChartData(data);
            setData(chartData);
        });
    }, [])

const buildChartData=(data,casesType="cases")=>
    {
    const chartData = [];
    let lastDataPoint;
    for(let date in data.cases){
    if (lastDataPoint)
    {
        const newDataPoint ={
            x:date,
            y: data[casesType][date]-lastDataPoint,
    };
    chartData.push(newDataPoint)
}
lastDataPoint = data[casesType][date];
     }
        return  chartData;
    };
    return (
        <div>
      

        {data?.length > 0 && (
            <Line options={options} data={{

datasets:[{
    backgroundColor:"red", 
    borderColor:"orange",
    data:data
}]
}}> </Line>

        )}
      
        {/* <Line data options></Line> */}
        </div>
    )
}

export default LineGraph
