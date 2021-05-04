
import { Card, CardContent, FormControl, MenuItem ,Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from "./InfoBox";
import LineGraph from './LineGraph';
import Map from "./Map";
import Table from "./Table";
import {sortData} from "./util";
// import "leaflet/dist/leaflet.css"; 
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState(["worldwide"]);
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTabledata]=useState([]);
  const [mapcenter,setmapcenter]=useState({lat: 34.80746, lng: -40.4796});
  const [mapzoom,setmapzoom]=useState(3);
  const [allcountry,setallcountry]=useState([]);
  const [casesType,setcasesType]=useState("cases");

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response=>response.json())
    .then((data)=>{
      setCountryInfo(data);

    });
  },[]); 

  useEffect(()=>{
const getCountriesData =async()=>{
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response)=>
    response.json()).
    then((data)=>{
      const countries = data.map((country)=>({
      name:country.country,
      value:country.countryInfo.iso2
        }));
        const sortedDate = sortData(data)
        setTabledata(sortedDate);  
setCountries(countries);
setallcountry(data);
  });
};
getCountriesData();
  },[]);

const onCountyChange=async(e)=>{
const countryCode = e.target.value;
console.log(countryCode);
setCountry(countryCode);

const url = countryCode === "worldwide"?
"https://disease.sh/v3/covid-19/all":
`https://disease.sh/v3/covid-19/countries/${countryCode}`;
// console.log(url);
// console.log(countryCode);
// console.log(countryInfo);
await fetch(url).then(response=>response.json())
.then((data)=>{
    setCountryInfo(data);
  if(countryCode !== "worldwide"){
  setmapcenter([data.countryInfo.lat,data.countryInfo.long])
  }
  setmapzoom(5)
});
  };

  console.log(countryInfo)
  // 
  return (
    <div className="app">
    <div className="app_left">
    <div className="app_header">
    <h1>covid 19 tracker</h1>
     <FormControl className="app_dropdown">
        <Select  variant="outlined" value={country} onChange={onCountyChange}>
        {/* instead of the dropdown we will make the loop  */}
         <MenuItem value="worldwide">worldwide</MenuItem>
        {countries.map(country=>(
          <MenuItem value={country.value}>{country.name}</MenuItem>
        ))}
      </Select>       
     </FormControl>
    </div>
    <div className="app_stats">
    <InfoBox isRed ={true} active={casesType === "cases"} onClick={e=>setcasesType('cases')} title="CoronaVirus Cases" total={countryInfo.cases} cases={countryInfo.todayCases}> </InfoBox>
    <InfoBox isRed={false} active={casesType === "recovered"} onClick={e=>setcasesType('recovered')} title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered}> </InfoBox>
    <InfoBox isRed ={true} active={casesType === "deaths"} onClick={e=>setcasesType('deaths')}  title="Deaths" total={countryInfo.deaths} cases={countryInfo.todayDeaths}> </InfoBox>
    </div>
    <div>
      <Map casesType={casesType} countries={allcountry} center={mapcenter} zoom={mapzoom}></Map> 
    </div>

     {/* {Header} */}
     {/* {title +Select input dropdown field} */}

     {/* {infoBox} */}
     {/* {infoBox} */}
     {/* {infoBox} */}
     {/* {Map} */}

    </div>
    <Card className="app_right">
    <CardContent>
    <h3>Live Cases by Country</h3>
    <Table countries={tableData}></Table>
    <h3>worldwide new Cases</h3>
    <LineGraph></LineGraph>
    {/* {Table} */}
     {/* {Graph} */}

    </CardContent>
    </Card>

    </div>
  );
}

export default App;
