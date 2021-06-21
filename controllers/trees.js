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
  });
