import {prismaClient} from '../../database/prismaClient.js'

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toLowerCase() === 'desc' ? 'desc' : 'asc';
    const contacts = await prismaClient.contact.findMany({
      orderBy: {
        name: direction, 
      }, 
      include:{
       categoryName:{
        select:{
          id: true, 
          name: true, 
        }
       }
      },
      

    })
    return contacts;
  }

  async findById(id) {
    const contact = await prismaClient.contact.findFirst({
      where: {
        id,
      }
    })
    return contact;
  }

  async findByName(name) {
    const contact = await prismaClient.contact.findFirst({
      where: {
        name,
      }
    })
    return contact;
  }


  async findByEmail(email) {
    const contact = await prismaClient.contact.findFirst({
      where: {
        email,
      }
    })
    return contact;
  }

  async findByPhone(phone) {
    const contact = await prismaClient.contact.findFirst({
      where: {
        phone,
      }
    })
    return contact;
  }

  async create({
    name, email, phone, birth, categoryId,
  }) {
   const contact = await prismaClient.contact.create({
    data: {
      name,
      email,
      birth,
      phone,
      categoryId,
    }
   })
   return contact;
  }

  async update(id, {
    name, email, phone, birth, categoryId,
  }) {
    const contact = await prismaClient.contact.update({
      where: {
        id,
      },
      data: {
        name,
        email, 
        phone,
        birth,
        categoryId,
      },
    })
    return contact;
  }

  async delete(id) {
    const deleteOP = await prismaClient.contact.delete({
      where: {
        id,
      }
    })
    return deleteOP;
  }
}

export default new ContactsRepository();
