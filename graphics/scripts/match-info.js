import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const matchRep = nodecg.Replicant('current-match');

export class GEOpenMatchInfo extends LitElement {
    tl = gsap.timeline({ repeat: -1, repeatDelay: 5});

    async firstUpdated() {
        await NodeCG.waitForReplicants(matchRep);

        matchRep.on('change', (newVal, oldVal) => {
            if (!oldVal) {
                this.createTL(newVal);
                return;
            }

            if (newVal.matchStyle === oldVal.matchStyle && newVal.matchName === oldVal.matchName && newVal.game === oldVal.game) {
                return;
            }

            this.createTL(newVal);
        });
    }

    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div class="row-wrapper">
                <div class="background"></div>
                <img class="logo" src="./assets/logo-short.png">
                <div class="text">
                    <div id="text"></div>
                </div>
            </div>
        `;
    }

    createTL(matchObj) {
        const e = this.querySelector('#text');
        this.tl.pause();
        this.tl.clear();
        
        this.tl.to(e, {
            opacity: 0,
            duration: .4,
            onComplete: () => {
                e.innerHTML = matchObj.game;
            }
        });

        this.tl.to(e, {
            duration: .4,
            opacity: 1
        });

        if (matchObj.matchStyle !== "") {
            this.tl.to(e, {
                duration: .4,
                opacity: 0,
                onComplete: () => {
                    e.innerHTML = matchObj.matchStyle;
                }
            }, "+=5");

            this.tl.to(e, {
                duration: .4,
                opacity: 1
            });
        }

        if (matchObj.matchName !== "") {
            this.tl.to(e, {
                duration: .4,
                opacity: 0,
                onComplete: () => {
                    e.innerHTML = matchObj.matchName;
                }
            }, "+=5");

            this.tl.to(e, {
                duration: .4,
                opacity: 1
            });
        }

        this.tl.play();
    }
}

customElements.define("ge-open-match-info", GEOpenMatchInfo);