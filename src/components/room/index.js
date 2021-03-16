import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneSlash, faMicrophone, faMicrophoneSlash, faVideo, faVideoSlash, faDesktop, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import * as R from 'ramda';
import { Spinner } from '../common'
import NotificationSystem from 'react-notification-system';

const style = {
  NotificationItem: { // Override the notification item
    DefaultStyle: { // Applied to every notification, regardless of the notification level
      height: 130,
      fontSize: '15px',
      backgroundColor: 'rgb(248 255 254)',
      boxShadow: 'rgb(54 156 199 / 90%) 0px 0px 4px 0px',
    }
  }
}
 
const MainStyle = styled.div`
.row{
    margin-top: 10px;
}

.bottom-row{
  position: fixed;
  bottom: 1rem;
  width: 100%;
  @media (max-width: 575.98px) { 
    bottom: 3rem;
  }
}

.join-button{
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
    
    @media (min-width: 576px) { 
      max-height: 350px;
    }

    @media (max-width: 575.98px) { 
      height: ${props => props.screenHeight - 70}px;
    }
  }

  .local-video-join{
    box-shadow: 0 0 7px 0px #1853bf;
    width: 100%;
    cursor:pointer;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    @media (max-width: 575.98px) { 
      position: fixed;
      bottom: 3rem;
      width: 30%;
    }
  }

  .local_video {
    box-shadow: 0 0 7px 0px #1853bf;
    width: 100%;
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  
  #hangup-button:disabled {
    filter: grayscale(50%);
    -webkit-filter: grayscale(50%);
    cursor: default;
  }
  
  .empty-container {
    grid-area: empty-container;
  }

  .inline-flex{
    display: inline-flex;
    justify-content: center;
    width: 100%;
  }

  .inline-flex-actions{
    display: inline-flex;
    justify-content: center;
    width: 100%;
    @media (max-width: 575.98px) { 
      position: fixed;
      bottom: 3rem;
      width: 31%;
      right: 1rem;
      display: block;
    }
    
  }

  .main-text{
    font-size: 24px;
    font-style: italic;
    color: #3a475a
    @media (max-width: 575.98px) { 
      font-size: 18px;
    }
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

  .notification-message{
    min-height: 35px;
  }

  .notifications-tr {
    right: 1rem !important;
  }

  .fullscreen-icon{
    cursor: pointer;
    color: #e6e6e6;
    svg {
      position: absolute;
      right: 0.5rem;
      top: 0.5rem;
    }
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

  @media (max-width: 575.98px) { 
    margin-bottom: 5px;
  }

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
const ActionButton = styled.div`
  width: 100px;
  text-align: center;
  padding: 5px;
  border-radius: 5px;
  margin: 10px 15px 0px 0px;
  cursor: pointer; 
  color: white;
  font-weight: 600; 
