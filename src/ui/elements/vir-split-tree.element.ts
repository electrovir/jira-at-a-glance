import {getObjectTypedKeys} from 'augment-vir';
import {css, defineElement} from 'element-vir';
import {html, TemplateResult} from 'lit';
import {classMap} from 'lit/directives/class-map.js';
import {SplitTreeData, SplitTreeEntry} from '../../data/split-tree';

export const VirSplitTree = defineElement<{treeData: SplitTreeData}>()({
    tagName: 'vir-split-tree',
    styles: css`
        :host {
            display: flex;
            position: relative;
        }

        .tree-side {
            position: relative;
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: stretch;
        }

        .tree-entries {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            border: 2px solid transparent;
            flex-grow: 1;
            padding: 4px 8px;
        }

        .title {
            text-align: center;
        }

        .right .tree-entries {
            border-left-color: #333;
            padding-left: 0;
        }

        .left .tree-entries {
            border-right-color: #333;
            padding-right: 0;
        }

        .bar-wrapper {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            align-items: flex-end;
            justify-content: flex-start;
        }

        .left .bar-wrapper {
            justify-content: flex-end;
        }

        .tree-entry-bar {
            max-width: 99%;
            min-width: 10px;
            background-color: var(--tree-entry-bar-color, #aaa);
            height: 40px;
            box-sizing: border-box;
            border-radius: 0 4px 4px 0;
        }

        .left .tree-entry-bar {
            border-radius: 4px 0 0 4px;
        }

        .pretty-border {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            border: 3px solid #ffffff55;
            padding: 0 8px;
            border-radius: inherit;
        }

        .left .pretty-border {
            justify-content: flex-end;
            border-right-width: 0;
        }

        .right .pretty-border {
            border-left-width: 0;
        }

        .tree-entry-name {
            border-radius: 4px;
            background-color: #ffffffdd;
            padding: 1px 4px;
            cursor: pointer;
            text-decoration: none;
            white-space: nowrap;
            color: black;
        }

        .unassigned {
            flex-grow: 1;
        }

        h3 {
            font-weight: normal;
            margin: 0;
            margin-bottom: 4px;
        }
    `,
    renderCallback: ({inputs}) => {
        return html`
            ${getObjectTypedKeys(inputs.treeData).map((treeSide) => {
                return createTreeSideTemplate(inputs.treeData, treeSide);
            })}
        `;
    },
});

function createTreeSideTemplate(
    treeData: SplitTreeData,
    treeSide: keyof SplitTreeData,
): TemplateResult {
    const sideValue = treeData[treeSide];
    const pointsMax = sideValue.entries.reduce((highest, entry) => {
        return Math.max(highest, entry.points);
    }, sideValue.unassigned);

    const sortedEntries = [...sideValue.entries.filter((entry) => entry.points)].sort(
        (a, b) => b.points - a.points,
    );

    return html`
        <div class="tree-side ${treeSide}">
            <h3 class="title">${sideValue.title}</h3>
            <div class="tree-entries">
                ${sortedEntries.map((entry) => {
                    return createEntryTemplate(entry, pointsMax, false);
                })}
                ${createEntryTemplate(
                    {
                        color: '#bbb',
                        link: '',
                        name: 'unassigned',
                        points: sideValue.unassigned,
                    },
                    pointsMax,
                    true,
                )}
            </div>
        </div>
    `;
}

function createEntryTemplate(entry: SplitTreeEntry, pointsMax: number, isUnassigned: boolean) {
    const percentage = Math.round((entry.points / pointsMax) * 100);
    return html`
        <div class="bar-wrapper ${classMap({unassigned: isUnassigned})}">
            <div
                class="tree-entry-bar"
                style="width: ${percentage}%; --tree-entry-bar-color: ${entry.color}"
            >
                <div class="pretty-border">
                    <a class="tree-entry-name" href=${entry.link}>
                        <span>${entry.name}</span>
                    </a>
                </div>
            </div>
        </div>
    `;
}
