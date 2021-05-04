import React from 'react'
import { Link } from 'react-router-dom';

function Header() {

    return (
        <section>
            <header>
                <Link to="/top10/">TV Shows</Link>
                <Link to="/top10/movies/">Movies</Link>
            </header>
        </section>
    )
}

export default Header
