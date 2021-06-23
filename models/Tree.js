import pool from '../lib/utils/pool';

export default class Tree {
  id;
  name;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.quantity = row.quantity;
  }

  static async insert({ name, quantity }) {
    console.log(name, quantity);
    const { rows } = await pool.query(
      'INSERT INTO trees (name, quantity) VALUES ($1, $2) RETURNING *',
      [name, quantity]
    );

    return new Tree(rows[0]);
  }


  static async findById(id) {
    const { rows } = await pool.query('SELECT * FROM trees WHERE id=$1', [id]);

    return new Tree(rows[0]);
  }

  static async findAll() {
    const { rows } = await pool.query('SELECT * FROM trees');
    return rows.map(row => new Tree(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(`
    DELETE FROM trees
    WHERE id = $1
    RETURNING *`, [id]);

    return new Tree(rows[0]);
  }

  static async put(name, quantity, id) {
    const { rows } = await pool.query(`
    UPDATE trees
    SET name = $1,
    quantity = $2
    WHERE id = $3
    RETURNING *`, [name, quantity, id]);
    return new Tree(rows[0]);
  }
}
