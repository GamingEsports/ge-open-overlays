const breakRep = nodecg.Replicant('break', {defaultValue: {
    infoText: ""
}});
const unsavedBreakRep = nodecg.Replicant('break-unsaved', {defaultValue: {
    infoText: ""
}});

const infoText = document.querySelector("#info-text");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(breakRep, unsavedBreakRep).then(() => {  
    unsavedBreakRep.on('change', (newVal) => {
        infoText.value = newVal.infoText;

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

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}