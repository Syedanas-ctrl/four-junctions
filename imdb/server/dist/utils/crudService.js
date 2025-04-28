"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const errorHandler_1 = require("./errorHandler");
class CrudService {
    constructor(db, options) {
        this.getAll = async (req, res) => {
            try {
                const allEntities = await this.db.select().from(this.table);
                res.json(allEntities);
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.getById = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const entity = await this.db.select().from(this.table).where((0, drizzle_orm_1.eq)(this.table.id, id));
                if (entity.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                res.json(entity[0]);
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.getByImdbId = async (req, res) => {
            try {
                const id = req.params.id;
                const entity = await this.db.select().from(this.table).where((0, drizzle_orm_1.eq)(this.table.imdbId, id));
                if (entity.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                res.json(entity[0]);
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.create = async (req, res) => {
            try {
                const result = await this.db.insert(this.table).values({
                    ...req.body,
                    createdBy: req.body.createdBy || 'system',
                });
                const insertId = Array.isArray(result) && result.length > 0 ? result[0].insertId : null;
                res.status(201).json({
                    id: insertId,
                    ...req.body
                });
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.update = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const entityExists = await this.db.select({ id: this.table.id })
                    .from(this.table)
                    .where((0, drizzle_orm_1.eq)(this.table.id, id));
                if (entityExists.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                const updateData = {
                    ...req.body,
                    updatedBy: req.body.updatedBy || 'system',
                };
                // Remove undefined values
                Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
                await this.db.update(this.table)
                    .set(updateData)
                    .where((0, drizzle_orm_1.eq)(this.table.id, id));
                res.json({ id, ...req.body });
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.delete = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                // First check if entity exists
                const entityExists = await this.db.select({ id: this.table.id })
                    .from(this.table)
                    .where((0, drizzle_orm_1.eq)(this.table.id, id));
                if (entityExists.length === 0) {
                    throw (0, errorHandler_1.notFound)(this.entityName);
                }
                // Delete related entities if any
                for (const relation of this.relations) {
                    await this.db.delete(relation.table)
                        .where((0, drizzle_orm_1.eq)(relation.table[relation.foreignKey], id));
                }
                // Delete the entity
                await this.db.delete(this.table).where((0, drizzle_orm_1.eq)(this.table.id, id));
                res.status(204).end();
            }
            catch (error) {
                (0, errorHandler_1.errorHandler)(error, res);
            }
        };
        this.db = db;
        this.table = options.table;
        this.entityName = options.entityName;
        this.relations = options.relations || [];
    }
}
exports.CrudService = CrudService;
