import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'

const HeaderStyle = styled.div`
    background-color: #f9f9f9;
    border-bottom: 1px solid #e6e6e6;
    box-shadow: 0px -4px 15px 0px #797979;
    z-index: 2;
    position: sticky !important;
    top: 0px !important;
`;

export default class Header extends Component{
    render(){
        return(
            <HeaderStyle className="row navbar navbar-expand-lg navbar-light">
                <div className="col-1">
                    <Link className="navbar-brand" to="/">Meetza</Link>
                </div>
                <div className="col-8"></div>
                <div className="col-4"></div>
            </HeaderStyle>
        )
    }
}