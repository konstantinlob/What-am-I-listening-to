import{s as r,v as h,o as i,b as _,e as t,l as m,w as f,u as s,x as c,p as k}from"./entry.be26727f.js";const g=k("Go Home"),w={key:0},y=t("p",null,"something went wrong",-1),v={key:1},x=t("br",null,null,-1),B=t("br",null,null,-1),V={__name:"test",async setup(N){let e,o;const p=localStorage.getItem("auth-token");let n,a;const l=([e,o]=r(()=>fetch("https://api.spotify.com/v1/me",{headers:{Authorization:`Bearer ${p}`}})),e=await e,o(),e);return l.ok?n=([e,o]=r(()=>l.json()),e=await e,o(),e):a=([e,o]=r(()=>l.text()),e=await e,o(),e),(b,C)=>{var u;const d=h("router-link");return i(),_("div",null,[t("div",null,[m(d,{to:"/"},{default:f(()=>[g]),_:1})]),s(a)?(i(),_("div",w,[y,t("p",null,c(s(a)),1)])):(i(),_("div",v,[x,t("p",null,"You are logged in as "+c((u=s(n))==null?void 0:u.display_name),1),B,t("p",null,c(JSON.stringify(s(n))),1)]))])}}};export{V as default};
