import React from 'react';

import {Drawer} from '../../commons/components/drawer';

export const HomePage = () => {

    const isRequestingNextPage = false;
    const isDismissedAll = false;

    return (
        <div>
            <Drawer
                isLoading={isRequestingNextPage}
                isDismissedAll={isDismissedAll}
                onDismissAll={() => {}}
                onNextPage={() => {}}
                isExpanded={true}
                isFullExpanded={false}
            >
                <div>SOME CHILD ELEMENT</div>
            </Drawer>
        </div>
    )
};