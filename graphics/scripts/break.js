import { LitElement, html } from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

export class GEOpenBreak extends LitElement {
    createRenderRoot() {
        return this;
    }

    render() {
        return html`
            <div class="break-wrapper">
                <div class="row-wrapper top">
                    <div class="box frame">

                    </div>
                    <div class="box next-match">
                        <div class="label">Next Match</div>
                    </div>
                </div>

                <div class="row-wrapper bottom">
                    <img class="logo" src="./assets/logo-full.png">
                    <div class="box break-text">

                    </div>
                </div>
            </div>
        `;
    }
}

customElements.define('ge-open-break', GEOpenBreak);