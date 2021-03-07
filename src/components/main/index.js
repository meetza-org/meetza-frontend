import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
 
const MainStyle = styled.div`
    margin-top: 10px;

    .row{
        margin-top: 10px;
    }

    .start-button{
        width: 150px;
        text-align: center;
        background-image: linear-gradient(45deg, #acfcfd, #04b2da);
        padding: 5px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
    }
`;

export default class Main extends Component{
    onStartMeeting = () => {
        const roomId = uuidv4();
        this.props.sendSignal({
            roomId: roomId,
            type: "create-room",
            emailId: this.props.userEmailId,
          });
        this.props.history.push(`/room/${roomId}`);
    }

    render(){
        return(
            <Fragment>
                <MainStyle className="container">
                    <div className="row">{`Welcome ${this.props.firstName},`}</div>
                    <div className="row">Meetza is a free and open source video conferencing application. Click the button below to start a meeting and share the link with people to join.</div>
                    <div className="row">
                        <div className="start-button" onClick={this.onStartMeeting}>Start a Meeting</div> 
                    </div>
                </MainStyle>
            </Fragment>
            
        )
    }
}