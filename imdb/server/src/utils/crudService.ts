import { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { ApiError, errorHandler, notFound } from './errorHandler';

export interface CrudServiceOptions {
  table: any;
  entityName: string;
  relations?: {
    table: any;
    foreignKey: string;
  }[];
}

export class CrudService<T = any> {
  protected table: any;
  protected entityName: string;
  protected relations: {
    table: any;
    foreignKey: string;
  }[];
  protected db: any;

  constructor(db: any, options: CrudServiceOptions) {
    this.db = db;
    this.table = options.table;
    this.entityName = options.entityName;
    this.relations = options.relations || [];
  }

  getAll = async (req: Request, res: Response) => {
    try {
      const allEntities = await this.db.select().from(this.table);
      res.json(allEntities);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const entity = await this.db.select().from(this.table).where(eq(this.table.id, id));
      
      if (entity.length === 0) {
        throw notFound(this.entityName);
      }
      
      res.json(entity[0]);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  getByImdbId = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const entity = await this.db.select().from(this.table).where(eq(this.table.imdbId, id));
      
      if (entity.length === 0) {
        throw notFound(this.entityName);
      }
      
      res.json(entity[0]);
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  create = async (req: Request, res: Response) => {
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
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      const entityExists = await this.db.select({ id: this.table.id })
        .from(this.table)
        .where(eq(this.table.id, id));
      
      if (entityExists.length === 0) {
        throw notFound(this.entityName);
      }
      
      const updateData = {
        ...req.body,
        updatedBy: req.body.updatedBy || 'system',
      };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      await this.db.update(this.table)
        .set(updateData)
        .where(eq(this.table.id, id));
      
      res.json({ id, ...req.body });
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      // First check if entity exists
      const entityExists = await this.db.select({ id: this.table.id })
        .from(this.table)
        .where(eq(this.table.id, id));
      
      if (entityExists.length === 0) {
        throw notFound(this.entityName);
      }
      
      // Delete related entities if any
      for (const relation of this.relations) {
        await this.db.delete(relation.table)
          .where(eq(relation.table[relation.foreignKey], id));
      }
      
      // Delete the entity
      await this.db.delete(this.table).where(eq(this.table.id, id));
      
      res.status(204).end();
    } catch (error) {
      errorHandler(error as Error, res);
    }
  };
}
