import MongoManager from "@/app/utils/mongo";
 import {  NextResponse } from "next/server";

export async function GET() {
     

  try {
    const getDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "employees"
    );

    
    const employees = await getDataFromMongoDB.find({}).toArray();
     if (!employees) {
      return NextResponse.json({ error: "employees not found" });
    }

     return NextResponse.json({employees:employees});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
