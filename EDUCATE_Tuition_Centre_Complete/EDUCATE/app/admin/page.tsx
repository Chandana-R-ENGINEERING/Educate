import {sql,desc,count} from "drizzle-orm";
import {requireChatGPTUser,chatGPTSignOutPath} from "../chatgpt-auth";
import {isAdmin} from "./access";
import {getDb} from "../../db";
import {callbacks} from "../../db/schema";
export const dynamic="force-dynamic";
export const metadata={title:"EDUCATE | Callback bookings"};
export default async function Admin({searchParams}:{searchParams:Promise<{page?:string}>}){
 const user=await requireChatGPTUser("/admin");
 if(!isAdmin(user))return <main className="section"><h2>Staff access only</h2><a href={chatGPTSignOutPath("/admin")}>Switch account</a></main>;
 const db=getDb();
 const [totals]=await db.select({total:count(),people:sql<number>`count(distinct ${callbacks.phone})`,pending:sql<number>`count(case when ${callbacks.status}='Pending' then 1 end)`}).from(callbacks);
 const pages=Math.max(1,Math.ceil(totals.total/25));
 const page=Math.min(pages,Math.max(1,Math.floor(Number((await searchParams).page)||1)));
 const rows=await db.select().from(callbacks).orderBy(desc(callbacks.created),desc(callbacks.id)).limit(25).offset((page-1)*25);
 return <main className="section"><a className="line" href="/">EDUCATE Tuition Centre</a><p className="cap">STAFF ADMIN</p><h2>Callback bookings</h2><p>Demo requests. Unique contacts are counted by phone number.</p><div className="stats">{[[totals.total,"Total bookings"],[totals.people,"Unique contacts"],[totals.pending,"Awaiting a call"],[totals.total-totals.pending,"Contacted"]].map(([v,label])=><div key={label}><strong>{v}</strong>{label}</div>)}</div><a className="line" href={'/admin?page='+page}>Refresh bookings</a>{rows.length?<div className="bookings"><table><thead><tr>{["Received (IST)","Phone","Class / board","Preferred time (IST)","Status","Follow-up"].map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.id}><td>{new Date(r.created.replace(" ","T")+"Z").toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})}</td><td>{r.phone}</td><td>{r.grade} · {r.board}</td><td>{r.slot}</td><td>{r.status}</td><td>{r.status==="Pending"&&<form method="post" action="/admin/contacted"><input type="hidden" name="id" value={r.id}/><button className="button dark">Mark contacted</button></form>}</td></tr>)}</tbody></table><p>{page>1&&<a className="line" href={'?page='+(page-1)}>Previous </a>} Page {page} of {pages} {page<pages&&<a className="line" href={'?page='+(page+1)}> Next</a>}</p></div>:<p>New callback requests will appear here.</p>}<a className="line" href={chatGPTSignOutPath("/")}>Sign out</a></main>
}
