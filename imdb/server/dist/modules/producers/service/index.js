"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProducerService = void 0;
const db_1 = require("../../../db");
const entity_1 = require("../entity");
const crudService_1 = require("../../../utils/crudService");
class ProducerService extends crudService_1.CrudService {
    constructor() {
        super(db_1.db, {
            table: entity_1.producers,
            entityName: 'Producer',
        });
    }
}
exports.ProducerService = ProducerService;
const producerService = new ProducerService();
exports.default = producerService;
