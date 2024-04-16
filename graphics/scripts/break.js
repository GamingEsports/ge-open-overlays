import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const breakRep = nodecg.Replicant('break');

export class GEOpenBreak extends LitElement {
    static properties = {
        nextMatch: { type: Object },
        breakText: { type: String }
    };

    createRenderRoot() {
        return this;
    }

    firstUpdated() {
        NodeCG.waitForReplicants(breakRep).then(() => {

            breakRep.on('change', (newVal, oldVal) => {
                if (!newVal) return;

                if (!oldVal) {
                    if (newVal.nextMatchTeamA !== "" && newVal.nextMatchTeamB !== "") {
                        this.nextMatch = {
                            teamA: newVal.nextMatchTeamA,
                            teamB: newVal.nextMatchTeamB,
                            playStyle: newVal.nextMatchPlayStyle,
                            name: newVal.nextMatchName,
                            game: newVal.nextMatchGame
                        };
                    } else {
                        this.nextMatch = undefined;
                    }

                    this.updateBreakText(newVal.infoText);
                    return;
                }

                if (newVal.infoText !== oldVal.infoText) {
                    const tl = gsap.timeline();
                    const breakText = this.querySelector('#info-text');
                    tl.to(breakText, {
                        duration: 0.25, opacity: 0, onComplete: () => {
                            this.updateBreakText(newVal.infoText);
                        }
                    });
                    tl.to(breakText, { duration: 0.25, opacity: 1 }, "+=0.2");
                }

                if (newVal.nextMatchTeamA !== oldVal.nextMatchTeamA || newVal.nextMatchTeamB !== oldVal.nextMatchTeamB || newVal.nextMatchName !== oldVal.nextMatchName || newVal.nextMatchGame !== oldVal.nextMatchGame || newVal.nextMatchPlayStyle !== oldVal.nextMatchPlayStyle) {
                    const tl = gsap.timeline();
                    const nextMatch = this.querySelector('.next-match-content');
                    tl.to(nextMatch, {
                        duration: 0.25, opacity: 0, onComplete: () => {
                            if (newVal.nextMatchTeamA !== "" && newVal.nextMatchTeamB !== "") {
                                this.nextMatch = {
                                    teamA: newVal.nextMatchTeamA,
                                    teamB: newVal.nextMatchTeamB,
                                    playStyle: newVal.nextMatchPlayStyle,
                                    name: newVal.nextMatchName,
                                    game: newVal.nextMatchGame
                                };
                            } else {
                                this.nextMatch = undefined;
                            }
                        }
                    });
                    tl.to(nextMatch, { duration: 0.25, opacity: 1 }, "+=0.2");
                }
            });

            document.fonts.ready.then(() => {   
                this.updateBreakText(breakRep.value.infoText);
            });

        });
    }

    render() {
        return html`
            <div class="break-wrapper">
                <div class="row-wrapper top">
                    <div class="box frame">

                    </div>
                    <div class="box next-match">
                        <div class="label">Next Match</div>
                        <div class="next-match-content">
                            ${this.getNextMatchTemplate()}
                        </div>
                    </div>
                </div>

                <div class="row-wrapper bottom">
                    <img class="logo" src="./assets/logo-full.png">
                    <div class="box break-text">
                        <div id="info-text">${this.breakText}</div>
                    </div>
                </div>
            </div>
        `;
    }

    getNextMatchTemplate() {
        if (this.nextMatch !== undefined) {
            return html`
                <div>${this.nextMatch.teamA}</div>
                <div class="vs">vs</div>
                <div>${this.nextMatch.teamB}</div>
                <div class="match-info">
                    <div><strong>${this.nextMatch.game}</strong></div> 
                    <div>${this.nextMatch.name}</div>
                    <div>${this.nextMatch.playStyle}</div>
                </div>
            `;
        } else {
            return html`
                <div>Waiting for next match...</div>
            `;
        }
    }

    updateBreakText(text) {
        const breakText = this.querySelector('#info-text');
        this.breakText = text;
        const scale = 975 / breakText.scrollWidth;
        breakText.style.transform = `scaleX(${Math.min(scale, 1)})`;
    }
}

customElements.define('ge-open-break', GEOpenBreak);