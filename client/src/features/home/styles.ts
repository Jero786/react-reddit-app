import styled from 'styled-components';
import {sideBarWidth} from '../../commons/components/drawer/styles';

interface DefaultProps {
    isDrawerVisible: boolean
}

export const HomePageWrapper = styled.section<DefaultProps>`
    position: fixed;
    left: ${props => props.isDrawerVisible ? sideBarWidth : 0};
    right: 0;
    top: 0;
    bottom: 0;
    transition: all .5s;
`;