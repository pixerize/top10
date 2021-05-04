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

function Result({ result, openPopup }) {

    return (
        <div className="movie" onClick={() => openPopup(result.id)}>
            <img src={
                result.backdrop_path
                    ? IMG_API + result.backdrop_path
                    : "https://via.placeholder.com/1920x1080/eee?text=Image missing :("
            } alt={result.title} />
            <div className="movie-info">
                {result.title ? <h3>{result.title}</h3>
                    : <h3>{result.name}</h3>}
                <span className={`tag ${setVoteClass(result.vote_average)}`}>{result.vote_average}</span>
            </div>

            <div className="movie-over">
                <h2>Overview:</h2>
                <p>{result.overview}</p>
            </div>
        </div>
    )
}

export default Result
