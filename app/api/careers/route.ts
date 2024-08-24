import MongoManager from "@/app/utils/mongo";
 import {  NextResponse } from "next/server";

export async function GET() {
     
  try {
    const getDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "careers"
    );

    
    const careers = await getDataFromMongoDB.find({}).toArray();
     if (!careers) {
      return NextResponse.json({ error: "careers not found" });
    }
   
     return NextResponse.json({careers:{careers}});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
