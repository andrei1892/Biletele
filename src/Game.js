import React, { useState } from 'react';
import {GamePlay} from './GamePlay';
import {HomePage} from './HomePage';

const Game = () => {

    const [inGame, startGame] = useState(false);

    return (
        <>
          {!inGame && <HomePage onClick={startGame} />}
          {inGame && <GamePlay closeGame={startGame}/>}
        </>
    )
}

export {Game}