import React from 'react'

import Result from './Result'

function Results({ results, openPopup }) {
    return (
        <section className="movie-container search-results">
            {results.slice(0, 10).map(result => (
                <Result key={result.id} result={result} openPopup={openPopup} />
            ))}
        </section>
    )
}

export default Results
