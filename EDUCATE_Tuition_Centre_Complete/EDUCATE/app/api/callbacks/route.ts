import {getDb} from "../../../db";
import {callbacks} from "../../../db/schema";
export async function POST(req:Request){
 const data=await req.json().catch(()=>null);
 if(!data || !/^[6-9]\d{9}$/.test(String(data.phone)) || typeof data.phone!=="string" || !["8","9","10"].includes(data.grade) || !["Karnataka State","CBSE"].includes(data.board) || !["Morning (10 AM–12 PM)","Afternoon (12–4 PM)","Evening (4–7 PM)"].includes(data.slot) || typeof data.id!=="string" || !/^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i.test(data.id))return new Response(null,{status:400});
 const {id,phone,grade,board,slot}=data;
 await getDb().insert(callbacks).values({id,phone,grade,board,slot}).onConflictDoNothing();
 return Response.json({saved:true},{status:201});
}
