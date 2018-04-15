import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SEARCH_CONTACT,
  EDIT_CONTACT
} from '../constants';

const contact = action => {
  let { image, name, mail, phone } = action;
  return {
    id: Math.random(),
    image,
    name,
    mail,
    phone
  };
};

const removeById = (state = [], id) => {
  const contacts = state.filter(contact => contact.id !== id);
  return contacts;
};

const editById = (state = [], id, name, mail, phone) => {
  const contacts = state.map(contact => {
    return contact.id === id
      ? Object.assign({}, contact, { name: name, mail: mail, phone: phone })
      : contact;
  });
  return contacts;
};

const searchByQuery = (state = [], query) => {
  const contacts = state.filter(
    contact => contact.name.match(new RegExp(query, 'i')) !== null
  );
  return contacts;
};

const contacts = (state = [], action) => {
  let contacts = null;
  state = JSON.parse(localStorage.getItem('contacts') || '[]');
  switch (action.type) {
    case ADD_CONTACT:
      contacts = [...state, contact(action)];
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    case DELETE_CONTACT:
      contacts = removeById(state, action.id);
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    case SEARCH_CONTACT:
      contacts = searchByQuery(state, action.query);
      return contacts;
    case EDIT_CONTACT:
      contacts = editById(
        state,
        action.id,
        action.name,
        action.mail,
        action.phone
      );
      localStorage.setItem('contacts', JSON.stringify(contacts));
      return contacts;
    default:
      return state;
  }
};

export default contacts;
