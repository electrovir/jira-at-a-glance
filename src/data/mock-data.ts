import {EpicDetails} from './epic-details';
import {JiraColorEnum} from './jira-colors';
import {SplitTreeData} from './split-tree';

export const mockCurrentData: SplitTreeData = {
    left: {
        title: 'Labels',
        entries: [
            {
                color: JiraColorEnum.lightOrange,
                link: '',
                name: 'Label 1',
                points: 11,
            },
            {
                color: JiraColorEnum.orange,
                link: '',
                name: 'Label 2',
                points: 2,
            },
            {
                color: JiraColorEnum.green,
                link: '',
                name: 'Label 2',
                points: 5,
            },
            {
                color: JiraColorEnum.lightPurple,
                link: '',
                name: 'Label 2',
                points: 15,
            },
        ],
        unassigned: 3,
    },
    right: {
        title: 'Epics',
        entries: [
            {
                color: JiraColorEnum.blue,
                link: '',
                name: 'Epic 1',
                points: 6,
            },
            {
                color: JiraColorEnum.red,
                link: '',
                name: 'long name epic for some reason',
                points: 10,
            },
            {
                color: JiraColorEnum.turquoise,
                link: '',
                name: 'Epic 4',
                points: 3,
            },
            {
                color: JiraColorEnum.lightRed,
                link: '',
                name: 'Epic 5',
                points: 0,
            },
        ],
        unassigned: 8,
    },
};

export const mockNextData: SplitTreeData = {
    left: {
        title: 'Labels',
        entries: [
            {
                color: JiraColorEnum.lightOrange,
                link: '',
                name: 'Label 1',
                points: 3,
            },
            {
                color: JiraColorEnum.orange,
                link: '',
                name: 'Label 2',
                points: 9,
            },
            {
                color: JiraColorEnum.green,
                link: '',
                name: 'Label 2',
                points: 7,
            },
            {
                color: JiraColorEnum.lightPurple,
                link: '',
                name: 'Label 2',
                points: 1,
            },
        ],
        unassigned: 5,
    },
    right: {
        title: 'Epics',
        entries: [
            {
                color: JiraColorEnum.blue,
                link: '',
                name: 'Epic 1',
                points: 1,
            },
            {
                color: JiraColorEnum.red,
                link: '',
                name: 'long name epic for some reason',
                points: 5,
            },
            {
                color: JiraColorEnum.turquoise,
                link: '',
                name: 'Epic 4',
                points: 7,
            },
            {
                color: JiraColorEnum.lightRed,
                link: '',
                name: 'Epic 5',
                points: 2,
            },
        ],
        unassigned: 3,
    },
};

export const mockEpicProgressData: ReadonlyArray<EpicDetails> = [
    {
        color: JiraColorEnum.blue,
        name: 'Epic 1',
        link: '',
        points: {
            done: 10,
            remaining: 50,
        },
        priority: {
            epic: 40,
            averageByStory: 20,
            highestByStory: 30,
        },
    },
    {
        color: JiraColorEnum.red,
        name: 'long name epic for some reason',
        link: '',
        points: {
            done: 5,
            remaining: 3,
        },
        priority: {
            epic: 50,
            averageByStory: 30,
            highestByStory: 50,
        },
    },
    {
        color: JiraColorEnum.turquoise,
        name: 'Epic 4',
        link: '',
        points: {
            done: 30,
            remaining: 2,
        },
        priority: {
            epic: 10,
            averageByStory: 20,
            highestByStory: 30,
        },
    },
    {
        color: JiraColorEnum.lightRed,
        name: 'Epic 5',
        link: '',
        points: {
            done: 15,
            remaining: 15,
        },
        priority: {
            epic: 20,
            averageByStory: 30,
            highestByStory: 50,
        },
    },
];
