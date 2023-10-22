// folosim fs -> pt a citi din baza de date si a scrie in baza de date
// folosim commander -> pt a lua informatie de la utilizator prin intermediul terminalului
// folosim path -> scriem un path care sa mearga pe orice calculator (noi o sa il folosim pt path catre db)
// folosim __dirname -> pt a localiza de unde este executat fisierul

const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);
function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file!", err);
      return;
    }

    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  if (!contactId) {
    console.error("Please write a contactId!");
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error on reading file!");
      return;
    }
    const contacts = JSON.parse(data);

    if (contacts[contactId]) {
      console.log(`Details for contact at index ${contactId}:`);
      console.table(contacts[contactId]);
    } else {
      console.log(`Contact at index ${contactId} does not exist!`);
    }
  });
}
function removeContact(contactId) {
  if (contactId === undefined) {
    console.error(
      "Please provide the index of the contact you want to remove!"
    );
    return;
  }
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.log("Error reading file!");
      return;
    }

    const contacts = JSON.parse(data);
    if (!contacts[contactId]) {
      console.log(`Contact at index ${contactId} does not exist!`);
      return;
    }
    contacts.splice(contactId, 1);
    console.log(`Contact at index ${contactId} was deleted!`);
    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.error("Error on deleting contact!");
        return;
      }
    });
  });
}

function addContact(name, email, phone) {
  if (!name) {
    console.error("Please add a contact!");
    return;
  }

  // citire din db
  fs.readFile(contactsPath, "utf-8", (error, data) => {
    if (error) {
      console.error("Error on reading file!", error);
      return;
    }

    const contacts = JSON.parse(data);
    const newContact = {
      id: String(Date.now()),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);

    console.table(contacts);

    fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (error) => {
      if (error) {
        console.err("Error on adding contact!");
        return;
      }
      console.log("Contact added!");
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
