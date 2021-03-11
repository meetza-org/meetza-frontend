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

    .github-link{
        display: flex;
        justify-content: center;

        a {
            margin-right: 20px;
            padding: 2px;
        }

        img{
            height: 30px;
        }
    }

    .logout-button{
        text-align: center;
        border: 1px solid #2183ff;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer; 
        color: #2183ff;
        font-weight: 600;
        width: 100px;
    }
`;

export default class Header extends Component{
    clearDataAndRedirectToLogin = () => {
        this.props.logout();
        window.location.href = "/";
    }

    login = () => {
        window.location.href = "/login";
    }

    render(){
        return(
            <HeaderStyle className="row navbar navbar-expand-lg navbar-light">
                <div className="col-1">
                    <Link className="navbar-brand logo" to="/">Meetza</Link>
                </div>
                <div className="col-2 col-sm-9"></div>
                <div className="col-6 col-sm-2 github-link">
                    <a href="https://github.com/meetza-org" target="_blank" rel="noopener noreferrer">
                        <img src="/images/GitHub-Mark-120px-plus.png" alt="Github URL" />
                    </a>
                    {this.props.isUserLoggedIn ? (
                        <div className="logout-button" onClick={this.clearDataAndRedirectToLogin}>Logout</div>
                    ): (window.location.pathname !== "/login" ? <div className="logout-button" onClick={this.login}>Sign In</div> : null)}
                </div>
                    
            </HeaderStyle>
        )
    }
}