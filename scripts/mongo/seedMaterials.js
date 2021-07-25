// DEBUG=app:* node scripts/mongo/seedMaterials.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:materials');
const MongoLib = require('../../lib/mongo');
const { materialsMock } = require('../../utils/mocks/materials');

async function seedMaterials() {
  try {
    const mongoDB = new MongoLib();

    const promises = materialsMock.map(async material => {
      await mongoDB.create('materials', material);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} materials have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedMaterials();