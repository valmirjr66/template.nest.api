import IEntity from 'entity/IEntity';
import { FindOptionsWhere, Repository } from 'typeorm';

export default abstract class BaseRepository<
  T extends IEntity,
> extends Repository<T> {
  async findById(id: string) {
    return this.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async countById(id: string) {
    return this.countBy({ id } as FindOptionsWhere<T>);
  }

  async findAll() {
    return this.find();
  }
}
