import {prismaClient}  from '../../database/prismaClient.js'

class CategoriesRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toLowerCase() === 'desc' ? 'desc' : 'asc';
    const categories = await prismaClient.category.findMany({
      orderBy: {
        name: direction,
      },
    })
    return categories;
  }

  async findById(id) {
    const category = await prismaClient.category.findFirst({
      where: {
        id,
      }
    })
    return category;
  }

  async findByName(name) {
    const category = await prismaClient.category.findFirst({
      where: {
        name,
      }
    })
    return category;
  }

  async create({
    name,
  }) {
   const category = await prismaClient.category.create({
    data: {
      name,
    },    
   })
   return category;
  }

  async update(id, {
    name, email, phone, birth, category_id,
  }) {
    const category = await prismaClient.category.update({
      where: {
        id,
      },
      data: {
        name,
        email, 
        phone,
        birth,
        category_id,
      },
    })
    return category;
  }

  async delete(id) {
    const deleteOP = await prismaClient.category.delete({
      where: {
        id,
      }
    })
    return deleteOP;
  }
}

export default new CategoriesRepository();
