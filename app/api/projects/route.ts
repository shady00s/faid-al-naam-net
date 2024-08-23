import MongoManager from "@/app/utils/mongo";
 import {  NextResponse } from "next/server";

export async function GET() {
     

  try {
    const getDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "projects"
    );

    
    const project = await getDataFromMongoDB.find({}).toArray();
     if (!project) {
      return NextResponse.json({ error: "Projects not found" });
    }

     return NextResponse.json({projects:project});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
