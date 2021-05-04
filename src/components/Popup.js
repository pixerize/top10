import React from 'react'
import YoutubeEmbed from "./YoutubeEmbed";

const IMG_API = "https://image.tmdb.org/t/p/w1280";


function Popup({ selected, videoUrl, closePopup }) {
    console.log('video ' + videoUrl);
    return (
        <section className="popup">

            <div className="content">
                <h2>{selected.title} <span>({selected.release_date})</span></h2>
                <p className="rating">Rating: {selected.vote_average}</p>
                <div className="plot">
                    {(videoUrl !== '')
                        ? <YoutubeEmbed embedId={videoUrl} />
                        : <img src={
                            selected.backdrop_path
                                ? IMG_API + selected.backdrop_path
                                : "https://via.placeholder.com/1920x1080/eee?text= Image missing :("
                        } alt={selected.title} />}

                    <p>{selected.overview}</p>
                </div>
                {/* <p>{videoUrl}</p> */}
                <button className="close" onClick={closePopup}>Close</button>
            </div>
        </section>
    )
}

export default Popup
