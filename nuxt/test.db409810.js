import{r,s as h,o as i,b as _,e as t,l as m,w as f,u as n,v as c,p as k}from"./entry.f1b5d0ed.js";const g={key:0},w=t("p",null,"something went wrong",-1),y={key:1},v=t("br",null,null,-1),x=t("br",null,null,-1),S={__name:"test",async setup(B){let e,o;const p=localStorage.getItem("auth-token");let s,a;const l=([e,o]=r(()=>fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${p}`}})),e=await e,o(),e);return l.ok?s=([e,o]=r(()=>l.json()),e=await e,o(),e):a=([e,o]=r(()=>l.text()),e=await e,o(),e),(N,b)=>{var u;const d=h("router-link");return i(),_("div",null,[t("div",null,[m(d,{to:"/"},{default:f(()=>[k("Go Home")]),_:1})]),n(a)?(i(),_("div",g,[w,t("p",null,c(n(a)),1)])):(i(),_("div",y,[v,t("p",null,"You are logged in as "+c((u=n(s))==null?void 0:u.display_name),1),x,t("p",null,c(JSON.stringify(n(s))),1)]))])}}};export{S as default};
