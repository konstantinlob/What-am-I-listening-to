import{a as n,w as a,b as o}from"./entry.c51b81ea.js";const r=n({__name:"index",async setup(i){let e,t;return localStorage.getItem("auth-token")===null?localStorage.getItem("introduced")===null?(localStorage.setItem("introduced","true"),[e,t]=a(()=>o("/introduction")),await e,t()):([e,t]=a(()=>o("/login")),await e,t()):([e,t]=a(()=>o("/home")),await e,t()),()=>{}}});export{r as default};