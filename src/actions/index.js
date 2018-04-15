import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SEARCH_CONTACT,
  EDIT_CONTACT
} from '../constants';

export const addContact = (image, name, mail, phone) => {
  const action = {
    type: ADD_CONTACT,
    image: image,
    name: name,
    mail: mail,
    phone: phone
  };
  return action;
};

export const deleteContact = id => {
  const action = {
    type: DELETE_CONTACT,
    id: id
  };
  return action;
};

export const searchContact = query => {
  const action = {
    type: SEARCH_CONTACT,
    query
  };
  return action;
};

export const editContact = (id, name, mail, phone) => {
  const action = {
    type: EDIT_CONTACT,
    id,
    name,
    mail,
    phone
  };
  return action;
};
