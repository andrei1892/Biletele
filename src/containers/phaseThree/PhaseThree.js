import React from 'react';

import {Timer} from './Timer';
import {Button} from '../../components/Button/Button';
import {Icon} from '../../components/Icons/Icon';
// import {Tooltip} from '../../components/Tooltip/Tooltip';
import ReactTooltip from 'react-tooltip';

import {WordDescription} from './WordDescription';

import './phaseThree.css';

const Randomize = (max) => {
    return Math.floor(Math.random() * max);
}

const PointModel = {
    '1': {}, // [teamName]: value
    '2': {},
    '3': {},
    '4': {} // 4th stage is actual total points;
}

class PhaseThree extends React.Component {
    constructor() {
        super();
        this.state = {
            wordsLeft: [],
            allteamsName: [],
            currentTeamIndex: 0,
            currentWordIndex: 0,
            stage: 1,
            teams: {},
            points: {},
            inPlay: false,
        }
    }

    // componentDidUpdate(prevState) {
    //     const {wordsLeft} = this.state;
    //     if(prevState.wordsLeft.length !== wordsLeft.length)
    //     this.setState({ currentWordInde: Randomize(wordsLeft.length)});
    // }

    componentDidMount() {
        const {words, teams} = this.props;
        let teamPoints = {};
        let allteams = [];
        const points = Object.assign({}, PointModel);
        Object.keys(teams).forEach((team) => {
            allteams.push(team);
            teamPoints[team] = 0;
            Object.keys(points).forEach(stage => {
                points[stage][team] = 0;
            });
            // points['total'][team] = 0;
        });
        let firstIndex = Randomize(words.length);
        this.setState({
            wordsLeft: words,
            currentWordIndex: firstIndex,
            teams: teams,
            points: points,
            allteamsName : allteams
        });
    }


    onCorrectClick = (currentWordIndex, currentTeam) => {
        const {words} = this.props;
        const {allteamsName, currentTeamIndex, wordsLeft, stage, points} = this.state;

        // calculate point;

        let newPoints = Object.assign({}, points);

        newPoints[stage][currentTeam.name]++;
        newPoints['4'][currentTeam.name]++;

        if (wordsLeft.length === 1) {
            // if there is only 1 ward left and it was guessed , stage is changed;
            const newWordIndex = Randomize(words.length);
            const nextStage = stage +1;
            const nextTeam = currentTeamIndex + 1 < allteamsName.length ? currentTeamIndex + 1 : 0; 
            this.setState({
                wordsLeft: words,
                currentWordIndex: newWordIndex,
                stage: nextStage,
                inPlay: false,
                currentTeamIndex: nextTeam,
                points: newPoints,
            })
        } else {
            const newWords = wordsLeft.concat([]);
            newWords.splice(currentWordIndex, 1);
            const newWordIndex = Randomize(newWords.length);
            this.setState({
                wordsLeft: [...newWords],
                currentWordIndex: newWordIndex,
                points: newPoints,
            })
        }
    }

    onPassClick = (currentTeam) => {
        const {currentTeamIndex, allteamsName, teams} = this.state;
        const newIndex = currentTeamIndex + 1 < allteamsName.length ? currentTeamIndex + 1 : 0; 
        const updateTeam = teams[currentTeam];
        updateTeam.setCurrent();
        this.setState({
            teams: {...teams, [currentTeam]: updateTeam},
            currentTeamIndex: newIndex,
            inPlay: false,
        });
    }

    toggleRoundPlay = (value) => this.setState({inPlay: value})

    toggleDescription = (value) => this.setState({toggleDescription: value})

    getWinner = () => {
        // stage 4 represents the final results agregated;
        const {points} = this.state;
        return Object.values(points['4']).reduce((acc, team) => {
            if (team > acc) {
                acc = team   
            }
            return acc;
        }, 0)
    }

