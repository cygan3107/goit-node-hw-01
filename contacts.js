const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const removeContactFromFile = (data, id) => {
  const allContacts = JSON.parse(data.toString());
  const index = allContacts.findIndex((contact) => contact.id === id);
  allContacts.splice(index, 1);
  return JSON.stringify(allContacts);
};

const addContactToFile = (data, name, email, phone) => {
  const allContacts = JSON.parse(data.toString());
  allContacts.push({
    name,
    email,
    phone,
  });
  return JSON.stringify(allContacts);
};

function listContacts() {
  fs.readFile(contactsPath).then((data) => {
    console.table(JSON.parse(data.toString()));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath).then((data) => {
    const allContacts = JSON.parse(data.toString());
    console.table(allContacts.find((contact) => contact.id === contactId));
  });
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const splicedContact = removeContactFromFile(contacts, contactId);
    await fs.writeFile(contactsPath, splicedContact);
    console.log("Contact has been deleted!");
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactAdded = addContactToFile(contacts, name, email, phone);
    await fs.writeFile(contactsPath, contactAdded);
    console.log("Contact has been added!");
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
