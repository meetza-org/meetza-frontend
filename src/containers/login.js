import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Login from '../components/login';
import * as UserActions from '../actions/user';


const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Login)