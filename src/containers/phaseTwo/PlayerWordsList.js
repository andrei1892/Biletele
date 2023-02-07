import React, {useState} from 'react';
import PropTypes from 'prop-types';
// import ReactTooltip from 'react-tooltip';

import {Input} from '../../components/Input/Input';
import {Description} from '../../components/Description/Description';
import {Button} from '../../components/Button/Button';

import {Icon} from '../../components/Icons/Icon';

import './PlayerWordsList.css';

const WORD = 'word';
const DESCRIPTION = 'description'
const WORD_GAME = {
    word: '',
    description: ''
}

const PlayerWordsList = (props) => {
    const {allPlayersAdded, currentTeam, existingPlayers, savePlayer, totalWords} = props;

    const [newPlayer, setPLayerName] = useState('');
    const [gameWord, setWord] = useState(WORD_GAME)
    const [playerWords, addWord] = useState([]);

    const nameValidator = (value) => {
        if (value.length < 3) {
            return false;
        }

        return !existingPlayers.includes(value);
    }

    const onAddWord = (value, type) => {
        const newWord = Object.assign({}, gameWord);
        newWord[type] = value;
        setWord(newWord);
    }

    const confirmWord = () => {
        let list = playerWords.concat([]);
        list.push(gameWord);
        addWord(list);
        setWord(WORD_GAME);
    }

    const deleteWord = (word) => {
        const allWords = playerWords.concat([]);
        const filteredWords = allWords.filter(playerWord => playerWord.word!== word);
        addWord(filteredWords);
    }


    const saveWords = () => {
        savePlayer(currentTeam, newPlayer, playerWords);
        addWord([]);
        setPLayerName('')
    }

    return (
        <div className='player-setup'>
                <div className='set-player-name'>
                    <h5>Adaugati {totalWords} cuvinte </h5>
                    <div className='inputWithLabel'>
                        <label>Jucator</label>
                        <Input
                            type={'text'}
                            placeholder={"Nume"}
                            value={newPlayer}
                            onEdit={(value) => setPLayerName(value)}
                            extraClass={'player-name'}
                            disabled={allPlayersAdded}
                            validator={nameValidator}
                            error={newPlayer.length < 3 ? 'Numele trebuie sa aiba minim 3 caractere' : 'Acest nume este deja folosit'}
                        />
                    </div>
                </div>
                <div className='set-player-words'>
                    <div className='set-word'>
                        <div className='inputWithLabel'>
                            <div>Cuvant</div>
                            <Input
                                type={'text'}
                                value={gameWord[WORD]}
                                onEdit={(value) => onAddWord(value, WORD)}
                                disabled = {totalWords === playerWords.length}
                                extraClass={'new-word'}
                            />
                        </div>
                        <div className='inputWithLabel'>
                            <div className='word-description'>
                                <span>Descriere</span>
                                {/*
                                <Icon
                                    type={'InfoCircle'}
                                    extraClass={'description-icon'}
                                    data-tip='description'
                                    data-for='description'
                                />
                                <ReactTooltip
                                    id={'description'}
                                    place="top" 
                                    type="dark"
                                    effect='solid'
                                >
                                    <>
                                        <p>Lasati 2-3 sugestii pentru jucator</p>
                                        <p>Exemplu: Cuvant - Ceausescu </p> 
                                        <p>Descriere: dictator roman comunist</p>
                                    </>
                                </ReactTooltip> 
                            */}
                            </div>
                            <Description
                                onEdit={(value) => onAddWord(value, DESCRIPTION)}
                                value={gameWord[DESCRIPTION]}
                                disabled = {totalWords === playerWords.length}
                                placeholder={'Descrieti in doua-trei cuvinte'}
                                extraClass={'description-area'}
                            />
                        </div>
                        {totalWords !== playerWords.length && (
                        <Button 
                            text={'Salveaza'}
                            onClick={confirmWord}
                            disabled={!gameWord[WORD]}
                        />
                        )}
                    </div>
                    {!!playerWords.length && <ul className='words-list'>
                        <li>Cuvinte Introduse</li>
                            {playerWords.map((gameWord, key) => {
                                return (
                                    <li className='list-element' key={key}>
                                        <span>{gameWord.word}</span>
                                        <Icon type={'Trash'} extraClass={'delete-word'}  onClick={() => deleteWord(gameWord.word)} color={'red'} />
                                    </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
                {totalWords === playerWords.length && <Button onClick={saveWords} text={'Salveaza Jucator'} disabled={!newPlayer || !nameValidator(newPlayer)} />}
        </div>
    )
}

PlayerWordsList.propTypes = {
    allPlayersAdded: PropTypes.bool,
    currentTeam: PropTypes.string,
    onConfirm: PropTypes.func,
    savePlayer: PropTypes.func,
    totalWords: PropTypes.number,
};

export {PlayerWordsList}