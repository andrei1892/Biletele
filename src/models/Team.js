// const TeamRecord = {
//     name: '',
//     displayName: '',
//     nrPlayers: 0,
//     teamPlayers: [],
//     current: 0,
// }


export default class Team {
    constructor(name, nrPlayers = 2, players = []) { // default name will be team 1, team 2 etc.; a team must have at least 2 players
        this.name = `team${name}`;
        this.displayName = `Echipa ${name}`;
        this.nrPlayers = nrPlayers;
        this.teamPlayers = new Array(nrPlayers).fill(null);
        this.current = 0; // default first
    }

    setName = (displayName) => {
        this.displayName = displayName;
    }

    setNrOfPlayers = (nr) => {
        this.nrPlayers = nr;
        this.teamPlayers = new Array(nr).fill(null);
    }

    setPlayerName = (name, index) => {
        this.teamPlayers[index] = name;
    }

    setCurrent = () => {
        if ( this.current + 1 < this.teamPlayers.length) {
            this.current = this.current + 1;
        } else {
            this.current = 0;
        }
    }

    get allPlayersValid() {
        return this.teamPlayers.every(player => !!player);
    }
}

// export default {Team};