import {css, defineElement, html} from 'element-vir';
import {EpicDetails} from '../../../data/epic-details';

export const VirEpicProgressCard = defineElement<{epicDetails: EpicDetails}>()({
    tagName: 'vir-epic-progress-card',
    styles: css`
        :host {
            display: block;
            border-radius: 8px;
            background-color: var(--epic-color);
            max-width: 250px;
        }

        .pretty-border {
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 3px solid #ffffff55;
            border-radius: inherit;
            padding: 8px;
            display: flex;
            gap: 16px;
            flex-direction: column;
        }

        .text {
            border-radius: 4px;
            background-color: #ffffffdd;
            color: black;
            padding: 1px 4px;
            align-self: flex-start;
        }

        .title {
            cursor: pointer;
            text-decoration: none;
        }

        .progress-wrapper {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .progress-background {
            border: 2px solid transparent;
            box-sizing: border-box;
            overflow: hidden;
            max-width: 100%;
            width: 200px;
            min-width: 100%;
            height: 12px;
            background-color: #ffffffdd;
            border-radius: 6px;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background-color: #00000055;
        }

        .points-wrapper {
            font-size: 0.75em;
            display: flex;
            justify-content: space-between;
            opacity: 0.6;
        }
    `,
    renderCallback: ({inputs, host}) => {
        host.style.setProperty('--epic-color', inputs.epicDetails.color);
        const percentDone = Math.round(
            (inputs.epicDetails.points.done /
                (inputs.epicDetails.points.done + inputs.epicDetails.points.remaining)) *
                100,
        );

        console.log(percentDone);

        return html`
            <div class="pretty-border">
                <a href=${inputs.epicDetails.link} class="title text">
                    <span>${inputs.epicDetails.name}</span>
                </a>
                <div class="progress-wrapper">
                    <div class="progress-background">
                        <div class="progress-bar" style="width: ${percentDone}%;"></div>
                    </div>
                    <div class="points-wrapper">
                        <span class="percent text">${inputs.epicDetails.points.done}</span>
                        <span class="percent text">${percentDone}%</span>
                        <span class="percent text">${inputs.epicDetails.points.remaining}</span>
                    </div>
                </div>
            </div>
        `;
    },
});
