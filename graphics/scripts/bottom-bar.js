import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const bottomBarRep = nodecg.Replicant('bottomBar');
const matchRep = nodecg.Replicant('current-match');

export class GEOpenBottomBar extends LitElement {
    static properties = {
        teamAName: { type: String },
        teamBName: { type: String },
        teamAScore: { type: Number },
        teamBScore: { type: Number },
        matchStyle: { type: String },
        miscText: { type: String },
        game: { type: String },
    }

    createRenderRoot() {
        return this;
    }

    async firstUpdated() {
        await NodeCG.waitForReplicants(bottomBarRep, matchRep);

        bottomBarRep.on('change', (newVal, oldVal) => {
            if (!oldVal) {
                if (newVal.show === "match") {
                    gsap.set("#bar-wrapper-match", { opacity: 1 });
                    gsap.set("#bar-wrapper-misc", { opacity: 0 });
                } else {
                    gsap.set("#bar-wrapper-match", { opacity: 0 });
                    gsap.set("#bar-wrapper-misc", { opacity: 1 });
                }

                this.miscText = newVal.breakText;

                return;
            }

            if (newVal.breakText !== oldVal.breakText) {
                this.animateBoxStateChange("#misc", () => {
                    this.miscText = newVal.breakText;
                });
            }

            if (newVal.show !== oldVal.show) {
                const tl = gsap.timeline();
                if (newVal.show === "match") {
                    tl.to("#bar-wrapper-misc > *", {
                        opacity: 0,
                        y: 100,
                        duration: 0.75,
                        ease: "power4.in",
                        stagger: 0.1
                    });
                    tl.set("#bar-wrapper-misc", { opacity: 0 })
                    tl.set("#bar-wrapper-match", { opacity: 1 })
                    tl.fromTo("#bar-wrapper-match > *", {
                        opacity: 0,
                        y: 100
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        ease: "power4.out",
                        stagger: 0.18
                    });
                } else {
                    tl.to("#bar-wrapper-match > *", {
                        opacity: 0,
                        y: 100,
                        duration: 0.75,
                        ease: "power4.in",
                        stagger: 0.1
                    });
                    tl.set("#bar-wrapper-match", { opacity: 0 })
                    tl.set("#bar-wrapper-misc", { opacity: 1 })
                    tl.fromTo("#bar-wrapper-misc > *", {
                        opacity: 0,
                        y: 100
                    }, {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        ease: "power4.out",
                        stagger: 0.18
                    });
                }
            }
        });

        matchRep.on('change', (newVal, oldVal) => {
            if (!oldVal) {
                console.log(newVal);
                this.teamAName = newVal.playerAName;
                this.teamBName = newVal.playerBName;
                this.teamAScore = newVal.playerAScore;
                this.teamBScore = newVal.playerBScore;
                this.matchStyle = newVal.matchStyle;
                this.game = newVal.game;
                return;
            }

            let delay = 0;

            if (newVal.game !== oldVal.game) {
                this.animateBoxStateChange("#game", () => {
                    this.game = newVal.game;
                });

                delay = 0.15;
            }

            if (newVal.playerAName !== oldVal.playerAName || newVal.playerBName !== oldVal.playerBName) {
                this.animateBoxStateChange("#score", () => {
                    this.teamAName = newVal.playerAName;
                    this.teamBName = newVal.playerBName;
                }, delay);
            }

            this.teamAScore = newVal.playerAScore;
            this.teamBScore = newVal.playerBScore;
        });
    }

    render() {
        return html`
            <div class="bar-wrapper" id="bar-wrapper-match">
                <img class="logo" src="./assets/logo-short.png">
                <div class="box-wrapper width-game" id="game">
                    <div class="label">Game</div>
                    <div class="box">${this.game}</div>
                </div>
                <div class="box-wrapper tall width-score" id="score">
                    <div class="label clipped">Score</div>
                    <div class="box stacked">
                        <div>${this.teamAName}: ${this.teamAScore}</div>
                        <div>${this.teamBName}: ${this.teamBScore}</div>
                    </div>
                </div>
            </div>
            <div class="bar-wrapper" id="bar-wrapper-misc">
                <img class="logo full" src="./assets/logo-full.png">
                <div class="box-wrapper" id="misc">
                    <div class="box">${this.miscText}</div>
                </div>
            </div>
        `;
    }

    animateBoxStateChange(query, onComplete, delay = 0) {
        const tl = gsap.timeline({ delay: delay });
        tl.to(query, {
            opacity: 0,
            y: 100,
            duration: 0.65,
            ease: "power4.in",
            onComplete: onComplete
        });
        tl.to(query, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power4.out"
        }, "+=0.15");
    }
}

customElements.define("ge-open-bottom-bar", GEOpenBottomBar);