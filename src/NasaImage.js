import React, { useState } from 'react';
import './NasaImage.css';

const NasaImage = () => {
  const [date, setDate] = useState('');
  const [data, setData] = useState(null);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleFetchData = () => {
    if (!date) {
      alert('Please select a date first.');
      return;
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for comparison

    // Parse selected date
    const selectedDate = new Date(date);

    // Compare selected date with today's date
    if (selectedDate > today) {
      alert('Too far into the future!');
      return;
    }

    fetch(`https://api.nasa.gov/planetary/apod?api_key=7lHKRGKsjkAwdl2I0PBEBsQtmIKTwgJhuZGHZaUa&date=${date}`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  };

  return (
    <div id="center">
      <h1>NASA Pic of the Day API</h1>
      <div className="row">
        <article className="col-2">
          <br/>
          <label htmlFor="dateInput">Search a date: </label>
          <input type="date" id="dateInput" onChange={handleDateChange}/>
          <button onClick={handleFetchData}>Search the API!</button>
          <br/>
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

export default NasaImage;
