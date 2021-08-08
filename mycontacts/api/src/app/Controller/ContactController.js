const ContactsRepository = require('../Repository/ContactsRepository');

class ContactsController {
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const existsContact = await ContactsRepository.findById(id);
    if (!existsContact) {
      return response.status(400).json({ error: 'This Contact not exists' });
    }
    if (!id) {
      return response.status(400).json({ error: 'ID is required' });
    }
    response.json(existsContact);
  }

  async store(request, response) {
    const {
      name, email, phone, birth, category_id,
    } = request.body;
    const nameUpper = name.toUpperCase();
    const emailUpper = email.toUpperCase();
    const existsContact = await ContactsRepository.findByEmail(emailUpper);
    if (existsContact) {
      return response.status(400).json({ error: 'This E-mail is alread in use' });
    }
    if (!nameUpper) {
      return response.json(400).json({ error: 'NAME is required' });
    }
    if (!phone) {
      return response.json(400).json({ error: 'PHONE is required' });
    }
    if (!birth) {
      return response.json(400).json({ error: 'BIRTH is required' });
    }
    const contact = await ContactsRepository.create({
      name, email, phone, birth, category_id,
    });
    response.json(contact);
  }

  async update(request, response) {
    const {
      name, email, phone, birth, category_id,
    } = request.body;
    const { id } = request.params;
    const existsContact = await ContactsRepository.findById(id);
    const nameUpper = name.toUpperCase();
    const emailUpper = email.toUpperCase();
    if (!existsContact) {
      return response.status(400).json({ error: 'This Contacts does not exists' });
    }
    if (!nameUpper) {
      return response.json(400).json({ error: 'NAME is required' });
    }
    if (!phone) {
      return response.json(400).json({ error: 'PHONE is required' });
    }
    if (!birth) {
      return response.json(400).json({ error: 'BIRTH is required' });
    }
    const existsEmail = await ContactsRepository.findByEmail(emailUpper);
    if (existsEmail && existsEmail.id !== id) {
      return response.status(400).json({ error: 'This E-mail is already in use' });
    }
    const contact = await ContactsRepository.update(id, {
      name, email, phone, birth, category_id,
    });
    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const existsContact = await ContactsRepository.findById(id);
    if (!existsContact) {
      return response.status(400).json({ error: 'This contact not exist' });
    }
    await ContactsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactsController();
