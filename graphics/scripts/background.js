import { LitElement, css, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";
import p5 from 'https://cdn.jsdelivr.net/npm/p5@1.9.2/+esm'

export class GEOpenBackground extends LitElement {
    static styles = css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #662B29 0%, #AB3A36 122.13%);
        }
    `;

    render() {
        return html`
            <div id="bg"></div>
        `;
    }

    firstUpdated() {
        const element = this.shadowRoot.getElementById("bg");
        new p5((p5) => {
            p5.particles = [];

            p5.setup = function () {
                const c = p5.createCanvas(1920, 1080);
                c.parent(element);
                for (let i = 0; i < 220; i++) {
                    this.particles.push(new Particle(p5.random(0, 1920), p5.random(0, 1080), p5.random(.02, .50), p5.random(5, 70)));
                }
                c.style("visibility", "visible")
            }

            p5.draw = function () {
                p5.clear();
                p5.background(0,0,0,0)
                p5.stroke("#AB3A36");
                p5.strokeWeight(1);
            
                for (let i = 0; i < this.particles.length; i++) {
                    const p = this.particles[i];
                    p5.line(p.x, p.y, p.x + p.len, p.y - p.len);
            
                    p.x += p.speed;
                    p.y -= p.speed;
            
                    if (p.x > p5.width + p.len) {
                        p.x = -p.len;
                    }
                    if (p.y < -p.len) {
                        p.y = p5.height + p.len;
                    }
                }
            }
        });
    }
}

customElements.define("ge-open-background", GEOpenBackground);

class Particle {
    constructor(x, y, speed, len) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.len = len
    }
}
