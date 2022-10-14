export type Priority = 10 | 20 | 30 | 40 | 50;

export type EpicDetails = {
    link: string;
    color: string;
    name: string;
    priority: {
        epic: Priority;
        averageByStory: Priority;
        highestByStory: Priority;
    };
    points: {
        done: number;
        remaining: number;
    };
};
