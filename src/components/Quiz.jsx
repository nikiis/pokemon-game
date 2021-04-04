import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import '../styles/Quiz.scss';
import { shuffleArray } from '../tools';
import RadioButton from './RadioButton';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import EndGameScreen from './EndGameScreen';
import { TOTAL_SCORE } from '../constants';

function Quiz() {
    const [score, setScore] = useState(0);
    const [attemptCount, setAttemptCount] = useState(0);

    const [toGuess, setToGuess] = useState({});
    const [allOptions, setAllOptions] = useState([]);
    const [enableButtons, setEnableButtons] = useState(false);
    const [isEndGame, setEndGame] = useState(false);

    const leftPokemonIds = useRef(shuffleArray(_.range(1, TOTAL_SCORE + 1)));
    const allPokemonIds = useRef(_.range(1, TOTAL_SCORE + 1));

    useEffect(() => {
        setEnableButtons(false);

        const noMoreLeft = leftPokemonIds.current.length === 0;
        if (noMoreLeft) {
            setEndGame(true);
            return;
        }

        // get a list of 4 pokemon names and the first ones image
        const answers = getAnswerOptions(leftPokemonIds.current, allPokemonIds.current, 3);
        setPokemonOptions(answers);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [attemptCount]);

    function getAnswerOptions(leftPokemons, allPokemons, othersLength) {
        if (leftPokemons.length === 0) return null;
        // +1 because we want to get one more pokemon in case it gets the toGuess pokemon
        if (allPokemons.length < othersLength + 1) return null;

        const toGuess = leftPokemons.shift();
        const randomFour = shuffleArray(allPokemons).slice(0, othersLength + 1);
        // filter toGuess (even if filtered, will still have 3 values left) and pick only 3 others
        const others = randomFour.filter((index) => index !== toGuess).slice(0, othersLength);
        return { toGuess, others }; // the first one is the one we choose to answer!
    }

    async function setPokemonOptions(answers) {
        const toFetch = [answers.toGuess, ...answers.others].map((item) => fetchPokemon(item));
        Promise.all(toFetch).then((pokemons) => {
            setToGuess(pokemons[0]);
            setAllOptions(shuffleArray(pokemons));

            setEnableButtons(true);
        });
    }

    const fetchPokemon = async (id) => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            handleError(response);
            return response.data;
        } catch (err) {
            console.log(err);
        }
    };

    function handleError(err) {
        if (err.status < 200 || 299 < err.status) {
            console.log(err);
        }
    }

    function handleAnswerAttempt(id) {
        const isCorrect = id === toGuess?.id;
        setScore((prevScore) => prevScore + isCorrect);
        setAttemptCount((prevCount) => ++prevCount);
    }

    return (
        <div className="container-fluid quiz-container">
            <div className="score-container">
                <p>Score: {score}</p>
                <p>
                    Pokemons: {attemptCount}/{TOTAL_SCORE}
                </p>
            </div>
            <div className="quiz-screen">
                <img
                    src={toGuess?.sprites?.front_default ?? '...'}
                    alt="pokemon"
                    className="d-block mx-auto pokemon-pic"></img>
                <h1>Which Pokémon is this?</h1>
                <Form className="d-flex justify-content-center mt-4">
                    <Form.Group as={Row} className="text-center input-container">
                        {allOptions.map((x) => (
                            <RadioButton
                                handleAnswerAttempt={handleAnswerAttempt}
                                key={x.id}
                                id={x.id}
                                answerText={x.name}
                                enabled={enableButtons}
                            />
                        ))}
                    </Form.Group>
                </Form>
            </div>
            {isEndGame ? <EndGameScreen score={score} /> : null}
        </div>
    );
}

export default Quiz;
