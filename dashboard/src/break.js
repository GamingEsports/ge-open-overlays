const breakRep = nodecg.Replicant('break', {defaultValue: {
    infoText: "",
    nextMatchTeamA: "",
    nextMatchTeamB: "",
    nextMatchPlayStyle: "",
    nextMatchName: "",
    nextMatchGame: ""
}});
const unsavedBreakRep = nodecg.Replicant('break-unsaved', {defaultValue: {
    infoText: "",
    nextMatchTeamA: "",
    nextMatchTeamB: "",
    nextMatchPlayStyle: "",
    nextMatchName: "",
    nextMatchGame: ""
}});

const infoText = document.querySelector("#info-text");
const notSaved = document.querySelector("#notsaved");
const nextTeamA = document.querySelector("#next-team-a");
const nextTeamB = document.querySelector("#next-team-b");
const nextPlayStyle = document.querySelector("#next-play-style");
const nextMatchName = document.querySelector("#next-match-name");
const nextMatchGame = document.querySelector("#game-select");

NodeCG.waitForReplicants(breakRep, unsavedBreakRep).then(() => {  
    unsavedBreakRep.on('change', (newVal) => {
        infoText.value = newVal.infoText;
        nextTeamA.value = newVal.nextMatchTeamA;
        nextTeamB.value = newVal.nextMatchTeamB;
        nextPlayStyle.value = newVal.nextMatchPlayStyle;
        nextMatchName.value = newVal.nextMatchName;
        nextMatchGame.value = newVal.nextMatchGame;

        if (!replicantsEqual(newVal, breakRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    breakRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function infoTextChanged() {
    unsavedBreakRep.value.infoText = infoText.value;
}

function updateButtonClicked() {
    breakRep.value = JSON.parse(JSON.stringify(unsavedBreakRep.value));
}

function revertButtonClicked() {
    unsavedBreakRep.value = JSON.parse(JSON.stringify(breakRep.value));
}

function nextTeamAChanged() {
    unsavedBreakRep.value.nextMatchTeamA = nextTeamA.value;
}

function nextTeamBChanged() {
    unsavedBreakRep.value.nextMatchTeamB = nextTeamB.value;
}

function nextPlayStyleChanged() {
    unsavedBreakRep.value.nextMatchPlayStyle = nextPlayStyle.value;
}

function nextMatchNameChanged() {
    unsavedBreakRep.value.nextMatchName = nextMatchName.value;
}

function nextMatchGameChanged() {
    unsavedBreakRep.value.nextMatchGame = nextMatchGame.value;
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}