import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Register from '../components/register';
import * as UserActions from '../actions/user';


const mapDispatchToProps = dispatch => bindActionCreators(UserActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Register)