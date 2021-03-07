import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import App from '../components/app';
import { withRouter } from 'react-router-dom';
import * as SocketActions from '../actions/socket';

const mapStateToProps = state => ({
  userEmailId: state.user.userEmailId,
  isUserLoggedIn: state.user.isUserLoggedIn,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...SocketActions }, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))