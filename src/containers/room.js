import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Room from '../components/room';
import * as RoomActions from '../actions/room';
import * as SocketActions from '../actions/socket';

const mapStateToProps = state => ({
  userEmailId: state.user.userEmailId,
  isUserLoggedIn: state.user.isUserLoggedIn,
  videoOffer: state.room.videoOffer,
  videoAnswer: state.room.videoAnswer,
  iceCandidate: state.room.iceCandidate,
  isSocketConnected: state.app.socket === null? false: true,
  isMeetingStarted: state.room.isMeetingStarted,
  firstName: state.user.firstName,
  joinRequest: state.room.joinRequest,
  isWaiting: state.room.isWaiting,
  newJoinee: state.room.newJoinee,
  acceptOrReject: state.room.acceptOrReject,
  isMeetingClosed: state.room.isMeetingClosed,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RoomActions, ...SocketActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)