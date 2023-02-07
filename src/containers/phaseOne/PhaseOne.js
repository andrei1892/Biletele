import React from 'react';

import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';

import Team from '../../models/Team';

import {PHASE_ONE, PHASE_TWO} from '../../common/Constants';

import './phaseOneStyles.css'

class PhaseOne extends React.Component {
    constructor() {
        super()
        this.state = {
            nrTeams: '',
            nrOfWordsPerPlayer: '',
            teams: {},
        }
    }

    setTeamsNumber = (value) => {
        const updatedTeams = {}
        let teamsNr = value;
        if (value > 10) {
            teamsNr = 10;
        }

        for(let index = 0; index < parseInt(teamsNr); index++ ) {
            const team = new Team(index+1);
            updatedTeams[team.name] = team
        }
        this.setState({teams: updatedTeams, nrTeams: parseInt(teamsNr)})
    } 

    setPlayersNumber = (value, teamName) => this.setState(prevState => {
        const existingTeam = prevState.teams;
        existingTeam[teamName].setNrOfPlayers(parseInt(value));
        return {
            teams: {...existingTeam}
        }
    });

    setWordsNumber = (value) => {
        let finalValue = value;
        if (value > 10) {
            finalValue = 10;
        }
        this.setState({nrOfWordsPerPlayer:  parseInt(finalValue)})
    }


    saveSettings = () => {
        const {closePhase} = this.props;
        const {teams, nrOfWordsPerPlayer} = this.state;
        const nrOfplayers = Object.keys(teams).reduce((acc, team) => acc += teams[team].nrPlayers , 0);
        closePhase(PHASE_TWO, teams, nrOfWordsPerPlayer * nrOfplayers, nrOfplayers)
    }

    minimTeamsNr = (value) => value > 1

    render() {
        const {nrTeams, nrOfWordsPerPlayer, teams} = this.state;
        const {currentPhase} = this.props;

        const disableNext = !nrTeams || !nrOfWordsPerPlayer || nrTeams === 1;

        return(
            <div className='phase-container'>
               <div className='phase-one'>
                    <h4> Alegeti numarul de echipe si numarul de jucatori din fiecare echipa</h4>
                    <div className='game-settings'>
                        <div className='team-settings setting'>
                            <div className='input-container'>
                                <label>Numar Echipe</label>
                                <Input
                                    type={'number'}
                                    min={2}
                                    max={10}
                                    value={nrTeams}
                                    onEdit={this.setTeamsNumber}
                                    disabled={currentPhase !== PHASE_ONE}
                                    extraClass={'nr-input'}
                                    validator = {this.minimTeamsNr}
                                />
                            </div>
                            <div className='input-container'>
                                    <label>Numar Bilete Jucator</label>
                                    <Input
                                        type={'number'}
                                        value={nrOfWordsPerPlayer}
                                        onEdit={this.setWordsNumber}
                                        disabled={currentPhase !== PHASE_ONE}
                                        extraClass={'nr-input'}
                                    />
                                </div>
                        </div>
                        { !!Object.keys(teams).length &&  
                            <div className='set-teamplayers'>
                                <label>Jucatori in Echipa</label>
                                <div className='teamplayers-container'>
                                    {Object.keys(teams).map((teamName, index) => {
                                        return (
                                            <div className='input-container centered-inputs setting' key={index}>
                                                <label>{teams[teamName].displayName} {teams[teamName].nrPlayers === 0 ? null : `- ${teams[teamName].nrPlayers} Jucatori` }</label>
                                                <Input
                                                    type={'range'}
                                                    min={2}
                                                    max={10}
                                                    defaultValue={2}
                                                    onEdit={(value) => this.setPlayersNumber(value, teamName)}
                                                    disabled={currentPhase !== PHASE_ONE || teams === 0}
                                                    />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        }
                    </div>
                    <Button 
                        disabled={disableNext || currentPhase !== PHASE_ONE}
                        onClick={this.saveSettings}
                        text={'Faza 2'}
                        extraClass={'end-phase'}
                    />
                </div>
            </div>
        )
    }
}

export {PhaseOne};