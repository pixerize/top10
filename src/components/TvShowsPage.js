import React, { useEffect, useState } from "react";
import Header from './Header'
// import ResultHomeTv from './ResultHomeTv'
import ResultHome from './ResultHome'
import PopupHome from './PopupHome'
import axios from "axios";

const FEATURED_TVSHOW_API = "https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
// const SEARCH_TVSHOW_API = "https://api.themoviedb.org/3/search/tv?&api_key=5d097e9689874a407b36b741622f1f6c&query="
// const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?&api_key=5d097e9689874a407b36b741622f1f6c&query="
const SEARCH_POPUP_BASE = "https://api.themoviedb.org/3/tv/"
const SEARCH_POPUP_KEY = "?api_key=5d097e9689874a407b36b741622f1f6c"
const VIDEO_BASE_API = "https://api.themoviedb.org/3/tv/"
const VIDEO_KEY_API = "/videos?api_key=5d097e9689874a407b36b741622f1f6c&language=en-US"

function TvShowsPage(hide) {

  const [moviesTv, setMovies] = useState([]);

  useEffect(() => {
    getMovies(FEATURED_TVSHOW_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.results);
      });
  }

  const [state3, setState] = useState({
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
      console.log(resultVideo);

      setState(prevState => {
        return { ...prevState, videoUrl: resultVideo }
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

        {moviesTv.slice(0, 10).map(movie => (
          <ResultHome key={movie.id} movie={movie} openPopup2={openPopup2} />
        ))}

      </div>
      {/* Popup */}
      {(typeof state3.selected.name != 'undefined') ? <PopupHome selected={state3.selected} videoUrl={state3.videoUrl} closePopup2={closePopup2} /> : false}

    </div>
  )
}

export default TvShowsPage;