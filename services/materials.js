const MongoLib = require('../lib/mongo');

class MaterialsService {
  constructor() {
    this.collection = 'materials';
    this.mongoDB = new MongoLib();
  }

  async materialsService({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const materials = await this.mongoDB.getAll(this.collection, query);
    return materials || [];
  }

  async getMaterial({ materialId }) {
    const material = await this.mongoDB.get(this.collection, materialId);
    return material || {};
  }

  async createMaterial({ material }) {
    const createMaterialId = await this.mongoDB.create(this.collection, material);
    return createMaterialId;
  }

  async updateMaterial({ materialId, material } = {}) {
    const updateMaterialId = await this.mongoDB.update(this.collection, materialId, material);
    return updateMaterialId;
  }

  async deleteMaterial({ materialId }) {
    const deleteMaterialId = await this.mongoDB.delete(this.collection, materialId);
    return deleteMaterialId;
  }
}

module.exports = MaterialsService;

