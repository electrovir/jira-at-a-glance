import {assign, css, defineElementNoInputs, html} from 'element-vir';
import {mockCurrentData, mockEpicProgressData, mockNextData} from '../../data/mock-data';
import {VirAllEpicProgress} from './epic-progress/vir-all-epic-progress.element';
import {VirSplitTree} from './vir-split-tree.element';

export const VirJaagMock = defineElementNoInputs({
    tagName: 'vir-jaag-mock',
    styles: css`
        :host {
            width: 100%;
            min-height: 100%;
            max-width: 100%;
            font-family: sans-serif;
            display: flex;
            gap: 128px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        .trees {
            display: flex;
            align-items: flex-start;
            gap: 64px;
        }

        .subtitle {
            font-size: 0.8em;
            color: #999;
            margin-bottom: 16px;
        }

        h2,
        .subtitle {
            text-align: center;
        }

        h2 {
            margin: 0;
        }

        ${VirSplitTree} {
            width: 300px;
        }
    `,
    renderCallback: () => {
        return html`
            <div class="epic-progress">
                <h2>Epic Progress</h2>
                <div class="subtitle">by epic priority</div>
                <${VirAllEpicProgress}
                    ${assign(VirAllEpicProgress, {
                        epicDetails: mockEpicProgressData,
                    })}
                ></${VirAllEpicProgress}>
            </div>
            <div class="trees">
                <div class="tree">
                    <h2>Next</h2>
                    <div class="subtitle">sprint's points</div>
                    <${VirSplitTree}
                        ${assign(VirSplitTree, {treeData: mockNextData})}
                    ></${VirSplitTree}>
                </div>
                <div class="tree">
                    <h2>Current</h2>
                    <div class="subtitle">sprint's points</div>
                    <${VirSplitTree}
                        ${assign(VirSplitTree, {treeData: mockCurrentData})}
                    ></${VirSplitTree}>
                </div>
            </div>
        `;
    },
});
