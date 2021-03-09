import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const HeaderStyle = styled.div`
    z-index: 2;
    position: sticky !important;
    top: 0px !important;

    .logo{
        color: #2bb3d2 !important;
        font-size: 23px;
        font-weight: 500;
    }
`;

export default class Header extends Component{
    render(){
        return(
            <HeaderStyle className="row navbar navbar-expand-lg navbar-light">
                <div className="col-1">
                    <Link className="navbar-brand logo" to="/">Meetza</Link>
                </div>
                <div className="col-8"></div>
                <div className="col-4"></div>
            </HeaderStyle>
        )
    }
}