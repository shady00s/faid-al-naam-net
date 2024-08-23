import { MongoClient } from "mongodb";

class MongoManager {
  private static instance: MongoManager;
  private mongoClient: MongoClient | null = null;

  private constructor() {}

  static getInstance() {
    if (!MongoManager.instance) {
      MongoManager.instance = new MongoManager();
    }
    return MongoManager.instance;
  }

  async initMongoDB() {
    try{
        if (!this.mongoClient) {
          const uri = process.env.MONGODB_URI;
          if (!uri) {
            throw new Error(
              "Please define the MONGODB_URI environment variable inside .env.local"
            );
          }
          this.mongoClient = new MongoClient(uri);
          await this.mongoClient.connect();
    
          console.log("Connected to MongoDB");
        }

    }catch(e:any){
        throw Error(e.message)
    }
  }

  async closeMongoClient() {
    if (this.mongoClient) {
      await this.mongoClient.close();
      this.mongoClient = null;
    }
  }

  async getDatabase(dbName: string) {
    if (!this.mongoClient) {
      await this.initMongoDB();
      await this.getDatabase(dbName);
    }
    return this.mongoClient!.db();
  }

  async getCollection(dbName: string, collectionName: string) {
    const db = await this.getDatabase(dbName);
    return db.collection(collectionName);
  }
}

export default MongoManager;