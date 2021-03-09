import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../header';
import Login from '../../containers/login';
import Register from '../../containers/register';
import Main from '../../containers/main';
import Room from '../../containers/room';
import { createWebSocketConnection } from '../../helpers/socket';

const AppWrapper = styled.div`
  .form-control:focus{
    box-shadow: none;
    &::-webkit-scrollbar {
      width: 5px;
    }
    
    &::-webkit-scrollbar-track {
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background-color: black;
    }
  }
`;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ 
      props => rest.isLoggedIn ? <Component {...props} /> : <Redirect to={{pathname: '/login', state: { from: props.location }}} />
    }
  />
);

class App extends Component {
  constructor(props){
    super(props);
    console.log("Connecting to Socket");
    const socket = createWebSocketConnection('room');
    console.log("Before On");
    socket.on("connect", () => {
      console.log("Connected to Socket");
      this.props.initializeSocket(socket);
    });
  }

  render() {
    const {isUserLoggedIn} = this.props;
    return (
      <AppWrapper className="App">
        <Header></Header>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />

          <PrivateRoute isLoggedIn={isUserLoggedIn} exact path='/' component={Main} />
          <PrivateRoute isLoggedIn={isUserLoggedIn} exact path='/room/:roomId' component={Room} />
        </Switch>
      </AppWrapper>
    );
  }
}

export default App;
