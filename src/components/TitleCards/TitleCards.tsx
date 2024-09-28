import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/cards_data';
import { Link } from 'react-router-dom';

type TitleCardsProps = {
  title: string;
  category: string;
};

interface MovieCard {
  backdrop_path: string;
  original_title: string;
  id:string;
}


const TitleCards =  ({title, category}: TitleCardsProps) => {

  const [apiData, setApiData] = useState<MovieCard[]>([])
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRmN2FhM2I2NTI3MDE2ZDhlNWU4ZjBmMzExZGExOSIsIm5iZiI6MTcyNzM3NDk4MC4zOTQ2MjksInN1YiI6IjY2ZjVhNGY2MzkzZjM2ZmEwNGJlZGJlNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PYnO2ShBF6Yvx6X2cqptclY1q9JwWaPwM5b4Kbyw_OY'
  }
};

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY || event.deltaX;
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
    
    const currentCardsRef = cardsRef.current;
    if (currentCardsRef) {
      currentCardsRef.addEventListener('wheel', handleWheel);
    }
  },[])

  return (
    <div className='titlecards'>
      <h2>{ title? title : "Popular on Netflix" }</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards