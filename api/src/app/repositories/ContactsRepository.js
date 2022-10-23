import db from '../../database/index.js';

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    ORDER BY contacts.name ${direction}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await db(`
    SELECT contacts.*, categories.name AS category_name
    FROM contacts
    LEFT JOIN categories ON categories.id = contacts.category_id
    WHERE contacts.id = $1`, [id]);
    return rows;
  }

  async findByEmail(email) {
    const [rows] = await db('SELECT * FROM contacts WHERE email = $1', [email]);
    return rows;
  }

  async create({
    name, email, phone, birth, category_id,
  }) {
    const [rows] = await db(`
    INSERT INTO contacts (name, email, phone, birth, category_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING*
    `, [name, email, phone, birth, category_id]);
    return rows;
  }

  async update(id, {
    name, email, phone, birth, category_id,
  }) {
    const [rows] = await db(`
    UPDATE CONTACTS
    SET name = $1, email = $2, phone = $3, birth = $4, category_id = $5
    WHERE id = $6
    RETURNING*
    `, [name, email, phone, birth, category_id, id]);
    return rows;
  }

  async delete(id) {
    const deleteOp = await db('DELETE FROM contacts WHERE id = $1', [id]);
    return deleteOp;
  }
}

export default new ContactsRepository();
