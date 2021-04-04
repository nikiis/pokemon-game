import React from 'react';
import { Link } from 'react-router-dom';
import { TOTAL_SCORE, scoreTable } from '../constants';

function EndGameScreen(props) {
    const message = scoreTable.find((item) => item.min <= props.score && props.score <= item.max).msg;

    return (
        <div className="endgame-screen-container">
            <h1>
                Your score was: {props.score}/{TOTAL_SCORE}
            </h1>
            <p className="mt-4">{message}</p>
            <Link to="/quiz" onClick={() => window.location.reload()} className="mt-4">
                Play Again
            </Link>
            <Link to="/" className="mt-4">
                Back to home
            </Link>
        </div>
    );
}

export default EndGameScreen;
