import {assign, css, defineElement, html} from 'element-vir';
import {EpicDetails} from '../../../data/epic-details';
import {VirEpicProgressCard} from './vir-epic-progress-card.element';

export const VirAllEpicProgress = defineElement<{epicDetails: ReadonlyArray<EpicDetails>}>()({
    tagName: 'vir-all-epic-progress',
    styles: css`
        :host {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
    `,
    renderCallback: ({inputs}) => {
        const sortedEpics = inputs.epicDetails
            .filter((epic) => epic.points.remaining)
            .sort((a, b) => b.priority.epic - a.priority.epic);

        return html`
            ${sortedEpics.map((epic) => {
                return html`
                    <${VirEpicProgressCard}
                        ${assign(VirEpicProgressCard, {
                            epicDetails: epic,
                        })}
                    ></${VirEpicProgressCard}>
                `;
            })}
        `;
    },
});
