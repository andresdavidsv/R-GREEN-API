const MongoLib = require('../lib/mongo');

class UserMaterialsService {
  constructor() {
    this.collection = 'userMaterials';
    this.mongoDB = new MongoLib();
  }

  async getUserMaterials({ userId }) {
    const query = userId && { userId };
    const userMaterials = await this.mongoDB.getAll(this.collection, query);
    return userMaterials || [];
  }

  async getMaterial({ userMaterialId }) {
    const userMaterial = await this.mongoDB.get(this.collection, userMaterialId);
    return userMaterial || {};
  }

  async createUserMaterial({ userMaterial }) {
    const createMaterialId = await this.mongoDB.create(this.collection, userMaterial);
    return createMaterialId;
  }

  async updateMaterial({ userMaterialId, userMaterial } = {}) {
    const updateMaterialId = await this.mongoDB.update(this.collection, userMaterialId, userMaterial);
    return updateMaterialId;
  }

  async deleteUserMaterial({ userMaterialId }) {
    const deleteMaterialId = await this.mongoDB.delete(this.collection, userMaterialId);
    return deleteMaterialId;
  }
}

module.exports = UserMaterialsService;