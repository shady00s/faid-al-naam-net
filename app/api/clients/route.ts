import MongoManager from "@/app/utils/mongo";
 import {  NextResponse } from "next/server";

export async function GET() {
     

  try {
    const getStatsDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "statistics"
    );

    const getPartnersDataFromMongoDB = await MongoManager.getInstance().getCollection(
        process.env.DATABASE_NAME!,
        "partners"
      );

      const getTestimonialsDataFromMongoDB = await MongoManager.getInstance().getCollection(
        process.env.DATABASE_NAME!,
        "testimonials"
      );
      const getServicesDataFromMongoDB = await MongoManager.getInstance().getCollection(
        process.env.DATABASE_NAME!,
        "services"
      );

    const statistics = await getStatsDataFromMongoDB.find({}).toArray();
    const partners = await getPartnersDataFromMongoDB.find({}).toArray();
    const testimonials = await getTestimonialsDataFromMongoDB.find({}).toArray();
    const services = await getServicesDataFromMongoDB.find({}).toArray();
     if (!statistics) {
      return NextResponse.json({ error: "statistics not found" });
    }

    if (!partners) {
        return NextResponse.json({ error: "partners not found" });
      }
      if (!testimonials) {
        return NextResponse.json({ error: "testimonials not found" });
      }

     return NextResponse.json({clients:{testimonials,partners,statistics,services}});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
