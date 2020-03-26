import {SyntheticEvent} from 'react';

/**
 * This Object represent a Reddit Post object.
 */
export interface Post {
    id?: number,
    title: string,
    name?: string,
    author: string,
    created: number,
    num_comments: number,
    thumbnail: string,
    isViewed: boolean,
    selftext?: string,
    isDismissed: boolean,
    onDismissed: (value: SyntheticEvent) => void,
    onSelected: () => void,
    numberComments?: number
    isNeededToPersistState?: boolean,
    subreddit_id?: number
}
