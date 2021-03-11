import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
 
const MainStyle = styled.div`
    margin-top: 25px;

    .row{
        margin-top: 10px;
    }

    .main-text{
        font-size: 24px;
        font-style: italic;
        color: #3a475a
        display: flex;
        align-items: center;
        @media (max-width: 575.98px) { 
            font-size: 18px;
        }
    }

    img{
        width: 100%;
        height: 100%;
    }
`;

export default class Home extends Component{
    render(){
        return(
            <Fragment>
                <MainStyle className="container">
                    <div className="row">
                        <div className="col-12 col-sm-4 main-text">
                            Meetza is a free and open source video conferencing application. Sign in and get started in within seconds.
                        </div>
                        <div className="col-12 col-sm-8">
                            <img src="images/video-conference.png" alt="Video Conferencing"></img>
                        </div>
                    </div>
                </MainStyle>
            </Fragment>
            
        )
    }
}