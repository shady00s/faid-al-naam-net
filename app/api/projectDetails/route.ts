import MongoManager from "@/app/utils/mongo";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let projectId = searchParams.get("projectID")??"";
  let projectID: string |  ObjectId | undefined;
  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  try {
    const getDataFromMongoDB = await MongoManager.getInstance().getCollection(
      process.env.DATABASE_NAME!,
      "projects"
    );

    if(  projectId.length !== 24){
        projectId = projectId!.replaceAll("-", " ");
    }
    else{
      projectID =new ObjectId(projectId)
    }
    const project = await getDataFromMongoDB.findOne({
      $or: [{ projectId: projectID },
            {projectNameEn:{'$regex' : projectId, '$options' : 'i'}},
            {projectNameAr:{'$regex' : projectId, '$options' : 'i'}}
      ],
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found" });
    }
    
    
    const isValidObjectId = ObjectId.isValid(projectId);

    const query = {
      $and: [
        // Exclude by ObjectId if projectID is a valid ObjectId
        ...(isValidObjectId ? [{ projectId: { $ne: new ObjectId(projectID) } }] : []),
        // Exclude by name regex match (case-insensitive)
        {
          $or: [
            { projectNameEn: { $not: { $regex: projectId, $options: 'i' } } },
            { projectNameAr: { $not: { $regex: projectId, $options: 'i' } } }
          ]
        }
      ]
    };
    let projects = await getDataFromMongoDB.find(query).toArray();
    projects =   projects.filter((e:any)=>e.projectId!=projectID && e.projectNameEn !=projectId && e.projectNameAr != projectId)
     

    return NextResponse.json({project:project,projects:projects});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error",err:error },
      { status: 500 }
    );
  }
}
