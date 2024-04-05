import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const bottomBarRep = nodecg.Replicant('bottomBar');
const matchRep = nodecg.Replicant('current-match');

export class GEOpenBottomBar extends LitElement {
    createRenderRoot() {
        return this;
    }

    async firstUpdated() {
        await NodeCG.waitForReplicants(bottomBarRep, matchRep);

        bottomBarRep.on('change', (newVal, oldVal) => {
            console.log("bottom bar", newVal);
        });

        matchRep.on('change', (newVal, oldVal) => {
            console.log("match", newVal);
        });
    }

    render() {
        return html`
            <div class="bar-wrapper">
                <img class="logo" src="./assets/logo-short.png">
                <div class="box-wrapper width-game">
                    <div class="label">Game</div>
                </div>
                <div class="box-wrapper tall width-score">
                    <div class="label clipped">Score</div>
                </div>
            </div>
        `;
    }
}

customElements.define("ge-open-bottom-bar", GEOpenBottomBar);