import {Post} from '../../types';
import {DefaultState} from "../../../features/home/reducers";
import memoize from 'lodash/memoize';

const POST_KEY_PREFIX = 'post-key-';

interface CustomStoreProps {
    getState: () => { home: DefaultState }
}

/**
 * A custom Middleware to watch and store each custom client Post modification on localStorage.
 * @param store
 */
export const saveSession = (store: CustomStoreProps) => (next: any) => (action: any) => {
    next(action);
    persistPostChangedIfNeeded(store);
    return action;
};

/**
 * Persist custom state of a particular Posts marked as a {@link Post.isNeededToPersistState}.
 * @param store
 */
export function persistPostChangedIfNeeded(store: CustomStoreProps): void {
    // Enqueue this side-effect task to work in a non-blocking way after the
    // call stack will be released.
    setTimeout(() => {
        const postsChanged = filterPostChanged(store);
        postsChanged.forEach(post => {
            updatePost(post);
        })
    }, 0);
}

function filterPostChanged(store: CustomStoreProps): Post[] {
    return store.getState().home.news.filter(post => post.isNeededToPersistState);
}

/**
 * Saving given Post in a local cache in a efficiently way.
 */
const updatePost = memoize((post: Post) => {
    localStorage.setItem(getPostKey(post), JSON.stringify(post));
});

/**
 * Given a list of post, replace with an existing persisted Post.
 *
 * @param posts
 * @return List<Post> hydrated post.
 * @public
 */
export function hydrateWithPersistedPost(posts: Post[] = []): Post[] {
    return posts.map((post) => {
        const postPersisted = getPostPersisted(post);
        return postPersisted ? postPersisted : post
    });
}

function getPostPersisted(post: Post): (Post | undefined) {
    const postSaved = localStorage.getItem(getPostKey(post));
    if (postSaved) {
        return JSON.parse(postSaved);
    }
}

/**
 * Get all post already persisted
 *
 * @return List<Post> hydrated post.
 * @public
 */
export function getAllSavedPost(): Post[] {
    const postsSaved = Object.keys(localStorage)
        .filter((key) => key.startsWith(POST_KEY_PREFIX))
        .map(getPostPersistedByString);
    return cleanUndefinedPost(postsSaved);
}

/**
 * Given Post id, retrieve the persisted Post already exist.
 * @param key
 */
function getPostPersistedByString(key: string): (Post | undefined) {
    const postSaved = localStorage.getItem(key);
    if (postSaved) {
        return JSON.parse(postSaved);
    }
}

function cleanUndefinedPost(posts: any[] = []): Post[] {
    return posts.filter(post => post !== undefined);
}

/**
 * A custom key used to stored a specific Post.
 * @param post
 */
function getPostKey(post: Post) {
    return `${POST_KEY_PREFIX}${post.id}`;
}
