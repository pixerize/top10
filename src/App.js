import React, { useState } from "react";

import MoviesPage from "./components/MoviesPage";
import TvShowsPage from "./components/TvShowsPage";
import { Route } from 'react-router-dom';
import axios from 'axios';

import Search from "./components/Search";
import Results from './components/Results'
import Popup from './components/Popup'

// const FEATURED_TVSHOW_API = "https://api.themoviedb.org/3/discover/tv?sort_by=vote_average.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
// const FEATURED_MOVIE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=vote_average.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
// const FEATURED_MOVIE_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5d097e9689874a407b36b741622f1f6c&page=1";
// const SEARCH_TVSHOW_API = "https://api.themoviedb.org/3/search/tv?&api_key=5d097e9689874a407b36b741622f1f6c&query="
const SEARCH_MOVIE_API = "https://api.themoviedb.org/3/search/movie?&api_key=5d097e9689874a407b36b741622f1f6c&query="
const SEARCH_POPUP_BASE = "https://api.themoviedb.org/3/movie/"
const SEARCH_POPUP_KEY = "?api_key=5d097e9689874a407b36b741622f1f6c"
const VIDEO_BASE_API = "https://api.themoviedb.org/3/movie/"
const VIDEO_KEY_API = "/videos?api_key=5d097e9689874a407b36b741622f1f6c&language=en-US"

function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    videoUrl: {},
    selected: {}
  });

  var timer;
  const search = (e) => {

    axios(SEARCH_MOVIE_API + state.s).then(({ data }) => {
      let results = data.results
      console.log(results);
      console.log(state.s);
      clearTimeout(timer);
      timer = setTimeout(function () {
        setState(prevState => {
          return { ...prevState, results: results }
        });
      }, 1000);

    });
  }

  const handleInput = (e) => {

    let s = e.target.value;

    if (s.length >= 3) {
      setState(prevState => {
        return { ...prevState, s: s }
      });
    } else {
      setState(prevState => {
        return { ...prevState, results: [], s: "" }
      });
    }

  }

  const openPopup = id => (
    axios(VIDEO_BASE_API + id + VIDEO_KEY_API).then(({ data }) => {
      var resultVideo = '';
      if (data.results.length) {
        resultVideo = data.results[0].key;
      }

      setState(prevState => {
        return { ...prevState, videoUrl: resultVideo }
      })
    }),

    axios(SEARCH_POPUP_BASE + id + SEARCH_POPUP_KEY).then(({ data }) => {
      let result = data;

      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  )

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: [] }
    });
  }



  return (
    <div className="movie-main-container">

      <h1><a href="https://djordje.rs.ba/top10/">Rubicon Frontend Challenge</a></h1>

      <main>

        {/* Search */}
        <Search handleInput={handleInput} search={search} />

        {/* Popup */}
        {(typeof state.selected.title != 'undefined') ? <Popup selected={state.selected} videoUrl={state.videoUrl} closePopup={closePopup} /> : false}

        {/* Search Results */}
        <Results results={state.results} openPopup={openPopup} />

        <Route exact path="/top10/" component={TvShowsPage} />
        <Route exact path="/top10/movies" component={MoviesPage} />
      </main>
    </div>
  );
}

export default App;
