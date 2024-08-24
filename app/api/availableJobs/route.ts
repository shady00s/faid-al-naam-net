import MongoManager from "@/app/utils/mongo";
 import {  NextResponse,NextRequest } from "next/server";
 import { ObjectId } from "mongodb";

export async function GET() {
   
  try {
    const getDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "avalablejobs"
    );
   
    const availableJobs = await getDataFromMongoDB.find({ }).toArray();
    if (!availableJobs) {
     return NextResponse.json({ error: "careers not found" });
   }
    return NextResponse.json({availableJobs:{availableJobs}});

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
