import React from 'react'

const IMG_API = "https://image.tmdb.org/t/p/w1280";

const setVoteClass = (vote) => {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 6) {
        return 'orange';
    } else {
        return 'red';
    }
}


function ResultHome({ movie, openPopup2 }) {

    return (
        <div className="movie" onClick={() => openPopup2(movie.id)}>
            <img src={
                movie.backdrop_path
                    ? IMG_API + movie.backdrop_path
                    : "https://via.placeholder.com/1920x1080/eee?text=Image missing :("
            } alt={movie.title} />
            <div className="movie-info">
                {movie.title ? <h3>{movie.title}</h3>
                    : <h3>{movie.name}</h3>}
                <span className={`tag ${setVoteClass(movie.vote_average)}`}>{movie.vote_average}</span>
            </div>

            <div className="movie-over">
                <h2>Overview:</h2>
                <p>{movie.overview}</p>
            </div>
        </div>
    )
}

export default ResultHome
