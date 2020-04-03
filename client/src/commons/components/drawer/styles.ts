import styled from 'styled-components';

export const sideBarWidth = '400px';
const timeAnimation = '.5s';

interface DefaultProps {
  isExpanded: boolean;
  isFullExpanded: boolean;
}

export interface FooterProps {
  onClick?: () => void;
}

export const Aside = styled.aside<DefaultProps>((props) => {
  return {
    background: 'rgba(47, 47, 47, 0.78)',
    color: '#ffff',
    position: 'fixed',
    top: 0,
    bottom: 0,
    width: props.isFullExpanded ? '100%' : sideBarWidth,
    left: props.isExpanded ? 0 : `-${sideBarWidth}`,
    transition: `all ${timeAnimation}`,
    overflow: 'auto',
  };
});

export const Header = styled.header`
 text-align: center;
 position: fixed;
 top:0;
 left: inherit;
 width: inherit;
 background: rgba(0, 0, 0, 0.62);
 z-index: 10;
 transition: 'all ${timeAnimation}';
 h1 {
    font-size: 25px;
 }
`;

export const Footer = styled.footer<FooterProps>`
 position: fixed;
 bottom:0;
 left: inherit;
 width: inherit;
 z-index: 10;
 transition: 'all ${timeAnimation}';
 cursor: pointer;
 text-align: center;
 .btn-footer {
    width: inherit;
    height: 50px;
    padding: 0;
 }
`;

export const Body = styled.div`
  padding: 70px 0;
}
`;
