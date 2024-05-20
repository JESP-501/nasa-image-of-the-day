import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleDateChange = (e) => {
    const dateStr = e.target.value;
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${dateStr}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <div id="center">
      <h1>NASA Pic of the Day API</h1>
      <div className="row">
        <article className="col-2">
          <label htmlFor="dateInput">Search a date: </label>
          <input type="date" id="dateInput" onChange={handleDateChange} /><br /><br /><br />
          {data && data.media_type === "image" && <img src={data.url} id="image" className="image" alt={data.title} />}
          {data && data.media_type === "video" && <iframe src={data.url} frameBorder="0" id="video" title={data.title}></iframe>}
        </article>
        <article className="col-2">
          {data && <h1 id="imageTitle">Title: {data.title}</h1>}
          {data && <h2 id="imageDate">Date: {data.date}</h2>}
          {data && <h3 id="explanation">Description: {data.explanation}</h3>}
        </article>
      </div>
    </div>
  );
};

export default App;