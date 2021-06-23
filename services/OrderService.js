import { sendSms } from '../lib/utils/twilio.js';
import Tree from '../models/Tree.js';

export default class OrderService {
  static async create({ name, quantity }) {
    const order = await Tree.insert({ name, quantity });
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received of ${name} with quantity of ${quantity}`
    );

    return order;
  }

  static async delete(id) {
    const order = await Tree.delete(id);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your order has been deleted ${order.name} of with quantity of ${order.quantity}`
    );
    return order;
  }

  static async update(name, quantity, id) {
    console.log(name, quantity, id);
    const order = await Tree.update(name, quantity, id);
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your order has been updated with ${order.name} quantity of ${order.quantity}`
    );
    return order;
  }
}
