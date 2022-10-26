import ContactsRepository from '../repositories/ContactsRepository.js';
import CategorieRepository from '../repositories/CategoriesRepository.js';


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
      name, email, phone, birth, categoryId,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'phone is required' });
    }

    if (!birth) {
      return response.status(400).json({ error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();

    const existsNameContact = await ContactsRepository.findByName(name);
    if (existsNameContact) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const existsEmailContact = await ContactsRepository.findByEmail(email);
    if (existsEmailContact) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    }

    const existsPhoneContact = await ContactsRepository.findByPhone(phone);
    if (existsPhoneContact) {
      return response.status(400).json({ error: 'This phone is already in use' });
    }

    const existsCategoryContact = await CategorieRepository.findById(categoryId)
    if (!existsCategoryContact) {

      return response.status(400).json({ error: 'This categoryID not exists' });
    }


    const contact = await ContactsRepository.create({
      name, email, phone, birth, categoryId,
    });

    response.json(contact);
  }

  async update(request, response) {
    let {
      name, email, phone, birth, categoryId,
    } = request.body;
    const { id } = request.params;

    const existsContacts = await ContactsRepository.findById(id);

    if (!existsContacts) {
      return response.status(400).json({ error: 'Contact not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'phone is required' });
    }

    if (!birth) {
      return response.status(400).json({ error: 'birth is required' });
    }

    name = name.toUpperCase();
    email = email.toUpperCase();

    const nameUpdated = await ContactsRepository.findByName(name);

    if (nameUpdated && nameUpdated.id !== id) {
      return response.status(400).json({ error: 'This name is already in use' });
    }

    const emailUpdated = await ContactsRepository.findByEmail(email);

    if (emailUpdated && emailUpdated.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already in use' });
    } 

    const phoneUpdated = await ContactsRepository.findByEmail(phone);

    if (phoneUpdated && emailUpdated.id !== id) {
      return response.status(400).json({ error: 'This phone is already in use' });
    }

    const categoryUpdated = await ContactsRepository.findByCategoryId(categoryId);

    if (categoryUpdated && categoryUpdated.categoryId !== categoryId) {
      return response.status(400).json({ error: 'This phone is already in use' });
    }


    const contact = await ContactsRepository.update(id, {
      name, email, phone, birth, categoryId,
    });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;

    const findContact = await ContactsRepository.findById(id);
    
    if(!findContact){
      return response.status(404).json({error: 'Contact not found'})
    }

    await ContactsRepository.delete(id);
    response.sendStatus(200);
  }
}

export default new ContactController();
