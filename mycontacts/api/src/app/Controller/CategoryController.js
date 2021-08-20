const CategoriesRepository = require('../Repository/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const { orderBy } = request.query;
    const categories = await CategoriesRepository.findAll(orderBy);
    response.json(categories);
  }

  async show(request, response) {
    const { id } = request.params;
    const existsCategory = await CategoriesRepository.findById(id);
    if (!existsCategory) {
      return response.status(400).json({ error: 'This Category not exists' });
    }
  }

  async store(request, response) {
    const {
      name,
    } = request.body;
    const nameUpper = name.toUpperCase();
    const existsCategory = await CategoriesRepository.findByName(name);
    if (existsCategory) {
      return response.status(400).json({ error: 'This NAME is alread in use' });
    }
    if (!nameUpper) {
      return response.json(400).json({ error: 'NAME is required' });
    }
    const category = await CategoriesRepository.create({
      name,
    });
    response.json(category);
  }

  async update(request, response) {
    const {
      name,
    } = request.body;
    const { id } = request.params;
    const nameUpper = name.toUpperCase();
    const existsCategory = await CategoriesRepository.findById(id);
    if (!existsCategory) {
      return response.status(400).json({ error: 'This categories does not exists' });
    }
    if (!nameUpper) {
      return response.json(400).json({ error: 'NAME is required' });
    }
    const existsName = await CategoriesRepository.findByName(name);
    if (existsName && existsName.id !== id) {
      return response.status(400).json({ error: 'This E-mail is already in use' });
    }
    const category = await CategoriesRepository.update(id, {
      name,
    });
    response.json(category);
  }

  async delete(request, response) {
    const { id } = request.params;
    const existsCategory = await CategoriesRepository.findById(id);
    if (!existsCategory) {
      return response.status(400).json({ error: 'This Category not exist' });
    }
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new CategoryController();
