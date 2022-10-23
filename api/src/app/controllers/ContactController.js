import ContactsRepository from '../repositories/ContactsRepository.js';

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const Contacts = await ContactsRepository.findAll(orderBy);
    response.json(Contacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const existsContact = await ContactsRepository.findById(id);

    if (!existsContact) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    response.json(existsContact);
  }

  async store(request, response) {
    let {
      name, email, phone, birth, category_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'email is required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'phone is required' });
    }

    if (!birth) {
      return response.status(400).json({ error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();

    const existsContact = await ContactsRepository.findByEmail(email);

    if (existsContact) {
      return response.status(400).json({ error: 'This e-amail is already in use' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, birth, category_id,
    });

    response.json(contact);
  }

  async update(request, response) {
    let {
      name, email, phone, birth, category_id,
    } = request.body;
    const { id } = request.params;

    const existsContacts = await ContactsRepository.findById(id);

    if (!existsContacts) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'email is required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'phone is required' });
    }

    if (!birth) {
      return response.status(400).json({ error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();

    const emailUpdated = await ContactsRepository.findByEmail(email);

    if (emailUpdated && emailUpdated.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, birth, category_id,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const findContact = await ContactsRepository.findById(id);
    
    if(!findContact){
      return response.status(404).json({errpr: 'Contact not found'})
    }

    await ContactsRepository.delete(id);
    response.sendStatus(200);
  }
}

export default new ContactController();
