import { Injectable } from '@nestjs/common';
import SimpleDataManager from './SimpleDataManager';
import TransactionalDataManager from './TransactionalDataManager';

@Injectable()
export default class DataManagerFactory {
  public getSimple() {
    return new SimpleDataManager();
  }

  public getTransactional() {
    return new TransactionalDataManager();
  }
}
