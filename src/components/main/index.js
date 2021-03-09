import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Spinner } from '../common'
 
const MainStyle = styled.div`
    margin-top: 10px;

    .row{
        margin-top: 10px;
    }

    .start-button{
        width: 150px;
        text-align: center;
        background-image: linear-gradient(45deg,#00d3d6,#2183ff);
        padding: 5px;
        border-radius: 5px;
        margin-top: 10px;
        cursor: pointer;
        color: white;
        font-weight: 600;
    }

    .main-text{
        font-size: 24px;
        font-style: italic;
        color: #3a475a
    }

    .waiting-message{
        width: 200px;
        text-align: center;
        padding: 5px;
        border-radius: 5px;
        margin-top: 10px;
        font-weight: 600;
    
        .text{
          color: #607f94;
        }
    
        .spinner {
          color: #607f94;
        }
      }
`;

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            loader: false,
        }
    }
    onStartMeeting = () => {
        this.setState({loader: true}, () => {
            const roomId = uuidv4();
            this.props.sendSignal({
                roomId: roomId,
                type: "create-room",
                emailId: this.props.userEmailId,
            });
        })
    }

    componentDidUpdate(){
        if(this.props.roomCreated){
            this.props.history.push(`/room/${this.props.roomId}`);
            this.setState({loader: false});
        }
    }

    render(){
        return(
            <Fragment>
                <MainStyle className="container">
                    <div className="row main-text">{`Hi ${this.props.firstName},`}</div>
                    <div className="row main-text">Meetza is a free and open source video conferencing application. Click the button below to start a meeting and share the link with people to join.</div>
                    <div className="row">
                        {this.state.loader ? (
                            <div className="waiting-message">
                                <Spinner />
                            </div>
                        ) : (
                            <div className="start-button" onClick={this.onStartMeeting}>Host a Meeting</div> 
                        )}
                    </div>
                </MainStyle>
            </Fragment>
            
        )
    }
}