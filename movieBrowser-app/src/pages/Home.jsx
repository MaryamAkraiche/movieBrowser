import React, { useState, useEffect } from 'react';
import { getTrendingMovies } from '../services/Api';
import { Link } from 'react-router-dom';

function Home() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const movies = await getTrendingMovies();
        setMovieList(movies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto p-6 rounded-lg shadow-lg">
      <h2 className='text-3xl mb-4'>Trending</h2>
      <div className="flex overflow-x-auto space-x-4 snap-x">
        {movieList.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 rounded-lg shadow-lg overflow-hidden snap-center">
            <Link to={`/movie/${movie.id}`}>
            <p><i className="fa-solid fa-star text-yellow-500"></i> {movie.vote_average}</p>
            <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
            <img
              className="w-full w-52 aspect-auto object-cover rounded-lg"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
