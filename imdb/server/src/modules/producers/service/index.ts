import { db } from '../../../db';
import { producers } from '../entity';
import { CrudService } from '../../../utils/crudService';

export class ProducerService extends CrudService<typeof producers> {
  constructor() {
    super(db, {
      table: producers,
      entityName: 'Producer',
    });
  }
}

const producerService = new ProducerService();

export default producerService;