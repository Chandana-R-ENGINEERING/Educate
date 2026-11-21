import home from "../content/home.json";
export function GET(){return new Response(home,{headers:{"Content-Type":"text/html; charset=utf-8"}})}
