const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

class Database {
  constructor() {
    this.mongoServer = new MongoMemoryServer();
    this.mongoUri = null;
  }

  async start() {
    await this.mongoServer.start();
    this.mongoUri = this.mongoServer.getUri();
    await mongoose.connect(this.mongoUri);
    console.log('Connected to in-memory database');
  }

  async stop() {
    await mongoose.disconnect();
    await this.mongoServer.stop();
    console.log('Disconnected from in-memory database');
  }
}

module.exports = new Database();
