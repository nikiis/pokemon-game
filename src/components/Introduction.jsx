import React from 'react';
import '../styles/introduction.scss';
// import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Introduction(props) {
    return (
        <div className="d-flex flex-column align-items-center intropage">
            <h1>The Pokémon Quiz</h1>
            <p>Do you have what it takes to be a Pokémon master?</p>
            <Link to="/quiz" className="mt-4">Start</Link>
        </div>
    );
}

export default Introduction;
