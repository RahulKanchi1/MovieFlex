import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './movies.css';

function Movies() {
  const [data, setData] = useState([]); // Original data from API
  const [searchQuery, setSearchQuery] = useState(''); // State for search input

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const options = {
      method: 'GET',
      url: 'https://imdb-top-100-movies.p.rapidapi.com/',
      headers: {
        'x-rapidapi-key': '55b77dc763msh63765f27a73b455p11b767jsn4fd9a2d7788a',
          'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      
      
      setData(response.data); // Store full data here
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Filter data based on search query
  const filteredMovies = data.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Search Bar */}
      <span className='loc'>Movieflex</span>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value) }
         className='searchbar'/>
      </div>

      {/* Movies List */}
      {filteredMovies.length > 0 ? (
        <div className="movies">
          {filteredMovies.map((info, index) => (
            <div className="item" key={index}>
              <h3>{info.title}</h3>
              <img src={info.image} alt="movie" />
              <p>
                <b>Description:</b> {info.description}
              </p>
              <h3>Genre: {info.genre}</h3>
              <h3>
                <a href={info.imdb_link} target="_blank" rel="noopener noreferrer">
                  IMDb Link
                </a>
              </h3>
              <h3>Rank: {info.rank}</h3>
              <h3>Rating: {info.rating}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
}

export default Movies;
