import type {ReactNode} from "react";
export default function Layout({children}:{children:ReactNode}){return <html lang="en"><head><meta name="robots" content="noindex,nofollow"/><link rel="stylesheet" href="/style.css"/></head><body>{children}</body></html>}
