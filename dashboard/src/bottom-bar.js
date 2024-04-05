const bottomBarRep = nodecg.Replicant('bottomBar', {defaultValue: {
    show: "match",
    breakText: ""
}});
const unsavedBottomBarRep = nodecg.Replicant('bottomBar-unsaved', {defaultValue: {
    show: "match",
    breakText: ""
}});

const showCurrent = document.querySelector("#show-current");
const showBreak = document.querySelector("#show-break");
const breakText = document.querySelector("#break-text");
const notSaved = document.querySelector("#notsaved");

NodeCG.waitForReplicants(bottomBarRep, unsavedBottomBarRep).then(() => {
    unsavedBottomBarRep.on('change', (newVal) => {
        if (newVal.show === "match") {
            showCurrent.classList.add("selected");
            showBreak.classList.remove("selected");
        } else if (newVal.show === "misc") {
            showCurrent.classList.remove("selected");
            showBreak.classList.add("selected");
        }

        breakText.value = newVal.breakText;

        if (!replicantsEqual(newVal, bottomBarRep.value)) {
            notSaved.style.display = "block";
        } else {
            notSaved.style.display = "none";
        }
    });

    bottomBarRep.on('change', (newVal, oldVal) => {
        if (oldVal === undefined) return;
        notSaved.style.display = "none";
    });
});

function showCurrentClicked() {
    unsavedBottomBarRep.value.show = "match";
}

function showBreakClicked() {
    unsavedBottomBarRep.value.show = "misc";
}

function breakTextChanged() {
    unsavedBottomBarRep.value.breakText = breakText.value;
}

function updateButtonClicked() {
    bottomBarRep.value = JSON.parse(JSON.stringify(unsavedBottomBarRep.value));
}

function revertButtonClicked() {
    unsavedBottomBarRep.value = JSON.parse(JSON.stringify(bottomBarRep.value));
}

function replicantsEqual(a, b){
    return JSON.stringify(a) === JSON.stringify(b);
}