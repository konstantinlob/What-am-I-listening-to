import{a as c,w as a,r as l,h as o,b as g,t as m}from"./entry.c51b81ea.js";const p=c({__name:"auth",async setup(d){let e,t;const r=new URLSearchParams(window.location.search),i=r.get("code"),s=r.get("error"),n=localStorage.getItem("redirect-uri");return r.get("state")!==localStorage.getItem("auth-state")?([e,t]=a(()=>o("State missmatch. The authorization integrity might have been compormized!")),await e,t()):s?s==="access_denied"?(l(),[e,t]=a(()=>g("/login")),await e,t()):([e,t]=a(()=>o("Spotify Authorization error: "+r.get("error"))),await e,t()):!i||n===null?([e,t]=a(()=>o("Missing pkce or redirect-uri")),await e,t()):([e,t]=a(()=>m(i,n)),await e,t()),()=>{}}});export{p as default};