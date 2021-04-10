import { Container } from 'typedi';
import * as services from '../services';

export default () => {
  try {
    for (const [key, value] of Object.entries(services)) {
      Container.set(key, value);
    }
    // logger
  } catch (error) {
    console.warn(`Typedi Loader Error`, error);
  }
};
