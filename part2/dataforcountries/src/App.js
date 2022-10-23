import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);

  const [filter, setFilter] = useState("");

  const hook = () => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  };

  useEffect(hook, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      <Countries countries={countries} filterValue={filter} />
    </div>
  );
};

export default App;
