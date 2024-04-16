import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import gsap from 'https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm';

const castersRep = nodecg.Replicant('casters');
const showCastersRep = nodecg.Replicant('show-casters');

export class GEOpenCasters extends LitElement {
    static properties = {
        casterAName: { type: String },
        casterASubtext: { type: String },
        casterBName: { type: String },
        casterBSubtext: { type: String },
    }
    
    createRenderRoot() {
        return this;
    }

    firstUpdated() {
        NodeCG.waitForReplicants(castersRep, showCastersRep).then(() => {
            castersRep.on('change', (newVal, oldVal) => {
                if (!newVal) return;

                if (!oldVal) {
                    this.casterAName = newVal.casterA.name;
                    this.casterASubtext = newVal.casterA.subtext;
                    this.casterBName = newVal.casterB.name;
                    this.casterBSubtext = newVal.casterB.subtext;
                    return;
                }

                if (newVal.casterA.name !== oldVal.casterA.name || newVal.casterA.subtext !== oldVal.casterA.subtext || newVal.casterB.name !== oldVal.casterB.name || newVal.casterB.subtext !== oldVal.casterB.subtext) {
                    const tl = gsap.timeline();
                    tl.to('.caster-wrapper', {duration: 0.35, opacity: 0, onComplete: () => {
                        this.casterAName = newVal.casterA.name;
                        this.casterASubtext = newVal.casterA.subtext;
                        this.casterBName = newVal.casterB.name;
                        this.casterBSubtext = newVal.casterB.subtext;
                    }});
                    tl.to('.caster-wrapper', {duration: 0.35, opacity: 1, delay: 0.3});
                }
            });

            showCastersRep.on('change', (newVal, oldVal) => {
                if (newVal === undefined) return;

                if (oldVal === undefined) {
                    gsap.set('.card-transition', {
                        opacity: newVal ? 1 : 0
                    });
                    return;
                }
                
                if (newVal) {
                    gsap.fromTo('.card-transition', {
                        x: -150,
                        opacity: 0
                    }, {
                        x: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power4.out',
                    })
                } else {
                    gsap.to('.card-transition', {
                        x: 150,
                        opacity: 0,
                        duration: 0.8,
                        stagger: {
                            amount: 0.15,
                            from: 'end'
                        },
                        ease: 'power4.in',
                    })
                }
            });
        });
    }

    render() {
        const casterA = this.getCasterCard(this.casterAName, this.casterASubtext);
        const casterB = this.getCasterCard(this.casterBName, this.casterBSubtext);
        const onlyOneCaster = casterA === undefined || casterB === undefined;
        return html`
            <div class="caster-wrapper ${onlyOneCaster ? "single" : ""}">
                ${casterA}
                ${casterB}
            </div>
        `;
    }

    getCasterCard(name, subtext) {
        if (name === undefined || name === '') {
            return undefined;
        }
        return html`
            <div class="card-transition">
                <div class="caster-card">
                    <div class="name">${name}</div>
                    <div class="subtext">${subtext}</div>
                </div>
            </div>
        `;
    }
}

customElements.define('ge-open-casters', GEOpenCasters);