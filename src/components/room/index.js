import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSlash, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash } from '@fortawesome/free-solid-svg-icons';
import * as R from 'ramda';
 
const MainStyle = styled.div`
margin-top: 20px;

.row{
    margin-top: 10px;
}

.bottom-row{
  position: fixed;
  bottom: 1rem;
  width: 100%;
}

.leave-button{
    display: inline-flex;
    background-image: linear-gradient(45deg,#ff6c44,#ff0000);
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    height: 50px;
    width: 50px;
    color: white;

    svg{
      margin: auto;
    }
}

.join-button{
    width: 150px;
    text-align: center;
    background-image: linear-gradient(45deg, #acfcfd, #04b2da);
    padding: 5px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer; 
}

.camerabox {
    grid-area: camerabox;
    width: 500px;
    height: 375px;
    border: 1px solid black;
    vertical-align: top;
    display: block;
    position:relative;
    overflow:auto;
  }
  
.remote-video-bg{
  background-color: #636563;
  box-shadow: 0 0 7px 0px #18bf7a;
}

#received_video {
    width: 100%;
  }

  #local_video {
    width: 100%;
    box-shadow: 0 0 7px 0px #1853bf;
  }
  
  #hangup-button:disabled {
    filter: grayscale(50%);
    -webkit-filter: grayscale(50%);
    cursor: default;
  }
  
  .empty-container {
    grid-area: empty-container;
  }
`;

const ButtonStyle = styled.div`
  display: inline-flex;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;
  width: 50px;
  color: white;
  background-color: white;
  margin-right: 5px;

  svg{
    margin: auto;
    font-size: 22px;
  }
`

const AudioVideoButtonStyle = styled(ButtonStyle)`
  border: 1px solid ${props => props.isMuted ? "#ff6c44" : "#17800a"};
  svg{
    color: ${props => props.isMuted ? "#ff6c44" : "#20bd0d"} ;
  }
`

const AudioButton = ({onClick, isMuted}) => 
  <AudioVideoButtonStyle onClick={onClick} isMuted={isMuted}>
    <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} />
  </AudioVideoButtonStyle>

