import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import "./background.js";

const matchRep = nodecg.Replicant('current-match');

export class GEOpenScore extends LitElement {
    static properties = {
        team: {type: String},
        scoreAlign: {type: String},
        name: {type: String, state: true},
        score: {type: Number, state: true},
    };

    async firstUpdated() {
        await NodeCG.waitForReplicants(matchRep);

        matchRep.on('change', (newVal) => {
            if (this.team === 'a') {
                this.name = newVal.playerAName
                this.score = newVal.playerAScore
            } else {
                this.name = newVal.playerBName
                this.score = newVal.playerBScore
            }
        });

        document.fonts.ready.then(() => {
            this.requestUpdate();
        });
    }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div class="score ${this.scoreAlign}">
                <div class="name-wrapper">
                    <div class="name">${this.name}</div>
                    <ge-open-background></ge-open-background>
                </div>
                <div class="score-wrapper">
                    <div class="score-num">${this.score}</div>
                </div>
            </div>
        `;
    }

    updated() {
        const name = this.querySelector('.name')
        const wrapper = this.querySelector('.name-wrapper')
        const targetWidth = wrapper.clientWidth - 60;

        name.style.transformOrigin = this.scoreAlign;
        
        if (name.clientWidth > targetWidth) {
            name.style.transform = `scaleX(${targetWidth / name.clientWidth})`
        } else {
            name.style.transform = 'scaleX(1)'
        }
    }
}

customElements.define("ge-open-score", GEOpenScore);