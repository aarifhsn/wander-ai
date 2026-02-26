import clientPromise from "@/lib/mongodb";

export class TravelPlan {
  static async getCollection() {
    const client = await clientPromise;
    const db = client.db("travel_planner");
    return db.collection("plans");
  }

  static async findBySlug(slug) {
    const collection = await this.getCollection();
    return await collection.findOne({ slug });
  }

  static async findByDestinationAndDays(destination, days) {
    const collection = await this.getCollection();
    return await collection.findOne({
      destinationName: new RegExp(destination, "i"),
      days: parseInt(days),
    });
  }

  static async create(planData) {
    const collection = await this.getCollection();
    const result = await collection.insertOne({
      ...planData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }

  static async getLatest(limit = 3) {
    const collection = await this.getCollection();
    return await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();
  }
}
