import { Router } from 'express';
import Tree from '../models/Tree.js';
import OrderService from '../services/OrderService.js';

export default Router()

  .post('/', async (req, res, next) => {
    try {
      console.log(req.body);
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const order = await Tree.findById(req.params.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res) => {
    try {
      const trees = await Tree.findAll();
      res.send(trees);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .delete('/:id', async (req, res) => {
    try {
      const trees = await OrderService.delete(req.params.id);
      res.send(trees);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })
  .put('/:id', async (req, res) => {
    try {
      console.log(req.body);
      const trees = await OrderService.update(req.body.name, req.body.quantity, req.body.id);

      res.send(trees);
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
