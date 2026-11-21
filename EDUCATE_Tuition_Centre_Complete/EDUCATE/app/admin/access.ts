import {env} from "cloudflare:workers";
import type {ChatGPTUser} from "../chatgpt-auth";
export function isAdmin(user:ChatGPTUser|null){return Boolean(user && env.EDUCATE_ADMIN_EMAIL && user.email.toLowerCase()===env.EDUCATE_ADMIN_EMAIL.toLowerCase());}