`;
const AcceptButton = styled(ActionButton)`
  background-image: linear-gradient(45deg,#00d3d6,#2183ff);
`;

const RejectButton = styled(ActionButton)`
  border: 1px solid #2183ff;
  color: #2183ff;
`;

const HangupStyle = styled(ButtonStyle)`
  background-image: linear-gradient(45deg,#ff6c44,#ff0000);
`;

const AudioButton = ({onClick, isMuted}) => 
  <AudioVideoButtonStyle isMuted={isMuted}>
    <FontAwesomeIcon onClick={onClick} icon={isMuted ? faMicrophoneSlash : faMicrophone} />
  </AudioVideoButtonStyle>

const VideoButton = ({onClick, isMuted}) =>
  <AudioVideoButtonStyle isMuted={isMuted}>
    <FontAwesomeIcon onClick={onClick} icon={isMuted ? faVideoSlash : faVideo} />
  </AudioVideoButtonStyle>  

const ShareScreenButton = ({onClick, isMuted}) =>
<AudioVideoButtonStyle isMuted={isMuted}>
  <FontAwesomeIcon onClick={onClick} icon={faDesktop} />
</AudioVideoButtonStyle>  

const HangupButton = ({onClick}) => 
<HangupStyle>
  <FontAwesomeIcon onClick={onClick} icon={faPhoneSlash} />
</HangupStyle>  


const ActionButtons = ({handleMuteUnmute, mediaConstraints, closeVideoCall, showHangup, handleScreenShare, isScreenShared}) => {
  return (
    <div className={showHangup ? "inline-flex-actions" : "inline-flex"}>
      <AudioButton onClick={() => handleMuteUnmute("audio")} isMuted={!mediaConstraints.audio}></AudioButton>
      <VideoButton onClick={() => handleMuteUnmute("video")} isMuted={!mediaConstraints.video}></VideoButton>
      {showHangup ? (
        <>
        <ShareScreenButton onClick={handleScreenShare} isMuted={isScreenShared} />
        <HangupButton onClick={closeVideoCall} />
        </>
      ) : null}
    </div> 
  )
}

const MeetingFactory = ({isHost, isMeetingStarted, startMeeting, requestToJoin, isWaiting, acceptOrReject}) => {
  if(isHost){
    return <div className="join-button" onClick={startMeeting}>Start Meeting</div>
  }
  else {
    if(isMeetingStarted){
      if(isWaiting){
        return (
          <div className="waiting-message">
            <Spinner />
            <div >Waiting for Host to accept.</div>
          </div>
        )
      }
      else{
        if(acceptOrReject !== null && acceptOrReject.action === "Rejected"){
          return(
            <div className="waiting-message">
              <div >Host has rejected your request to join this meeting.</div>
            </div>
          )
        }
        return <div className="join-button" onClick={requestToJoin}>Ask to Join</div>
      }
    }
    else {
      return (
        <div className="waiting-message">
          <Spinner />
          <div >Waiting for Host to start the meeting</div>
        </div>
      )
    }
  }
}

export default class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            roomId: null,
            isJoined: false,
            loader: false,
            isHost: false,
            recievedTracks: 0,//added to force render
            mediaConstraints : {
                audio: true, // We want an audio track
                video: true // ...and we want a video track
            },
            remoteVideoList: {},
            isScreenShared: false,
            primaryVideoEmail: null,
        }
        this.videoOffer = null;
        this.videoAnswer = null;
        this.iceCandidate = null;
        this.localVideoSrc = React.createRef();
        this.primaryRemoteVideoSrc = React.createRef();
        this.myPeerConnections = {};
        this.localStream = null;
        this.joinRequest = null;
        this.notificationSystem = React.createRef();
        this.newJoinee = null;
        this.acceptOrReject=null;
        this.isMeetingClosed=false;
        this.screenCaptureStream=null;
    }

    componentDidMount(){
        const { roomId } = this.props.match.params;
        this.setState({roomId: roomId});
        this.props.getRoomPermissions(roomId)
        .then( response => {
          if(roomId === response.payload.roomId){
            this.setState({
              loader: true,
              isHost: response.payload.permission === "host" ? true : false,
            });
          }
        }); 
        this.startLocalStream();
        
    }
    
    handleJoinRequest = msg => {
      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: "New Join Request",
        message: `${msg.firstName} has requested to join this meeting`,
        level: 'info',
        autoDismiss: 0,
        children: (
          <div className="inline-flex">
            <AcceptButton onClick={() => this.handleAccept(msg)}>Accept</AcceptButton>
            <RejectButton onClick={() => this.handleReject(msg)}>Reject</RejectButton>
          </div>
        )
      });
    };

    handleAccept = msg => {
      const {roomId} = this.state;
      this.props.sendSignal({
        roomId: roomId,
        type: "accept-or-reject",
        action: "Accepted",
        to: msg.emailId,
        emailId: this.props.userEmailId,
      });
      const notification = this.notificationSystem.current;
      notification.clearNotifications();
    }

    handleReject = msg => {
      const {roomId} = this.state;
      this.props.sendSignal({
        roomId: roomId,
        type: "accept-or-reject",
        action: "Rejected",
        to: msg.emailId,
      });
      const notification = this.notificationSystem.current;
      notification.clearNotifications();
    }

    startMeeting = () => {
      const { roomId } = this.state;
      this.props.sendSignal({
        type: "subscribe",
        emailId: this.props.userEmailId,
        roomId: roomId,
      }); 
      this.props.sendSignal({
        roomId: roomId,
        type: "started-meeting",
        emailId: this.props.userEmailId,
      });
      this.setState({isJoined: true});
      this.startLocalStream();
    }

    requestToJoin = () => {
      const { roomId } = this.state;
      this.props.sendSignal({
        roomId: roomId,
        type: "join-request",
        firstName: this.props.firstName,
        emailId: this.props.userEmailId,
      });
    }

    startLocalStream = () => {
      const { mediaConstraints } = this.state;
      navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(localStream => {
          this.localVideoSrc.current.srcObject = localStream;
          this.localStream = localStream;
      })
      .catch(this.handleGetUserMediaError);
    }

    createPeerConnection = emailId => {
      this.myPeerConnections[emailId] = new RTCPeerConnection({
          iceServers: [
            {
              urls: `turn:${process.env.REACT_APP_COTURN_URL}`,
              username: `${process.env.REACT_APP_COTURN_USERNAME}`,
              credential: `${process.env.REACT_APP_COTURN_PASSWORD}`
            }
          ]
      });
      // this.localStream.getTracks().forEach(track => {
      //   this.myPeerConnections[emailId].sender = this.myPeerConnections[emailId].addTrack(track, this.localStream);
      // });
      this.addPeerConnectionEvents(emailId);
    }

    addPeerConnectionEvents = emailId => {
      let {remoteVideoList} = this.state;
      this.myPeerConnections[emailId].onicecandidate = this.handleICECandidateEvent;
      this.myPeerConnections[emailId].ontrack = event => this.handleTrackEvent(emailId, event);
      //this.myPeerConnections[emailId].onnegotiationneeded = () => this.handleNegotiationNeededEvent(emailId);
      //this.myPeerConnections[emailId].connectionstatechange = () => console.log(this.myPeerConnections[emailId])
      //this.myPeerConnections[emailId].onremovetrack = event => this.handleRemoveTrackEvent(emailId, event);
      //this.myPeerConnections[emailId].oniceconnectionstatechange = this.handleICEConnectionStateChangeEvent;
      //this.myPeerConnections[emailId].onicegatheringstatechange = this.handleICEGatheringStateChangeEvent;
      //this.myPeerConnections[emailId].onsignalingstatechange = this.handleSignalingStateChangeEvent;
      if(this.myPeerConnections[emailId].sender != null){
        this.localStream.getTracks().forEach(t => this.myPeerConnections[emailId].sender.replaceTrack(t).catch(e => console.log(e))); 
      }
      else{
        this.localStream.getTracks().forEach(track => {
          this.myPeerConnections[emailId].sender = this.myPeerConnections[emailId].addTrack(track, this.localStream);
        });
      }
      remoteVideoList[emailId] = React.createRef()
      this.setState({
        remoteVideoList: remoteVideoList
      })
    }

    handleInvitationAccepted = () => {
      const { roomId } = this.state;
      this.props.sendSignal({
        roomId: roomId,
        type: "join-room",
        emailId: this.props.userEmailId,
        firstName: this.props.firstName,
      });
      this.setState({isJoined: true});
      this.startLocalStream();
    }

    handleVideoAnswerMsg = ({emailId, sdp}) => {   
      console.log("############### Video Answer Room ######################");
      var desc = new RTCSessionDescription(sdp);
      this.myPeerConnections[emailId].setRemoteDescription(desc)
      .catch(() => console.log("!!!!!!!!!!!!!!!!! VIDEO ANSWER ERROR !!!!!!!!!!!!!!!!!!!!!"));
      console.log("############### Video Answer Room Complete ######################");
      console.log("################# Final Peer ##################################");
      console.log(this.myPeerConnections[emailId]);
      console.log("################# Final Peer ##################################");
    }

    handleVideoOfferMsg = ({emailId, sdp }) => {
      this.createPeerConnection(emailId);
      const desc = new RTCSessionDescription(sdp);
      let { roomId } = this.state;
      this.myPeerConnections[emailId].setRemoteDescription(desc)
      .then(() => this.myPeerConnections[emailId].createAnswer())
      .then(answer => this.myPeerConnections[emailId].setLocalDescription(answer))
      .then(() => {
        this.props.sendSignal({
          roomId: roomId,
          type: "video-answer",
          sdp: this.myPeerConnections[emailId].localDescription,
          emailId: this.props.userEmailId,
          targetEmailId: emailId,
        });
      })
      .catch(this.handleGetUserMediaError);
      console.log("################# Final Peer ##################################");
      console.log(this.myPeerConnections[emailId]);
      console.log("################# Final Peer ##################################");
    }

    handleNewICECandidateMsg = ({emailId, candidate}) => {
      let newCandidate = new RTCIceCandidate(candidate);
      console.log("####################### New ICE Candidate ##########################");
      console.log(newCandidate);
      console.log("####################### New ICE Candidate ##########################");
      this.myPeerConnections[emailId].addIceCandidate(newCandidate)
        .catch(() => console.log("!!!!!!!!!!!!!!!!! ICE ERROR !!!!!!!!!!!!!!!!!!!!!"));
    }

    handleICECandidateEvent = event => {
      if (event.candidate) {
        const { roomId } = this.state;
        this.props.sendSignal({
          roomId: roomId,
          type: "new-ice-candidate",
          candidate: event.candidate,
          emailId: this.props.userEmailId,
        });
      }
    }

    handleTrackEvent = (emailId, event) => {
      let {remoteVideoList} = this.state;
      if(remoteVideoList[emailId].current != null){
        remoteVideoList[emailId].current.srcObject = event.streams[0];
        this.setState({
          remoteVideoList: remoteVideoList,
        })
      } 
      if(this.primaryRemoteVideoSrc.current.srcObject === null){
        this.primaryRemoteVideoSrc.current.srcObject = event.streams[0];
        this.primaryRemoteVideoSrc.current.name = emailId;
      }
      else{
        if(this.primaryRemoteVideoSrc.current.name === emailId){
          this.primaryRemoteVideoSrc.current.srcObject = event.streams[0];
        }
      }
    }

    handleNegotiationNeededEvent = emailId => {
        const { roomId } = this.state;
        this.myPeerConnections[emailId].createOffer()
        .then(offer => this.myPeerConnections[emailId].setLocalDescription(offer))
        .then(() => {
            this.props.sendSignal({
                roomId: roomId,
                type: "video-offer",
                sdp: this.myPeerConnections[emailId].localDescription,
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
    }

    closeVideoCall = () => {   
      R.map(this.handleCloseVideoCall, R.keys(this.state.remoteVideoList))
      if (this.localVideoSrc.current !== null && this.localVideoSrc.current.srcObject !== null) {
        this.localVideoSrc.current.srcObject.getTracks().forEach(track => track.stop());
        this.localVideoSrc = React.createRef();
      }
      this.myPeerConnections = {};
      this.setState({
        remoteVideoList: {},
        isJoined: false,
      });
      if(this.state.isHost){
        this.props.sendSignal({
          roomId: this.state.roomId,
          type: "close-meeting",
          emailId: this.props.userEmailId,
        });
      }
    }

    handleCloseVideoCall = emailId => {
      if (this.myPeerConnections[emailId]) {
        this.myPeerConnections[emailId].ontrack = null;
        this.myPeerConnections[emailId].onremovetrack = null;
        this.myPeerConnections[emailId].onremovestream = null;
        this.myPeerConnections[emailId].onicecandidate = null;
        this.myPeerConnections[emailId].oniceconnectionstatechange = null;
        this.myPeerConnections[emailId].onsignalingstatechange = null;
        this.myPeerConnections[emailId].onicegatheringstatechange = null;
        this.myPeerConnections[emailId].onnegotiationneeded = null;
    
        if (this.state.remoteVideoList[emailId].current !=null && this.state.remoteVideoList[emailId].current.srcObject) {
          this.state.remoteVideoList[emailId].current.srcObject.getTracks().forEach(track => track.stop());
          this.state.remoteVideoList[emailId] = null
        }
        
        this.myPeerConnections[emailId].close();
        this.myPeerConnections[emailId] = null;
      }
    }

    componentDidUpdate(prevProps){
      const {props} = this;
      if(props.videoOffer !== this.videoOffer){
        this.videoOffer = props.videoOffer;
        this.handleVideoOfferMsg(props.videoOffer)
      }
      if(props.iceCandidate !== this.iceCandidate){
        this.iceCandidate = props.iceCandidate;
        this.handleNewICECandidateMsg(props.iceCandidate)
      }
      if(props.videoAnswer !== this.videoAnswer){
        this.videoAnswer = props.videoAnswer;
        this.handleVideoAnswerMsg(props.videoAnswer);
      }
      if(props.joinRequest !== this.joinRequest){
        this.joinRequest = props.joinRequest;
        this.handleJoinRequest(props.joinRequest)
      }
      if(props.newJoinee !== this.newJoinee){
        this.newJoinee = props.newJoinee;
        this.handleNewJoinee(props.newJoinee);
      }
      if(props.acceptOrReject !== this.acceptOrReject){
        this.acceptOrReject = props.acceptOrReject;
        if(props.acceptOrReject.action === "Accepted"){
          this.handleInvitationAccepted(props.acceptOrReject)
        }
      }
      if(props.isMeetingClosed !== this.isMeetingClosed){
        this.isMeetingClosed = props.isMeetingClosed;
        this.closeVideoCall();
      }
      if(props.isSocketConnected === true && prevProps.isSocketConnected !== props.isSocketConnected){
        props.sendSignal({
          type: "subscribe",
          emailId: this.props.userEmailId,
          roomId: this.state.roomId,
        }); 
      }
    }

    handleNewJoinee = ({firstName, emailId}) => {
      const { roomId } = this.state;
      this.createPeerConnection(emailId);
      this.myPeerConnections[emailId].createOffer()
      .then(offer => this.myPeerConnections[emailId].setLocalDescription(offer))
      .then(() => {
          this.props.sendSignal({
              roomId: roomId,
              type: "video-offer",
              sdp: this.myPeerConnections[emailId].localDescription,
              emailId: this.props.userEmailId,
              to: emailId,
            })
      })
      .catch(() => console.log('Error Occured'));

      const notification = this.notificationSystem.current;
      notification.addNotification({
        title: "New Entry",
        message: `${firstName} has joined this meeting`,
        level: 'success',
        autoDismiss: 5,
      });
    }

    handleMuteUnmute = kind => {
      let {mediaConstraints} = this.state;
      mediaConstraints[kind] = !mediaConstraints[kind];
      if(this.localStream){
        this.localStream.getTracks().forEach(track => {
          if(track.kind === kind){
            track.enabled = mediaConstraints[kind] 
          }
        });
        if (this.localVideoSrc.current.srcObject) {
          this.localVideoSrc.current.srcObject = this.localStream;
          this.localStream.getTracks().forEach(t => R.map(key => this.myPeerConnections[key].sender.replaceTrack(t).catch(e => console.log(e)), R.keys(this.myPeerConnections))); 
        }
      }
      this.setState({mediaConstraints: mediaConstraints});
    }

    handleVideoClick = emailId => {
      this.primaryRemoteVideoSrc.current.name = emailId;
      this.primaryRemoteVideoSrc.current.srcObject = this.state.remoteVideoList[emailId].current.srcObject;
      this.setState({primaryVideoEmail: emailId})
    }

    handleVideoListDisplay = key => {
      let display = "";
      if(this.primaryRemoteVideoSrc.current && this.primaryRemoteVideoSrc.current.name === key){
        display = "none";
      }
      return (
        <div key={key} style={{display: display}} className="col-2">
          <video id="received_video" className="local-video-join" style={{display: display}} onClick={() => this.handleVideoClick(key)} ref={R.prop(key, this.state.remoteVideoList)} autoPlay></video> 
        </div>
      )
    }

    startScreenShare = () => {
      navigator.mediaDevices.getDisplayMedia({
        cursor: 'always',
      })
      .then(localStream => {
        this.screenCaptureStream = localStream;
        debugger;
        this.screenCaptureStream.oninactive = this.stopScreenShare;
        this.screenCaptureStream.getTracks().forEach(t => R.map(key => this.myPeerConnections[key].sender.replaceTrack(t).catch(e => console.log(e)), R.keys(this.myPeerConnections))); 
      })
      .catch(this.handleGetUserMediaError);
    }

    stopScreenShare = () => {
      if(this.screenCaptureStream != null){
        this.screenCaptureStream.getTracks().forEach(t => t.stop());
        this.screenCaptureStream = null;
        this.setState({isScreenShared: false});
        this.localStream.getVideoTracks().forEach(t => R.map(key => this.myPeerConnections[key].sender.replaceTrack(t).catch(e => console.log(e)), R.keys(this.myPeerConnections)));  
      }
    }

    handleScreenShare = () => {
      let {isScreenShared} = this.state;
      isScreenShared = !isScreenShared;
      if(isScreenShared === true){
        this.startScreenShare();
      }else{
        this.stopScreenShare()
      }
      this.setState({isScreenShared});
    }

    handleFullScreen = () => {
      if (this.primaryRemoteVideoSrc.current.requestFullscreen) {
        this.primaryRemoteVideoSrc.current.requestFullscreen();
      } else if (this.primaryRemoteVideoSrc.current.webkitRequestFullscreen) { /* Safari */
        this.primaryRemoteVideoSrc.current.webkitRequestFullscreen();
      } else if (this.primaryRemoteVideoSrc.current.msRequestFullscreen) { /* IE11 */
        this.primaryRemoteVideoSrc.current.msRequestFullscreen();
      }
    }

    render(){
        const {mediaConstraints, loader, isHost, isMeetingStarted, isScreenShared } = this.state;
        const {height, width} = window.screen
        return(
            <Fragment>
                <MainStyle screenHeight={height} screenWidth={width}>
                    {this.state.isJoined ? (
                      <div className="">
                        <div className="row" id="camera-container">
                          <div className="col"></div>
                          <div className="col-12 col-sm-6 remote-video-bg">
                              <div className="fullscreen-icon" onClick={this.handleFullScreen}>
                                <FontAwesomeIcon icon={ faExpand } />
                              </div>
                              <video id="received_video" ref={this.primaryRemoteVideoSrc} autoPlay></video>
                          </div>
                          <div className="col"></div>
                        </div>
                        <div className="row">
                          <div className="col-2">
                            <video className="local-video-join" id="local_video" ref={this.localVideoSrc} autoPlay muted></video>
                          </div>
                          { !R.isEmpty(this.state.remoteVideoList) ? R.map(this.handleVideoListDisplay, R.keys(this.state.remoteVideoList)) : null }
                        </div>
                        <div className="row bottom-row">
                          <div className="col"></div>
                          <div className="col-12 col-md-6">
                            <ActionButtons handleScreenShare={this.handleScreenShare} isScreenShared={isScreenShared} showHangup={true} handleMuteUnmute={this.handleMuteUnmute} mediaConstraints={mediaConstraints} closeVideoCall={this.closeVideoCall}></ActionButtons>                       
                          </div>
                          <div className="col"></div>
                        </div>
                      </div>
                    ) : (
                        <div className="container">
                            <div className="row">
                              <div className="col-12 main-text">
                                This is the meeting room. Please share the above url for other people to join this room. You can start the meeting by clicking on the button below.
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12 col-sm-3">
                                <div className="row">
                                  <div className="col-4">
                                    {loader ? <MeetingFactory acceptOrReject={this.props.acceptOrReject} isWaiting={this.props.isWaiting} isHost={isHost} isMeetingStarted={this.props.isMeetingStarted} startMeeting={this.startMeeting} requestToJoin={this.requestToJoin} /> : (
                                      <div className="waiting-message">
                                        <Spinner />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-sm-9">
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <video className="local_video" id="local_video" ref={this.localVideoSrc} autoPlay muted></video>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-md-6">
                                    <ActionButtons showHangup={false} handleMuteUnmute={this.handleMuteUnmute} mediaConstraints={mediaConstraints}></ActionButtons>                       
                                  </div>
                                </div>
                              </div>
                            </div>
                        </div>
                    )}       
                    <NotificationSystem ref={this.notificationSystem} style={style} />             
                </MainStyle>
            </Fragment>
            
        )
    }
}