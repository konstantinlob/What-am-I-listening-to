import{a as t,f as e}from"./entry.8379185c.js";const a=t({__name:"index",setup(o){return localStorage.getItem("auth-token")===null?localStorage.getItem("introduced")===null?(localStorage.setItem("introduced","true"),e("/introduction")):e("/login"):e("/home"),()=>{}}});export{a as default};