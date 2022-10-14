import {EpicDetails} from './epic-details';

export type SplitTreeEntry = Readonly<
    {
        points: number;
    } & Pick<EpicDetails, 'color' | 'name' | 'link'>
>;

export type SplitTreeData = Readonly<
    Record<
        'left' | 'right',
        {
            title: string;
            entries: ReadonlyArray<SplitTreeEntry>;
            unassigned: number;
        }
    >
>;
