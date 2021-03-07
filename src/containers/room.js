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
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...RoomActions, ...SocketActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room)