const VideoButton = ({onClick, isMuted}) =>
  <AudioVideoButtonStyle onClick={onClick} isMuted={isMuted}>
    <FontAwesomeIcon icon={isMuted ? faVideoSlash : faVideo} />
  </AudioVideoButtonStyle>

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomId: null,
            isJoined: false,
            mediaConstraints : {
                audio: true, // We want an audio track
                video: true // ...and we want a video track
            }
        }
        this.myPeerConnection = null;
        this.videoOffer = null;
        this.videoAnswer = null;
        this.iceCandidate = null;
        this.localVideoSrc = React.createRef();
        this.remoteVideoSrc = React.createRef();
        this.myPeerConnections = {};
    }

    componentDidMount(){
        const { roomId } = this.props.match.params;
        this.setState({roomId: roomId});  
    }

    handleVideoAnswerMsg = msg => {   
      // Configure the remote description, which is the SDP payload
      // in our "video-answer" message.
      this.videoAnswer = msg;
      console.log("############### Video Answer Room #####################3");
      var desc = new RTCSessionDescription(msg.sdp);
      this.myPeerConnection.setRemoteDescription(desc)
      .catch(() => console.log("!!!!!!!!!!!!!!!!! VIDEO ANSWER ERROR !!!!!!!!!!!!!!!!!!!!!"));
    }

    handleVideoOfferMsg = msg => {
      this.videoOffer = msg;
      const desc = new RTCSessionDescription(msg.sdp);
      let { mediaConstraints, roomId } = this.state;
      this.myPeerConnection.setRemoteDescription(desc)
      .then(() => navigator.mediaDevices.getUserMedia(mediaConstraints))
      .then(localStream => {
        this.localVideoSrc.current.srcObject = localStream;
        localStream.getTracks().forEach(track => this.myPeerConnection.addTrack(track, localStream));
      })
      .then(() => this.myPeerConnection.createAnswer())
      .then(answer => this.myPeerConnection.setLocalDescription(answer))
      .then(() => {
        this.props.sendSignal({
          roomId: roomId,
          type: "video-answer",
          sdp: this.myPeerConnection.localDescription,
          emailId: this.props.userEmailId,
          targetEmailId: msg.emailId
        });
      })
      .catch(this.handleGetUserMediaError);
    }

    handleNewICECandidateMsg = msg => {
      this.iceCandidate = msg;
      var candidate = new RTCIceCandidate(msg.candidate);
      this.myPeerConnection.addIceCandidate(candidate)
        .catch(() => console.log("!!!!!!!!!!!!!!!!! ICE ERROR !!!!!!!!!!!!!!!!!!!!!"));
    }

    handleICECandidateEvent = event => {
      if (event.candidate) {
        const { roomId } = this.state;
        this.props.sendSignal({
          roomId: roomId,
          type: "new-ice-candidate",
          sdp: this.myPeerConnection.localDescription,
          emailId: this.props.userEmailId,
        });
      }
    }

    handleTrackEvent = event => {
      debugger;
      this.remoteVideoSrc.current.srcObject = event.streams[0];
    }

    joinRoom = () => {
        const { roomId } = this.state;
        this.props.sendSignal({
          roomId: roomId,
          type: "join-room",
          emailId: this.props.userEmailId,
        });
        this.setState({isJoined: true});
        this.createPeerConnection();
    }

    createPeerConnection = () => {
      const { mediaConstraints } = this.state;
        this.myPeerConnection = new RTCPeerConnection({
            iceServers: [     // Information about ICE servers - Use your own!
              {
                urls: `turn:${process.env.REACT_APP_COTURN_URL}`,
                username: `${process.env.REACT_APP_COTURN_USERNAME}`,
                credential: `${process.env.REACT_APP_COTURN_PASSWORD}`
              }
            ]
        });
      
        this.myPeerConnection.onicecandidate = this.handleICECandidateEvent;
        this.myPeerConnection.ontrack = this.handleTrackEvent;
        this.myPeerConnection.onnegotiationneeded = this.handleNegotiationNeededEvent;
        this.myPeerConnection.onremovetrack = this.handleRemoveTrackEvent;
        this.myPeerConnection.oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
        this.myPeerConnection.onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
        this.myPeerConnection.onsignalingstatechange = this.handleSignalingStateChangeEvent;
        navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(localStream => {
            this.localVideoSrc.current.srcObject = localStream;
            localStream.getTracks().forEach(track => this.myPeerConnection.addTrack(track, localStream));
        })
        .catch(this.handleGetUserMediaError);
    }

    handleNegotiationNeededEvent = () => {
        const { roomId } = this.state;
        this.myPeerConnection.createOffer()
        .then(offer => this.myPeerConnection.setLocalDescription(offer))
        .then(() => {
            this.props.sendSignal({
                roomId: roomId,
                type: "video-offer",
                sdp: this.myPeerConnection.localDescription,
                emailId: this.props.userEmailId
              })
        })
        .catch(() => console.log('Error Occured'));
      }

    handleGetUserMediaError  = e => {
        switch(e.name) {
          case "NotFoundError":
            alert("Unable to open your call because no camera and/or microphone" +
                  "were found.");
            break;
          case "SecurityError":
          case "PermissionDeniedError":
            // Do nothing; this is the same as the user canceling the call.
            break;
          default:
            alert("Error opening your camera and/or microphone: " + e.message);
            break;
        }
        this.closeVideoCall();
    }

    closeVideoCall = () => {    
        if (this.myPeerConnection) {
          this.myPeerConnection.ontrack = null;
          this.myPeerConnection.onremovetrack = null;
          this.myPeerConnection.onremovestream = null;
          this.myPeerConnection.onicecandidate = null;
          this.myPeerConnection.oniceconnectionstatechange = null;
          this.myPeerConnection.onsignalingstatechange = null;
          this.myPeerConnection.onicegatheringstatechange = null;
          this.myPeerConnection.onnegotiationneeded = null;
      
          if (this.remoteVideoSrc.current.srcObject) {
            this.remoteVideoSrc.current.srcObject.getTracks().forEach(track => track.stop());
            this.remoteVideoSrc = React.createRef();
          }
      
          if (this.localVideoSrc.current.srcObject) {
            this.localVideoSrc.current.srcObject.getTracks().forEach(track => track.stop());
            this.localVideoSrc = React.createRef();
          }
      
          this.myPeerConnection.close();
          this.myPeerConnection = null;
        }
        
        this.setState({isJoined: false})
    }

    handlePropsChange = props => {
      if(props.videoOffer !== this.videoOffer){
        debugger;
        this.handleVideoOfferMsg(props.videoOffer)
      }
      if(props.iceCandidate !== this.iceCandidate){
        debugger;
        this.handleNewICECandidateMsg(props.iceCandidate)
      }
      if(props.videoAnswer !== this.videoAnswer){
        debugger;
        this.handleVideoAnswerMsg(props.videoAnswer);
      }
    }

    handleMuteUnmute = kind => {
      let {mediaConstraints} = this.state;
      mediaConstraints[kind] = !mediaConstraints[kind];
      if(kind === "video"){
        if (this.localVideoSrc.current.srcObject) {
          this.localVideoSrc.current.srcObject.getTracks().forEach(track => track.stop());
          this.localVideoSrc = React.createRef();
        }
      }
      navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(localStream => {
          this.localVideoSrc.current.srcObject = localStream;
          localStream.getTracks().forEach(track => this.myPeerConnection.addTrack(track, localStream));
      })
      .catch(err => {
        console.log(err)
      });
      this.setState({mediaConstraints: mediaConstraints});
    }

    handleVideoListDisplay = key => <video id="received_video" ref={R.prop(key, this.remoteVideoList)} autoPlay></video>

    render(){
        this.handlePropsChange(this.props);
        const {mediaConstraints} = this.state;
        return(
            <Fragment>
                <MainStyle>
                    {this.state.isJoined ? (
                      <div className="container-fluid">
                        <div className="row" id="camera-container">
                          <div className="col"></div>
                          <div className="col-6 remote-video-bg">
                              <video id="received_video" ref={this.remoteVideoSrc} autoPlay></video>
                          </div>
                          <div className="col"></div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <video id="local_video" ref={this.localVideoSrc} src={this.state.localVideoSrc} autoPlay muted></video>
                          </div>
                          { !R.isEmpty(this.remoteVideoList) ? R.map(this.handleVideoListDisplay, R.keys(this.remoteVideoList)) : null }
                        </div>
                        <div className="row bottom-row">
                          <div className="col"></div>
                          <div className="col-12 col-md-6">
                            <div className="row">
                              <div className="col"></div>
                              <div className="col-2 col-sm-1">
                                <AudioButton onClick={() => this.handleMuteUnmute("audio")} isMuted={!mediaConstraints.audio}></AudioButton>
                              </div>
                              <div className="col-2 col-sm-1">
                                <VideoButton onClick={() => this.handleMuteUnmute("video")} isMuted={!mediaConstraints.video}></VideoButton>
                              </div>
                              <div className="col-2 col-sm-1">
                                <div className="leave-button" id="hangup-button" onClick={this.closeVideoCall}>
                                  <FontAwesomeIcon icon={faPhoneSlash} onClick={this.closeVideoCall} />
                                </div>
                              </div>
                              <div className="col"></div>
                            </div>                              
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                    ) : (
                        <div className="container">
                            <div className="row">
                              <div className="col-12">
                                This is the meeting room. Please share the above url for other people to join this room. You can start the meeting by clicking on the button below
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                We need to access your camera and mic for the video conferencing to work so kindly click on ok when the browser asks you for permission
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-4">
                                <div className="join-button" onClick={this.joinRoom}>JOIN</div>
                              </div>
                            </div>
                            
                        </div>
                    )}                    
                </MainStyle>
            </Fragment>
            
        )
    }
}