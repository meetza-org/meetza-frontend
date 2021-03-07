import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Main from '../components/main';
import * as SocketActions from '../actions/socket';


const mapStateToProps = state => ({
  userEmailId: state.user.userEmailId,
  isUserLoggedIn: state.user.isUserLoggedIn,
  firstName: state.user.firstName,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...SocketActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)