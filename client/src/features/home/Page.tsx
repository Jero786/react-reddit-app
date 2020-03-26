import React from 'react';
import {useSelector} from 'react-redux';

import {HomePageWrapper} from './styles';

import {Drawer} from '../../commons/components/drawer';
import {Loading} from '../../commons/components/loading';

import {
    selectNews,
    selectIsRequestingNews,
    selectMessageError,
    selectIsDismissedAll,
    selectPostSelected,
    selectIsRequestingNextPage
} from './selectors';
import {
    useFetchNews
} from './hooks';

export const HomePage = () => {
    const isRequestingNews = useSelector(selectIsRequestingNews);
    const news = useSelector(selectNews);
    const isDismissedAll = useSelector(selectIsDismissedAll);
    const isRequestingNextPage = useSelector(selectIsRequestingNextPage);

    useFetchNews();

    if (isRequestingNews) {
        return <Loading/>
    }

    const isDrawerVisible = true;
    const isFullExpanded = false;
    return (
        <HomePageWrapper isDrawerVisible={isDrawerVisible}>
            <Drawer
                isLoading={isRequestingNextPage}
                isDismissedAll={isDismissedAll}
                onDismissAll={() => {}}
                onNextPage={() => {}}
                isExpanded={isDrawerVisible}
                isFullExpanded={isFullExpanded}
            >
                <>
                    {isDrawerVisible && news && news.map(post => <p>{post.title}</p>)}
                </>
            </Drawer>
        </HomePageWrapper>
    );
};

