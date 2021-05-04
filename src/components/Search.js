import React from 'react'

function Search({ handleInput, search }) {

    return (
        <section className="searchbox-wrap ">
            <input type="text"
                placeholder="Search for a movie..."
                className="movie-search"
                onChange={search}
                onKeyUp={handleInput}
            />
        </section>
    )
}

export default Search
