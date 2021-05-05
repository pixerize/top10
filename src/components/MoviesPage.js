import React, { useEffect, useState } from "react";
// import Movie from './Movie';
import Header from './Header'
import ResultHome from './ResultHome'
import PopupHome from './PopupHome'
import axios from "axios";



// const FEATURED_MOVIE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
//const FEATURED_MOVIE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
const FEATURED_MOVIE_API = "https://api.themoviedb.org/3/movie/top_rated?api_key=5d097e9689874a407b36b741622f1f6c&language=en-US&page=1";
const SEARCH_POPUP_BASE = "https://api.themoviedb.org/3/movie/"
const SEARCH_POPUP_KEY = "?api_key=5d097e9689874a407b36b741622f1f6c"
const VIDEO_BASE_API = "https://api.themoviedb.org/3/movie/"
const VIDEO_KEY_API = "/videos?api_key=5d097e9689874a407b36b741622f1f6c&language=en-US"

function MoviesPage(hide) {

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(FEATURED_MOVIE_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }

  const [state2, setState] = useState({
    s: "",
    results: [],
    videoUrl: {},
    selected: {}
  });

  const openPopup2 = id => (
    axios(VIDEO_BASE_API + id + VIDEO_KEY_API).then(({ data }) => {
      var resultVideo = '';
      if (data.results.length) {
        resultVideo = data.results[0].key;
      }

      setState(prevState => {
        return { ...prevState, videoUrl: resultVideo }
        //... spreading to get all separate props
      })
    }),

    axios(SEARCH_POPUP_BASE + id + SEARCH_POPUP_KEY).then(({ data }) => {
      let result = data;
      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  )

  const closePopup2 = () => {
    setState(prevState => {
      return { ...prevState, selected: [] }
    });
  }

  return (

    <div>

      <Header />

      <div className={`movie-container ${hide}`} >

        {movies.slice(0, 10).map(movie => (
          <ResultHome key={movie.id} movie={movie} openPopup2={openPopup2} />
        ))}

      </div>
      {/* Popup */}
      {(typeof state2.selected.title != 'undefined') ? <PopupHome selected={state2.selected} videoUrl={state2.videoUrl} closePopup2={closePopup2} /> : false}

    </div>
  )
}

export default MoviesPage;
