const defaultRep = {
    playerAname: '',
    playerBname: '',
    playerAScore: 0,
    playerBScore: 0,
    matchStyle: '',
    matchName: '',
    game: ''
}
const currentMatchRep = nodecg.Replicant('current-match', {defaultValue: defaultRep});
const unsavedCurrentMatchRep = nodecg.Replicant('current-match-unsaved', {defaultValue: defaultRep});

const teamAName = document.querySelector("#player-a-name");
const teamBName = document.querySelector("#player-b-name");
const teamAScore = document.querySelector("#player-a-score");
const teamBScore = document.querySelector("#player-b-score");
const matchStyle = document.querySelector("#match-style");
const matchName = document.querySelector("#match-name");
const gameSelect = document.querySelector("#game-select");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(currentMatchRep, unsavedCurrentMatchRep).then(() => {
    unsavedCurrentMatchRep.on('change', (newVal) => {
        if (!replicantsEqual(newVal, currentMatchRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    currentMatchRep.on('change', (newVal, oldVal) => {
        if (!oldVal) {
            teamAName.value = newVal.playerAName;
            teamBName.value = newVal.playerBName;
            teamAScore.value = newVal.playerAScore;
            teamBScore.value = newVal.playerBScore;
            matchStyle.value = newVal.matchStyle;
            matchName.value = newVal.matchName;
            gameSelect.value = newVal.game;
            return;
        } 

        notSaved.style.display = "none";
    });
});

function playerANameChanged() {
    unsavedCurrentMatchRep.value.playerAName = teamAName.value;
}

function playerBNameChanged() {
    unsavedCurrentMatchRep.value.playerBName = teamBName.value;
}

function playerAScoreChanged() {
    unsavedCurrentMatchRep.value.playerAScore = parseInt(teamAScore.value);
}

function playerBScoreChanged() {
    unsavedCurrentMatchRep.value.playerBScore = parseInt(teamBScore.value);
}

function matchStyleChanged() {
    unsavedCurrentMatchRep.value.matchStyle = matchStyle.value;
}

function matchNameChanged() {
    unsavedCurrentMatchRep.value.matchName = matchName.value;
}

function updateButtonClicked() {
    currentMatchRep.value = JSON.parse(JSON.stringify(unsavedCurrentMatchRep.value));
}

function revertButtonClicked() {
    unsavedCurrentMatchRep.value = JSON.parse(JSON.stringify(currentMatchRep.value));
}

function gameChanged() {
    unsavedCurrentMatchRep.value.game = gameSelect.value;
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}