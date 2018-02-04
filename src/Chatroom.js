import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ACTIONS } from './constants';
import { messageDb } from './data';

class Chatroom extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    messages: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);

    this.state = { message: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderMessageItem = this.renderMessageItem.bind(this);
    this.handleMessageRecieved = this.handleMessageRecieved.bind(this);
    this.tmpMessage = {};
    this.tmpMessageLastTimeoutId = 0;
  }
  componentDidMount() {
    messageDb.on('child_added', this.handleMessageRecieved);
  }
  componentWillUnmount() {
    messageDb.off('child_added', this.handleMessageRecieved);
  }
  handleMessageRecieved(snapshot) {
    this.tmpMessage[snapshot.key] = snapshot.val();
    if (this.tmpMessageLastTimeoutId) clearTimeout(this.tmpMessageLastTimeoutId);

    this.tmpMessageLastTimeoutId = setTimeout(() => {
      this.props.actions.dispatchMessages(this.tmpMessage);
      this.tmpMessage = {};
      this.tmpMessageLastTimeoutId = 0;
    }, 100);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.postMessage(this.state.message);
    this.setState({ message: '' });
  }
  renderMessages() {
    const { messages } = this.props;
    return (
      <ul>{Object.keys(messages).map(this.renderMessageItem)}</ul>
    );
  }
  renderMessageItem(msgId) {
    const { author, timestamp, message } = this.props.messages[msgId];
    return (
      <li key={msgId}>
        <span className='author'>{author}</span>
        <span className='time'>{new Date(timestamp).toLocaleString()}</span>
        <span className='message'>{message}</span>
      </li>
    );
  }
  renderForm() {
    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <input
          type='text'
          value={this.state.message}
          onChange={({ target: { value } }) => (this.setState({ message: value }))}
          placeholder='Enter your message here...'
        />
        <input type='submit' value='send' disabled={this.props.loading} />
      </form>
    );
  }
  renderNavi() {
    return (
      <nav>
        <ul>
          <li><h1>Hello Chatroom</h1></li>
          <li>{this.props.userName}</li>
          <li><button onClick={this.props.actions.signout}>Sing out</button></li>
        </ul>
      </nav>
    );
  }
  render() {
    return (
      <div>
        { this.renderNavi() }
        { this.renderForm() }
        { this.renderMessages() }
      </div>
    );
  }
}

const mapStateToProps = ({ userName, loading, messages }) => ({ userName, loading, messages });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    postMessage: message => ({ type: ACTIONS.POST_MESSAGE_REQUESTED, message }),
    dispatchMessages: messages => ({ type: ACTIONS.NEW_MESSAGES_RECEIVED, messages }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
