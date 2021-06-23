import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Tree from '../models/Tree.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates an order via POST', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ name: 'willow', quantity: 420 });
    expect(res.body).toEqual({ id: '1', name: 'willow', quantity: 420 });
  });

  it('gets a tree via GET id', async () => {
    const order = await Tree.insert({
      name: 'willow',
      quantity: 2
    });
    const res = await request(app).get('/api/v1/orders/1');
    expect(res.body).toEqual(order);
  });

  it('gets all trees via GET', async () => {
    const willow = await Tree.insert({
      name: 'willow',
      quantity: 2
    });
    const fern = await Tree.insert({
      name: 'fern',
      quantity: 1
    });
    const oak = await Tree.insert({
      name: 'oak',
      quantity: 3
    });
    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual([willow, fern, oak]);
  });

  it('deletes a tree via DELETE', async () => {
    const willow = await Tree.insert({
      name: 'willow',
      quantity: 4
    });
    const res = await request(app)
      .delete(`/api/v1/orders/${willow.id}`);

    expect(res.body).toEqual(willow);
  });

  it.only('updates a tree via PUT', async () => {
    const willow = await Tree.insert({
      name: 'willow',
      quantity: 1
    });
    willow.quantity = 5;

    const res = await request(app)
      .put(`/api/v1/orders/${willow.id}`)
      .send(willow);
    expect(res.body).toEqual({
      id: '1',
      name: 'willow',
      quantity: 5
    });
  });

});
