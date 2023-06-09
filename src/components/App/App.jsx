import { Component } from 'react';
import uniqid from 'uniqid';

import ContactList from '../ContactList/ContactList';
import { Form } from '../Form/Form';
import Filter from 'components/Filter/Filter';

export class App extends Component {
    state = {
    contacts: [],
    filter: '',
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  filterVisible = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  formSubmitHandle = data => {
    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = contacts.find(
        ({ name }) => name.toLowerCase() === data.name.toLowerCase()
      );

      if (newContact) {
        alert(`${data.name} is alredy in contacts`);
        return;
      } else {
        data = { ...data, id: uniqid() };
      }

      return { contacts: [...prevState.contacts, data] };
    });
  };

  deleteContact = id => {
    this.setState(prevState => {
      return (prevState.contacts = prevState.contacts.filter(
        contact => contact.id !== id
      ));
    });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
  this.setState({ contacts })
}
    ;
  }

  componentDidUpdate(prevProps) {
    
    if (prevProps.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const filterList = this.filterVisible();

    return (
      <div style={{ marginLeft: '100px' }}>
        <h1>Phonebook</h1>
        <Form onSubmitHandle={this.formSubmitHandle} />

        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.changeFilter} />
        <ContactList
          filterVisible={filterList}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
