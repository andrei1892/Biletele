import React from 'react';

import { PhaseOne } from './containers/phaseOne/PhaseOne';
import { PhaseTwo } from './containers/phaseTwo/PhaseTwo';
import {PhaseThree} from './containers/phaseThree/PhaseThree';

import {PHASE_ONE, PHASE_TWO, PHASE_THREE} from './common/Constants';

import './GamePlay.css';

class GamePlay extends React.Component {
  constructor() {
    super()
    this.state={
      // nrTeams: 0,
      nrOfPlayers: 0,
      // nrPlayerPerTeam: 0,
      nrOfWords: 0,
      teammates: {},
      totalWords: [],
      teams: {},
      closePhaseOne: false,
      closePhasetwo: false,
      currentPhase: PHASE_ONE,
    }
  }

  closePhaseOne = (teams, words, nrOfPlayers) => this.setState({closePhaseOne: true, teams: teams, words: words, nrOfPlayers: nrOfPlayers});
  closePhaseTwo = (teams, words, nrOfPlayers) => this.setState({closePhasetwo: true, teams: teams, words: words, nrOfPlayers: nrOfPlayers});

  closePhase = (phase, teams = {}, words, nrOfPlayers) => {
  
    if (typeof words === 'number') {
      this.setState({
        currentPhase: phase,
        teams: teams,
        nrOfWords: words,
        nrOfPlayers: nrOfPlayers
      })
    }  else if (Array.isArray(words)) {
      this.setState({
        currentPhase: phase,
        teams: teams,
        totalWords: words,
      })
    }

  }

  //  setPhase = () => this.setState({currentPhase: PHASE_ONE})
  //  setPhase2 = () => this.setState({currentPhase: PHASE_TWO})



  render() {
    const {currentPhase, closePhaseOne, nrOfPlayers, nrOfWords, totalWords, teams} = this.state;
    const {closeGame} = this.props;

    return (
      <div className="game-play">
       {currentPhase === PHASE_ONE &&
       <PhaseOne
          closePhase={this.closePhase}
          currentPhase={currentPhase}
          />
       }
      {
      currentPhase === PHASE_TWO &&
        <PhaseTwo 
          phaseFinished={closePhaseOne}
          teams={teams}
          words={nrOfWords}
          players={nrOfPlayers}
          closePhase={this.closePhase}
        />
      }
      {
        currentPhase === PHASE_THREE && 
        <PhaseThree
          teams={teams}
          words={totalWords}
          closeGame={closeGame}
        />
      }
    </div>
  );
  }
}

export  {GamePlay};
