const castersRep = nodecg.Replicant('casters', {defaultValue: {
    casterA: {
        name: "",
        subtext: ""
    },
    casterB: {
        name: "",
        subtext: ""
    }
}});
const unsavedCastersRep = nodecg.Replicant('casters-unsaved', {defaultValue: {
    casterA: {
        name: "",
        subtext: ""
    },
    casterB: {
        name: "",
        subtext: ""
    }
}});
const showCastersRep = nodecg.Replicant('show-casters', {defaultValue: true});

const casterA = document.querySelector("#caster-a");
const casterB = document.querySelector("#caster-b");
const casterAsub = document.querySelector("#caster-a-sub");
const casterBsub = document.querySelector("#caster-b-sub");
const showCasters = document.querySelector("#show-casters");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(castersRep, unsavedCastersRep, showCastersRep).then(() => {
    unsavedCastersRep.on('change', (newVal) => {
        if (!replicantsEqual(newVal, castersRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    castersRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });

    showCastersRep.on('change', (newVal) => {
        if (newVal) {
            showCasters.innerHTML = 'Show casters: ON<br><i style="font-size: .8em; font-weight: 400;">Updates instantly</i>'
            showCasters.classList.add("selected");
        } else {
            showCasters.innerHTML = 'Show casters: OFF<br><i style="font-size: .8em; font-weight: 400;">Updates instantly</i>'
            showCasters.classList.remove("selected");
        }
    });
});

function casterNameChanged(num) {
    if (num === 1) {
        unsavedCastersRep.value.casterA.name = casterA.value;
    } else if (num === 2) {
        unsavedCastersRep.value.casterB.name = casterB.value;
    }
}

function casterSubtextChanged(num) {
    if (num === 1) {
        unsavedCastersRep.value.casterA.subtext = casterA.value;
    } else if (num === 2) {
        unsavedCastersRep.value.casterB.subtext = casterB.value;
    }
}

function updateButtonClicked() {
    castersRep.value = JSON.parse(JSON.stringify(unsavedCastersRep.value));
}

function revertButtonClicked() {
    unsavedCastersRep.value = JSON.parse(JSON.stringify(castersRep.value));
}

function showCastersClicked() {
    showCastersRep.value = !showCastersRep.value;git 
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}