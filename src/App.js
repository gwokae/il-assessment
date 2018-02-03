import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ACTIONS } from './constants';

class App extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    actions: PropTypes.object.isRequired,
  };
  static defaultState = {
    userName: '',
  }
  constructor(props) {
    super(props);

    this.state = { ...App.defaultState };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getChat() {
    const {actions, userName} = this.props;
    return (
      <div>
        <h1>Hello {userName}</h1>
        <button onClick={actions.signout}>Sign out</button>
      </div>
    );
  }
  getSingin() {
    return (
      <div>
        <h1>Singin chat</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='userName'>
            Your name:
            <input
              id='userName'
              name='userName'
              value={this.state.userName}
              onChange={({ target: { value: userName } }) => (this.setState({ userName })) }
              placeholder='Enter your name here'
            />
          </label>
          <input type='submit' value='Singin' disabled={this.state.userName.trim() === '' }/>
        </form>
      </div>
    );
  }
  render() {
    return (
      this.props.userName ?
        this.getChat() :
        this.getSingin()
    );
  }
  handleSubmit(e) {
    e.preventDefault();
    const userName = new FormData(e.target).get('userName').trim();
    this.props.actions.singin(userName);
    this.setState({ ...App.defaultState });
  }
}


const mapStateToProps = ({ userName }) => ({ userName });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    singin: (userName) => ({ type: ACTIONS.USER_SINGIN_REQUESTED, userName }),
    signout: () => ({ type: ACTIONS.USER_SINGOUT_REQUESTED })
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
