import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ACTIONS } from './constants';

class Chatroom extends React.Component {
  static propTypes = {
    userName: PropTypes.string,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

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
      </div>
    );
  }
}

const mapStateToProps = ({ userName, loading }) => ({ userName, loading });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    signout: () => ({ type: ACTIONS.USER_SINGOUT_REQUESTED }),
  }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chatroom);