    render() {
        const {allteamsName, inPlay, stage, wordsLeft, points, teams} = this.state;
        const {closeGame} = this.props;

        if (!allteamsName.length) {
            return null;
        }

        const currentTeam = this.getCurrentTeam;
        const currentPlayer = currentTeam.teamPlayers[currentTeam.current];
        const randomIndex = Randomize(wordsLeft.length);

        const inactiveClass = !inPlay ? 'phase-three phase-three-inactive' : 'phase-three';

        const getStagePoints = points[stage] || {};

        return (
            <div className='phase-container'> 
                <div className={inactiveClass}>
                    {!inPlay && (
                        <div className='inactive-play'>
                            {stage === 1 && <h4 className='round-rule'> Runda 1 - Descrie biletul in maxim 3 cuvinte </h4>}
                            {stage === 2 && <h4 className='round-rule'> Runda 2 - Descrie biletul intr-un cuvant </h4>}
                            {stage === 3 && <h4 className='round-rule'> Runda 3 - Mimeaza cuvantul </h4>}
                            { stage < 4 ? (
                            <>
                                <div>
                                    <p>Urmeaza {currentPlayer} ( {currentTeam.displayName} )</p>
                                    <p>Cuvinte ramase: {wordsLeft.length}</p>
                                        <div className='round-score'>
                                            <span>Scor</span>
                                            <Icon
                                                type={'InfoCircle'}
                                                extraClass={'description-icon'}
                                                data-tip='foo'
                                                data-for='foo'
                                                />
                                            <ReactTooltip
                                                id={'foo'}
                                                place="top" 
                                                type="dark"
                                                effect='solid'
                                            >
                                                <div className='round-score-table'>
                                                    {Object.keys(getStagePoints).map((team, key) => (
                                                        <div className='team-score' key={key}>
                                                            <span>{teams[team].displayName} :</span>
                                                            <span>{getStagePoints[team]}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </ReactTooltip>
                                        </div>
                                </div>
                                <Button
                                    disabled={inPlay}
                                    onClick={() => this.toggleRoundPlay(true)}
                                    text={'Incepe Runda'}
                                />
                            </>
                            ) : (
                                <>
                                    <div className='final-score-table'>
                                        <h4>Scor Final</h4>
                                        {Object.keys(getStagePoints).map((team, key) => {
                                             const winnerClass = this.getWinner() === getStagePoints[team] ? 'team-score winner' : 'team-score'
                                                return (
                                                    <div className={winnerClass} key={key}>
                                                        <span>{teams[team].displayName} :</span>
                                                        <span>{getStagePoints[team]}</span>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    <Button
                                        extraClass={'menu-btn'}
                                        onClick={() => closeGame(false)}
                                        text={'Acasa'}
                                    />       
                                </>
                            )}
                        </div>
                        )
                    }
                    { 
                    inPlay && (
                        <div className='active-play'>
                            <div className='current-player'>
                                {currentPlayer}
                            </div>
                            <div className='word-info'>
                                <div className='current-description'>
                                    <WordDescription text={wordsLeft[randomIndex].description} />
                                </div> 
                                <div className='current-word'>
                                    <p>{wordsLeft[randomIndex]?.word}</p>
                                </div>
                                <div className='button-group'>
                                    <Button
                                        onClick={() => this.onCorrectClick(randomIndex, currentTeam)}
                                        text={'Corect'}
                                        extraClass={'button correct'}
                                    />
                                    <Button
                                        onClick={() => this.onPassClick(currentTeam.name)}
                                        text={'Pas'}
                                        extraClass={'button pas'}
                                    />
                                </div>
                            </div>
                            <hr/>
                                <Timer
                                    inPlay={inPlay}
                                    onEnd={() => this.onPassClick(currentTeam.name)}
                                />
                        </div>
                    )
                    } 
                {/* </div> */}
                </div>
            </div>
        );
    }

    get getCurrentTeam() {
        const {currentTeamIndex = 0, allteamsName = [], teams = {}} = this.state;
        return teams[allteamsName[currentTeamIndex]];
    }
}

export {PhaseThree}