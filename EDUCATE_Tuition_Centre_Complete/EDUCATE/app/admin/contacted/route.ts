import {eq} from "drizzle-orm";
import {getChatGPTUser} from "../../chatgpt-auth";
import {isAdmin} from "../access";
import {getDb} from "../../../db";
import {callbacks} from "../../../db/schema";
export async function POST(req:Request){
 if(!isAdmin(await getChatGPTUser()) || req.headers.get("origin")!==new URL(req.url).origin)return new Response(null,{status:403});
 const id=(await req.formData()).get("id");
 if(typeof id!=="string")return new Response(null,{status:400});
 await getDb().update(callbacks).set({status:"Contacted"}).where(eq(callbacks.id,id));
 return new Response(null,{status:303,headers:{Location:"/admin","Cache-Control":"no-store"}});
}
