const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./dd/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  contactId = String(contactId);
  const contacts = await listContacts();
  const findContact = await contacts.find(
    (contact) => contact.id === contactId
  );
  return findContact || null;
};

const removeContact = async (contactId) => {
  contactId = String(contactId);
  const contacts = await listContacts();
  const contactIndex = await contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [result] = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const bookData = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(bookData);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return bookData;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
