import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchContact } from '../actions';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    };
  }

  render() {
    this.props.searchContact(this.state.query);
    return (
      <AppBar
        title="Contact Manager"
        style={{ backgroundColor: 'black', opacity: '0.8' }}
        iconElementRight={
          <TextField
            hintText="Search Contacts"
            hintStyle={{ color: 'gray' }}
            inputStyle={{ color: 'white' }}
            onChange={event => this.setState({ query: event.target.value })}
          />
        }
      />
    );
  }
}

export default connect(null, { searchContact })(Topbar);
