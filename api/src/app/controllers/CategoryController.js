import CategoriesRepository from '../repositories/CategoriesRepository.js';

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const categoryExists = await CategoriesRepository.findById(id);

    if (!categoryExists) {
      return response.status(400).json({ error: 'Category not exists' });
    }

    response.json(categoryExists);
  }

  async store(request, response) {
    let { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    name = name.toUpperCase();

    const existsCategory = await CategoriesRepository.findByName(name);

    if (existsCategory) {
      return response.status(400).json({ error: 'Category is already exists' });
    }

    const category = await CategoriesRepository.create({ name });

    response.json(category);
  }

  async update(request, response) {
    const { id } = request.params;
    let { name } = request.body;

    const existsCategory = await CategoriesRepository.findById(id);
    if (!existsCategory) {
      return response.status(400).json({ error: 'Category not find' });
    }

    if (!name) {
      return response.status(400).json({ error: 'name is required' });
    }

    name = name.toUpperCase();

    const existsNameCategory = await CategoriesRepository.findByName(name);
    if (existsNameCategory && existsNameCategory.id !== id) {
      return response.status(400).json({ error: 'This category is already in use' });
    }

    const category = await CategoriesRepository.update(id, { name });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;

    const findCategory = await CategoriesRepository.findById(id);
    
    if(!findCategory){
      return response.status(404).json({errpr: 'Category not found'})
    }

    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

export default new CategoryController();
