import{f as e}from"./entry.92c955e0.js";const a={__name:"logout",setup(o){return localStorage.removeItem("auth-token"),localStorage.removeItem("refresh-token"),localStorage.removeItem("auth-state"),localStorage.removeItem("code-verifier"),e("/"),()=>{}}};export{a as default};
