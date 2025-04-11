import React, { useEffect, useState, useRef } from 'react';
import './Titelcard.css';
import { Link } from 'react-router-dom';

const TitleCard = ({ titel, catergary }) => {
  const cardsRef = useRef(null);
  const [apiData, setApiData] = useState([]);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjBiMDVjNmYwZDdjMGNmMmFkMzZjZGVhYzU5NGQyYyIsIm5iZiI6MTc0MzQ1MjE0MS4yMjIwMDAxLCJzdWIiOiI2N2VhZjdlZGQ1MmVhMjMwODdiNmZiODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VJ1bwMJIzQGmXE3GiNpliRMcAOk12EX_bpCssQMcOrk'
    }
  };

  const handleWheel = (event) => {
    if (cardsRef.current) {
      event.preventDefault();
      const scrollAmount = event.deltaX !== 0 ? event.deltaX : event.deltaY * 0.5;
      cardsRef.current.scrollLeft += scrollAmount;
    }
  };

  useEffect(() => {
    const baseUrl = "https://api.themoviedb.org/3/movie/";
    const categoryParam = catergary || "now_playing";
    const url = `${baseUrl}${categoryParam}?language=en-US&page=1`;

    fetch(url, options)
      .then(res => res.json())
      .then(res => setApiData(res.results || [])) // Ensure apiData is always an array
      .catch(err => console.error("Error fetching movies:", err));

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [catergary]);

  return (
    <div className="titel-card">
      <h2>{titel || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className="card" key={index}>
            <img
              src={card.backdrop_path ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}` : 'fallback_image_url'}
              alt={card.original_title || "Unknown Title"}
            />
            <p>{card.original_title || "Unknown Title"}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCard;
