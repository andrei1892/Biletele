import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '../../components/Button/Button';
import {Icon} from '../../components/Icons/Icon';
import {PlayerWordsList} from './PlayerWordsList';

import {PHASE_THREE} from '../../common/Constants';


import './phaseTwoStyles.css';


class PhaseTwo extends React.Component {
    constructor() {
        super();
        this.state = {
            flip: '',
            currentTeamIndex: 0,
            currentPlayerIndex: 0,
            currentPlayerWords: [],
            editPlayer: '',
            playersList: [],
            totalWords: [],
            teams: {},
        }
    }

    componentDidMount() {
        this.setState({teams: this.props.teams})
    }

    onClick = () => {
        const {closePhase} = this.props;
        const {teams, totalWords} = this.state;
        closePhase(PHASE_THREE, teams, totalWords)
    }

    selectTeam = (value, total, direction) => {
        // total is the length of the teams so it will be +1 by default
        this.setState(prevState => {
            const previousIndex = prevState.currentTeamIndex;
            const newIndex = previousIndex + parseInt(value);
            const newTeamIndex = newIndex < 0 ? 0 : (
                newIndex >= total ? total -1 : newIndex
            )
            return {
                currentTeamIndex: newTeamIndex,
                flip: direction
            }
        })
    }

    savePlayer = (team, player, words) => {
        // to do: currently we're passing the teams classes by props and the modifications are affecting all levels; to be fixed;
        const {teams, totalWords, playersList} = this.state;
        const updatedWords = totalWords.concat([]);
        const updatedPlayers = playersList.concat([player]);
        const currentTeam = teams[team];
        const emptyspace = currentTeam.teamPlayers.indexOf(null);
        currentTeam.teamPlayers.splice(emptyspace, 1, player);
        this.setState({
            teams: {...teams, [team]: currentTeam},
            totalWords: [...updatedWords, ...words],
            playersList: updatedPlayers,
        })
    }

    render() {
        const {players, words} = this.props;
        const { currentTeamIndex, flip, playersList, teams, totalWords} = this.state;

        if(!Object.values(teams).length) {
            return null;
        }

        const currentTeam = Object.values(teams)[currentTeamIndex];
        const currentTeamPlayers = currentTeam.teamPlayers.filter(player => !!player);
        const allTeamsReady = totalWords.length === words && Object.values(teams).every(team => team.teamPlayers.every(player => !!player));
        const teamNamePosition = currentTeam.allPlayersValid ? 'central-header' : 'corner-header';
        const teamsClass=  !!flip ? 'teams-settings teams-appearance' : 'teams-settings';

        return (
            <div className='phase-container'>
                <h3 className='phase-title'>Creati Echipele</h3>
                <div className='set-teams'>
                    {currentTeamIndex !== 0 && <Icon type={'CaretLeftFill'} extraClass={'previous-team'} onClick={() => this.selectTeam(-1, Object.values(teams).length, 'left')}/>}
                    <div className={`flipper ${flip}`} key={currentTeam.name}>
                        <div className={teamsClass} key={currentTeam.name}>
                            <div className='team-header'>
                                <div className={teamNamePosition}>{currentTeam.displayName}</div>
                                    { currentTeam.allPlayersValid &&
                                    <ul className='players-list'>
                                        {  currentTeamPlayers.map((player, index) => <li key={index} className='team-player'>{player}</li>)}
                                    </ul>
                                }
                            </div>
                            {!currentTeam.allPlayersValid && (
                                <PlayerWordsList
                                    totalWords = {words / players}
                                    currentTeam = {currentTeam.name}
                                    allPlayersAdded = {currentTeam.allPlayersValid}
                                    savePlayer={this.savePlayer}
                                    existingPlayers = {playersList}
                                />
                            )}
                        </div>
                    </div>
                    {currentTeamIndex !== Object.values(teams).length-1 && <Icon type={'CaretRightFill'} extraClass={'next-team'} onClick={() => this.selectTeam(1, Object.values(teams).length, 'right')} />}
                </div>
                {allTeamsReady && <Button onClick={this.onClick} text={'Incepe jocul'} extraClass={'end-phase-btn'} />}
            </div>
        )
    }
}

PhaseTwo.propTypes = {
    players: PropTypes.number,
    words: PropTypes.number
};

export {PhaseTwo}