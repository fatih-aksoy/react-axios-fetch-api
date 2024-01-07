import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const api = "https://jsonplaceholder.typicode.com/users";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(api)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  console.log(data);

  return (
    <div>
      {data.map((item) => {
        return (
          <Card
            key={item.id}
            item={item}
            name={item.name}
            username={item.username}
          />
        );
      })}
    </div>
  );
};

export default App;
