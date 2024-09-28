import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom';

interface MovieCard {
  name: string;
  key: string;
  published_at: string;
  type: string;
}

const Player = () => {

  const {id} = useParams();

  const navigate = useNavigate();

  const [apiData, setapiData] = useState<MovieCard>({
    name: '',
    key:'',
    published_at:'',
    type:''
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRmN2FhM2I2NTI3MDE2ZDhlNWU4ZjBmMzExZGExOSIsIm5iZiI6MTcyNzM3NDk4MC4zOTQ2MjksInN1YiI6IjY2ZjVhNGY2MzkzZjM2ZmEwNGJlZGJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYnO2ShBF6Yvx6X2cqptclY1q9JwWaPwM5b4Kbyw_OY'
    }
  };
  
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setapiData(response.results[0]))
    .catch(err => console.error(err));
  },[])

  return (
    <div className='player'>
      <img src={back_arrow_icon} onClick={() => {navigate('/')}} alt="" />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullScreen ></iframe>
      <div className="player-info">
        <p>{apiData.name}</p>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  )
}

export default Player