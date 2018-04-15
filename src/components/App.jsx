import React, { Component } from 'react';
import { connect } from 'react-redux';
import Topbar from './Topbar';
import Contact from './Contact';
import Form from './Form';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleSubmit = open => {
    this.setState({ open: open });
  };

  render() {
    return (
      <div>
        <Topbar />
        <div
          style={{
            height: '700px',
            overflowY: 'auto'
          }}
        >
          {this.props.contacts.map((contact, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'inline-block',
                  marginLeft: '4%'
                }}
              >
                <Contact contact={contact} />
              </div>
            );
          })}
        </div>
        <Form onSubmit={this.handleSubmit} open={this.state.open} />
        <FloatingActionButton
          backgroundColor="#B58D3D"
          onClick={() => this.setState({ open: true })}
          style={{
            position: 'absolute',
            right: '2%',
            bottom: '2%'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    contacts: state
  };
}

export default connect(mapStateToProps, null)(App);
