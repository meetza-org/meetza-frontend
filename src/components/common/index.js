import React from 'react';
import styled from 'styled-components';

const SpinnerStyle = styled.span`
    color: white;
    font-size: 14px;
    vertical-align: inherit;
`;
export const Spinner = () => <SpinnerStyle className="spinner-border spinner-border-sm spinner" role="status" ariaHidden="true"></SpinnerStyle>