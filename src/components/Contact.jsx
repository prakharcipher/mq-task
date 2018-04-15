import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteContact, editContact } from '../actions';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Flipcard from '@kennethormandy/react-flipcard';
import '@kennethormandy/react-flipcard/dist/Flipcard.css';

const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flipped: false,
      name: this.props.contact.name,
      mail: this.props.contact.mail,
      phone: this.props.contact.phone,
      errName: '',
      errMail: '',
      errPhone: ''
    };
  }

  deleteContact(id) {
    this.props.deleteContact(id);
  }

  handleClick(id) {
    if (this.state.name === '') {
      this.setState({ errName: 'Please provide a Name' });
      return null;
    } else this.setState({ errName: '' });
    if (this.state.mail === '') {
      this.setState({ errMail: 'Please provide an E-mail' });
      return null;
    } else this.setState({ errMail: '' });
    if (this.state.phone === '') {
      this.setState({ errPhone: 'Please provide a Phone No.' });
      return null;
    } else this.setState({ errPhone: '' });

    if (re.test(this.state.mail) === false) {
      this.setState({ errMail: 'Invalid E-mail address' });
      return null;
    } else this.setState({ errMail: '' });
    if (this.state.phone.length !== 10) {
      this.setState({ errPhone: 'Invalid Phone No.' });
      return null;
    } else this.setState({ errPhone: '' });

    this.props.editContact(
      id,
      this.state.name,
      this.state.mail,
      this.state.phone
    );
    this.setState({ flipped: false });
  }

  render() {
    return (
      <div
        style={{
          width: '280px',
          height: '300px',
          marginTop: '10%'
        }}
      >
        <Flipcard flipped={this.state.flipped}>
          <div
            style={{
              backgroundColor: '#eff5f5',
              height: '300px',
              width: '280px',
              margin: 'auto',
              borderRadius: '50%',
              border: '4px solid #B58D3D'
            }}
          >
            <img
              src={this.props.contact.image}
              alt="profile"
              style={{
                border: '2px solid black',
                borderRadius: '50%',
                width: '100px',
                height: '100px',
                marginLeft: '31%',
                marginTop: '8%'
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '2%' }}>
              <div style={{ fontSize: '20px' }}>
                <b>{this.props.contact.name}</b>
              </div>
              <br />
              <div style={{ fontSize: '18px' }}>
                <em>{this.props.contact.mail}</em>
              </div>
              <br />
              <div>{this.props.contact.phone}</div>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '0px'
              }}
            >
              <RaisedButton
                label="Edit"
                backgroundColor="#55CBD9"
                labelColor="white"
                onClick={() => this.setState({ flipped: true })}
                style={{ width: '140px' }}
              />
              <RaisedButton
                label="Delete"
                labelColor="white"
                backgroundColor="#55CBD9"
                onClick={() => this.deleteContact(this.props.contact.id)}
                style={{ width: '140px' }}
              />
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'powderblue',
              height: '300px',
              width: '280px',
              margin: 'auto',
              borderRadius: '5%'
            }}
          >
            <div style={{ width: '280px', marginLeft: '10px' }}>
              <TextField
                errorText={this.state.errName}
                defaultValue={this.state.name}
                floatingLabelText="Full-Name"
                onChange={event => this.setState({ name: event.target.value })}
              />
              <br />
              <TextField
                errorText={this.state.errMail}
                defaultValue={this.state.mail}
                floatingLabelText="E-mail"
                onChange={event => this.setState({ mail: event.target.value })}
              />
              <br />
              <TextField
                errorText={this.state.errPhone}
                defaultValue={this.state.phone}
                floatingLabelText="Contact No."
                onChange={event => this.setState({ phone: event.target.value })}
              />
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '0px'
              }}
            >
              <RaisedButton
                label="Change"
                labelColor="white"
                backgroundColor="#304B78"
                onClick={() => this.handleClick(this.props.contact.id)}
                style={{ width: '280px' }}
              />
            </div>
          </div>
        </Flipcard>
      </div>
    );
  }
}

export default connect(null, { deleteContact, editContact })(Contact);
