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
}
