import React from 'react'
import YoutubeEmbed from "./YoutubeEmbed";

const IMG_API = "https://image.tmdb.org/t/p/w1280";


function PopupHome({ selected, videoUrl, closePopup2 }) {
    let movieDate = '';
    let movieName = '';

    selected.release_date ? movieDate = selected.release_date : movieDate = selected.first_air_date;
    selected.release_date ? movieName = selected.title : movieName = selected.name;


    console.log('video ' + videoUrl);
    return (
        <section className="popup">
            <div className="content">
                <h2>{movieName} <span>({movieDate})</span></h2>
                <p className="rating">Rating: {selected.vote_average}</p>
                <div className="plot">
                    {(videoUrl !== '')
                        ? <YoutubeEmbed embedId={videoUrl} />
                        : <img src={
                            selected.backdrop_path
                                ? IMG_API + selected.backdrop_path
                                : "https://via.placeholder.com/1920x1080/eee?text= Image missing :("
                        } alt={movieName} />}

                    <p>{selected.overview}</p>
                </div>
                {/* <p>{videoUrl}</p> */}
                <button className="close" onClick={closePopup2}>Close</button>
            </div>
        </section>
    )
}

export default PopupHome
