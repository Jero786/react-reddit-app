import styled from 'styled-components';

export const PostDetailWrapper = styled.article`
  padding: 1em;
  margin: 15px;
  width: calc(100% - 30px);
  overflow: auto;
  > h1 {
    font-size: 40px;
    font-weight: 300;
    margin-top: 0px;
    text-align: center;
  }
  > figure {
    text-align: center;
  }
  img {
    border-radius: 50%;
    height: fit-content;
    padding: 0 1em;
    height: 170px;
    width: 170px;
  }
`;

export const FigureWrapper = styled.figure`
  margin: 20px;
  text-align: center;
`;
