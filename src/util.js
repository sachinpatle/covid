import React from 'react'; 
import numeral from 'numeral';
import {Circle,Popup} from 'react-leaflet';
import './Map.css';

const casesTypeColor={

    cases:{
        hex:"#CC1034",
        multilpier: 800

    },
    recovered:{

        hex:"#7dd71d",
        multilpier: 1200
    },
    deaths:{

        hex:"#CC1034",
        multilpier: 2000
    },
}; 

export const sortData =(data)=>{

    const sortedData = [...data];
    return sortedData.sort((a,b)=>(a.cases>b.cases?-1:1));

};

export const showCircleonMap =(data,casedType = "cases")=>
    data.map((country)=>(

        <Circle
        center={[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColor[casedType].hex}
        fillColor={casesTypeColor[casedType].hex} 
        radius={
            Math.sqrt(country[casedType])* casesTypeColor[casedType].multilpier
        }> 
            <Popup>
           <div className="popup_container">
                <div className="popup_flag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
                <div className="popup_name"> {country.country}</div>
                <div className="popup_cases">Cases:{numeral(country.cases).format("0,0")}</div>
                <div className="popup_recovered">Recovered:{numeral(country.recovered).format("0,0")}</div>
                <div className="popup_deaths">Deaths:{numeral(country.deaths).format("0,0")}</div>
           </div>
           </Popup>
        </Circle>
    ));


