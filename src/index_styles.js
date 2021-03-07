import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body{
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  ::-webkit-scrollbar-track-piece:start {
    margin-top: 75px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #dbdbdb;
  }
`;
