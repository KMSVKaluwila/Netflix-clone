import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    publish_date: "",
    typeof: "",
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjBiMDVjNmYwZDdjMGNmMmFkMzZjZGVhYzU5NGQyYyIsIm5iZiI6MTc0MzQ1MjE0MS4yMjIwMDAxLCJzdWIiOiI2N2VhZjdlZGQ1MmVhMjMwODdiNmZiODIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VJ1bwMJIzQGmXE3GiNpliRMcAOk12EX_bpCssQMcOrk',
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results && res.results.length > 0) {
          setApiData({
            name: res.results[0].name || "Unknown",
            key: res.results[0].key || "",
            publish_date: res.results[0].published_at || "No date available",
            typeof: res.results[0].type || "Unknown",
          });
        }
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back arrow" onClick={() => {
        navigate(-1);
      }}/>
      {apiData.key ? (
        <iframe
          width='80%'
          height='80%'
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title='trailer'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading video...</p>
      )}
      <div className="player-info">
        <p>{apiData.publish_date}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
