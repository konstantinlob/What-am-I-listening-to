import{i as d,a as f,o as p,e as u,f as r,j as m,b as _}from"./entry.97438936.js";const h=""+new URL("Spotify_Logo_White.ef7c01a4.svg",import.meta.url).href,x=""+new URL("Github_Logo_Black.2d65077f.svg",import.meta.url).href;function g(e){const t=new ArrayBuffer(4);return new DataView(t).setUint32(0,e,!1),t}function y(e){const t=d.exports.lib.WordArray.random(e),o=[];return t.words.forEach(i=>{const c=g(i),s=new Uint8Array(c);for(let n=0;n<4;n++)o.push(s[n])}),o}function b(e){const t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";let o="";const i=y(e);for(let c=0;c<e;c++){const s=i[c]%t.length;o+=t[s]}return o}function v(e){return b(e)}function w(e){return d.exports.SHA256(e).toString(d.exports.enc.Base64url)}function $(e){if(e||(e=43),e<43||e>128)throw`Expected a length between 43 and 128. Received ${e}.`;const t=v(e),o=w(t);return{code_verifier:t,code_challenge:o}}const S={class:"flex flex-col items-center justify-between h-full"},L={class:"flex flex-col items-center justify-evenly grow"},A=r("div",null,[r("h1",{class:"flex justify-center text-xl font-bold"},"What Am I Listening To?"),r("h2",{class:"flex justify-center"},"Analyze your listening habits")],-1),B={class:"flex flex-col items-center"},R=r("img",{src:h,alt:"Spotify Logo",class:"h-10"},null,-1),j=r("span",{class:"pl-2 text-[25px]"},"login",-1),P=[R,j],U=r("span",{class:"flex items-center"},"Secured by OAuth2.0",-1),k=m('<div class="flex flex-col items-center"><button class="bg-purple px-4 py-2 h-min rounded-lg flex flex-row items-center font-bold"><img src="'+x+'" alt="GitHub Logo" class="h-8"><span class="pl-2 text-[20px]">GitHub repo</span></button><span class="text-center w-full">Developled by <br> Benjamin Tallarek, Julius J\xE4nchen, Konstantin Lobmayr, Pascal Heyn, Robin Walter</span></div>',1),H=f({__name:"login",setup(e){const t="20aa48c2719e42c0be5f3b834942f06d",o=[];function i(s=15){var n=new Uint8Array(s/2);return window.crypto.getRandomValues(n),Array.from(n,l=>l.toString(16).padStart(2,"0")).join("")}async function c(){const s=new URL(window.location.href.replace("/login","/auth"));s.search="";const n=i();localStorage.setItem("auth-state",n);const l=$();localStorage.setItem("code-verifier",l.code_verifier);const a=new URL("/authorize","https://accounts.spotify.com/");a.searchParams.append("client_id",t),a.searchParams.append("response_type","code"),a.searchParams.append("redirect_uri",s.toString()),a.searchParams.append("scopes",o.join(" ")),a.searchParams.append("state",n),a.searchParams.append("code_challenge_method","S256"),a.searchParams.append("code_challenge",l.code_challenge),_(a.toString(),{external:!0})}return(s,n)=>(p(),u("div",S,[r("div",L,[A,r("div",B,[r("button",{onClick:n[0]||(n[0]=l=>c()),class:"bg-spotify-green px-8 py-4 h-min rounded-lg flex flex-row items-center font-bold"},P),U])]),k]))}});export{H as default};
