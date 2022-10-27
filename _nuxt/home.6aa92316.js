import{a as y,C as B,s as ae,i as ne,j as U,k as oe,l as Z,m as M,p as N,D as le,R as re,q as P,v as V,x as G,o as u,c as w,u as r,b as q,y as D,w as E,e as m,z as x,A as H,B as R,f as i,E as S,F as O,G as W,H as $,I as Y,J as ie,K as J,L as ce,M as ue,N as de,T as he,O as pe}from"./entry.136d5d51.js";import{_ as T}from"./_plugin-vue_export-helper.a1a6add7.js";var L;(function(t){t.ChartRendered="chart:rendered",t.ChartUpdated="chart:updated",t.ChartDestroyed="chart:destroyed",t.LabelsUpdated="labels:updated"})(L||(L={}));function F(t,e,a,s){t(e,a),s!==void 0&&s.emit(L.ChartRendered)}function _e(t,e){t.update(),e!==void 0&&e.emit(L.ChartUpdated)}function j(t,e){t.destroy(),e!==void 0&&e.emit(L.ChartDestroyed)}function fe(t,e){const a={labels:typeof t.labels>"u"?[]:[...t.labels],datasets:[]};return K(a,{...t},e),a}function K(t,e,a){const s=[];t.datasets=e.datasets.map(n=>{const l=t.datasets.find(o=>o[a]===n[a]);return!l||!n.data||s.includes(l)?{...n}:(s.push(l),Object.assign(l,n),l)})}function me(t,e,a){t.data.labels=e,a!==void 0&&a.emit(L.LabelsUpdated)}function ge(t,e){t.options={...e}}function ve(t,e){const a=t.datasets.map(n=>n.label),s=e.datasets.map(n=>n.label);return e.datasets.length===t.datasets.length&&a.every((n,l)=>n===s[l])}const ye="Please remove the <template></template> tags from your chart component. See https://vue-chartjs.org/guide/#vue-single-file-components",be="Update ERROR: chart instance not found",Q=(t,e,a)=>y({props:{chartData:{type:Object,required:!0},chartOptions:{type:Object,default:()=>{}},datasetIdKey:{type:String,default:"label"},chartId:{type:String,default:t},width:{type:Number,default:400},height:{type:Number,default:400},cssClasses:{type:String,default:""},styles:{type:Object,default:()=>{}},plugins:{type:Array,default:()=>[]}},setup(s,n){B.register(a);const l=ae(null),o=ne(null);function d(h,b){if(l.value!==null&&j(M(l.value),n),o.value===null)throw new Error(ye);{const c=fe(h,s.datasetIdKey),_=o.value.getContext("2d");_!==null&&(l.value=new B(_,{type:e,data:P(h)?new Proxy(c,{}):c,options:b,plugins:s.plugins}))}}function p(h,b){const c=P(h)?M(h):{...h},_=P(b)?M(b):{...b};if(Object.keys(_).length>0){const v=M(l.value);ve(c,_)&&v!==null?(K(v==null?void 0:v.data,c,s.datasetIdKey),c.labels!==void 0&&me(v,c.labels,n),f()):(v!==null&&j(v,n),F(d,s.chartData,s.chartOptions,n))}else l.value!==null&&j(M(l.value),n),F(d,s.chartData,s.chartOptions,n)}function g(h){const b=M(l.value);b!==null?(ge(b,h),f()):F(d,s.chartData,s.chartOptions,n)}function f(){const h=M(l.value);h!==null?_e(h,n):console.error(be)}return U(()=>s.chartData,(h,b)=>p(h,b),{deep:!0}),U(()=>s.chartOptions,h=>g(h),{deep:!0}),oe(()=>{"datasets"in s.chartData&&s.chartData.datasets.length>0&&F(d,s.chartData,s.chartOptions,n)}),Z(()=>{l.value!==null&&j(M(l.value),n)}),n.expose({chart:l,updateChart:f}),()=>N("div",{style:s.styles,class:s.cssClasses},[N("canvas",{id:s.chartId,width:s.width,height:s.height,ref:o})])}}),we=Q("doughnut-chart","doughnut",le),xe=Q("radar-chart","radar",re),$e=y({__name:"Doughnut",props:{doughnutData:{default:()=>[{name:"Missing Data",count:1}]}},setup(t){const e=t;B.register(...V);const{doughnutData:a}=G(e),s={responsive:!0,maintainAspectRatio:!1,plugins:{legend:{position:"bottom",labels:{color:"white"}}}},n={labels:[],datasets:[{backgroundColor:["#e6194b","#3cb44b","#ffe119","#4363d8","#f58231","#911eb4","#46f0f0","#f032e6","#bcf60c","#fabebe","#008080","#e6beff","#9a6324","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000075","#808080"],borderColor:"#191414",data:[]}]};return a.value.forEach(l=>{n.labels.push(l.name),n.datasets[0].data.push(l.count)}),(l,o)=>(u(),w(r(we),{"chart-data":n,"chart-options":s}))}}),Ce=t=>{for(let e=t.length-1;e>0;e--){const a=Math.floor(Math.random()*(e+1));[t[e],t[a]]=[t[a],t[e]]}return t},A=(t,e,a=null)=>{const s=t.slice(0,e),n=Array(e-s.length).fill(a);return[...s,...n]},X=t=>t.replace(/(^\w{1})|(\s+\w{1})/g,e=>e.toUpperCase());async function C({endpoint:t,query:e,body:a,method:s}){const n=localStorage.getItem("auth-token");if(!n)throw await q("/login"),new Error("missing authorization token");let l;return t.startsWith("http")?l=new URL(t):l=new URL(`https://api.spotify.com/v1${t}`),e&&Object.entries(e).forEach(([o,d])=>l.searchParams.append(o,d)),fetch(l,{method:s!=null?s:"GET",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:a?JSON.stringify(a):void 0}).then(async o=>{if(o.status===204)return null;if(o.status===403||o.status===401)throw await q("/login"),new Error(o.status+": "+o.statusText);return o.json()}).then(o=>{if(o!=null&&o.error)throw o.error.status?new Error(o.error.status+": "+o.error.message):new Error(o.error+": "+o.error_description);return o})}var k=(t=>(t[t.Month=0]="Month",t[t.HalfYear=1]="HalfYear",t[t.Year=2]="Year",t))(k||{});const z={[0]:"short_term",[1]:"medium_term",[2]:"long_term"},ee=t=>(H("data-v-8738ab91"),t=t(),R(),t),ke={class:"flex flex-col justify-center items-center"},De=ee(()=>i("h1",{class:"statistics-title mb-4"},"Your Favorite Genres",-1)),Ie=ee(()=>i("p",{class:"text-gray"},"We found out what genres you like",-1)),Me=y({__name:"GenreDoughnut",async setup(t){var o;let e,a;const s=D("activeTimeframe").value,n=([e,a]=E(()=>C({endpoint:"/me/top/artists",query:{time_range:z[s]}}).catch(console.error)),e=await e,a(),e),l=[];return(o=n==null?void 0:n.items)==null||o.forEach(d=>d.genres.forEach(p=>{p=X(p);const g=l.find(f=>f.name===p);g?g.count++:l.length<20&&l.push({name:p,count:1})})),(d,p)=>(u(),m("section",ke,[De,x($e,{"doughnut-data":l,width:360,height:360}),Ie]))}}),Te=T(Me,[["__scopeId","data-v-8738ab91"]]),Se=y({__name:"RadarChart",props:{data:null},setup(t){const e=t;B.register(...V);const a={plugins:{legend:{display:!1}},scales:{r:{angleLines:{display:!1},beginAtZero:!0,pointLabels:{display:!0,color:"white"},ticks:{display:!1},grid:{display:!0,color:"gray"}}}},s="#1DB954",n="#1DB95444",l="#eeeeee",o={labels:[],datasets:[{data:[],fill:!0,borderWidth:3,backgroundColor:n,borderColor:s,pointBackgroundColor:s,pointBorderColor:l,pointHoverBackgroundColor:l,pointHoverBorderColor:l}]};return e.data.forEach(d=>{var p;(p=o.labels)==null||p.push(d.name),o.datasets[0].data.push(d.value)}),(d,p)=>(u(),w(r(xe),{"chart-data":o,"chart-options":a}))}}),te=t=>(H("data-v-e313333b"),t=t(),R(),t),Ee={class:"flex flex-col justify-center items-center"},Le=te(()=>i("h1",{class:"statistics-title"},"Your Top Tracks Analysed",-1)),Oe=te(()=>i("p",{class:"text-gray"},"We analysed your Top Tracks for audio features",-1)),Fe=y({__name:"AudioFeaturesRadarChart",async setup(t){let e,a;const s=D("activeTimeframe"),l=([e,a]=E(()=>C({endpoint:"/me/top/tracks",query:{limit:50,time_range:z[s.value]}})),e=await e,a(),e).items.map(f=>f.id),o=([e,a]=E(()=>C({endpoint:"/audio-features",query:{ids:l.join(",")}})),e=await e,a(),e),d={acousticness:0,danceability:0,energy:0,instrumentalness:0,liveness:0,speechiness:0,valence:0};o.audio_features.forEach(f=>{Object.keys(d).forEach(h=>{d[h]+=f[h]})});const p=o.audio_features.length,g=Object.entries(d).map(([f,h])=>({name:X(f),value:h/p}));return(f,h)=>(u(),m("section",Ee,[Le,x(Se,{width:360,height:360,data:r(g)},null,8,["data"]),Oe]))}}),je=T(Fe,[["__scopeId","data-v-e313333b"]]),Ae={class:"w-10 h-fit"},Be=["src"],He=y({__name:"IcebergItem",props:{img:null,text:null,overwater:{type:Boolean}},setup(t){const e=t;return(a,s)=>(u(),m("div",Ae,[i("img",{src:e.img,class:"w-10 h-10 object-cover"},null,8,Be),i("p",{class:O(["whitespace-nowrap overflow-hidden text-xs",{"text-spotify-black":t.overwater,"text-white":!t.overwater}])},S(e.text),3)]))}}),Re={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 509.94 795.87"},Pe=W('<path d="M30.23 0h449.48c16.68 0 30.23 13.54 30.23 30.23v276.35H0V30.23C0 13.54 13.54 0 30.23 0Z" style="fill:#17164b;"></path><path d="M0 306.58h509.94V765.8c0 16.59-13.47 30.07-30.07 30.07H30.07C13.47 795.87 0 782.4 0 765.8V306.58Z" style="fill:#34416d;"></path><path style="fill:#fdfdfd;" d="m0 306.58 52.65-102.97 24-12.38 3.09-12.78 15.49-21.68 66.19-126.96 78.19 13.16 45.29 88.64 33.68-16.64 53.03 56.9 12 .78 8.13 1.16 6.97 8.9 51.1 80.9 48 12.39 12.13 30.58H0z"></path><path style="fill:#eff6fc;" d="m0 306.58 59.81-88.26 12-7.74 34.84 4.45 72.58-168.97 44.71 10.26 53.61 106.84 8.13-30.58 31.55-17.23 35.8 52.65 6.78 15.29 14.9 6.58 4.84 4.45 1.74 12.58 5.42 17.42L408.39 264l43.74 8.71 17.03 33.87H0z"></path><path style="fill:#c6dced;" d="m0 306.58 74.52-55.74h29.61l23.61 7.74 33.29-69.87 29.23-31.74 12-4.07-11.61 67.94-4.07 31.55 6 1.35 44.71-53.22 16.65.19 17.41 20.71 21.49 5.61 14.51-14.71 15.3-3.09 33.29 26.71 19.54 44.12 48.39 1.75 39.1 24.77H0z"></path><path fill="#2433ab" d="m0 306.58 6.19 40.26 54.2 22.45 41.03 108.39 11.61 3.87h11.62l11.61 27.1 11.61 17.03L202.84 576l28.64 40.26 34.07 89.8 5.42-6.96 3.87 17.8h9.29l30.97-65.03 18.58-24 30.97-52.64 31.74-10.84 43.35-120.78 70.2-137.03H0z"></path><path fill="#00025F" fill-opacity=".2" d="M0 306.58h509.94v460.13c0 16.11-13.06 29.16-29.16 29.16H29.16C13.06 795.87 0 782.81 0 766.71V306.58Z"></path><path fill="#00025F" fill-opacity=".2" d="M0 422.81s58.32-23.12 133.68 0 100.13 7.85 128 0 71.23-22.09 140.39 0 107.87 0 107.87 0v343.76c0 16.18-13.12 29.29-29.29 29.29H29.29C13.12 795.87 0 782.76 0 766.58V422.81Z"></path><path fill="#00025F" fill-opacity=".2" d="M0 520.26s12.9-4.34 39.74 18.99 84.65 0 91.87 0 53.68-21.26 123.35 0 108.69 11.4 131.61 0 87.74-22.3 123.35 0v227.2c0 16.25-13.17 29.42-29.42 29.42H29.42C13.17 795.87 0 782.7 0 766.45V520.26Z"></path><path fill="#00025F" fill-opacity=".2" d="M0 667.87s32.52 1.45 64.52-12.18 72.26-8.05 98.06 0 69.16 31.48 136.26 2.22 114.58-2.22 114.58-2.22 47.48 29.11 96.52 0v110.24c0 16.53-13.4 29.94-29.94 29.94H29.94C13.4 795.87 0 782.47 0 765.93v-98.06Z"></path>',10),ze=[Pe];function Ue(t,e){return u(),m("svg",Re,ze)}const Ne={render:Ue},qe={class:"relative h-fit"},Ye={class:"absolute inset-x-[10%] top-[38%] bottom-0 grid grid-cols-5 grid-rows-4 place-items-center"},Ze=y({__name:"Iceberg",props:{data:null},setup(t){const a=G(t).data;return(s,n)=>{const l=He;return u(),m("div",qe,[x(r(Ne),{class:"absolute h-full w-full"}),r(a)[0]?(u(),w(l,{key:0,img:r(a)[0].img,text:r(a)[0].text,overwater:"",class:"absolute left-[32%] top-[7%]"},null,8,["img","text"])):$("",!0),r(a)[1]?(u(),w(l,{key:1,img:r(a)[1].img,text:r(a)[1].text,overwater:"",class:"absolute left-[20%] top-[18%]"},null,8,["img","text"])):$("",!0),r(a)[2]?(u(),w(l,{key:2,img:r(a)[2].img,text:r(a)[2].text,overwater:"",class:"absolute left-[35%] top-[18%]"},null,8,["img","text"])):$("",!0),r(a)[3]?(u(),w(l,{key:3,img:r(a)[3].img,text:r(a)[3].text,overwater:"",class:"absolute left-[50%] top-[18%]"},null,8,["img","text"])):$("",!0),r(a)[4]?(u(),w(l,{key:4,img:r(a)[4].img,text:r(a)[4].text,overwater:"",class:"absolute left-[15%] top-[28.5%]"},null,8,["img","text"])):$("",!0),r(a)[5]?(u(),w(l,{key:5,img:r(a)[5].img,text:r(a)[5].text,overwater:"",class:"absolute left-[32%] top-[28.5%]"},null,8,["img","text"])):$("",!0),r(a)[6]?(u(),w(l,{key:6,img:r(a)[6].img,text:r(a)[6].text,overwater:"",class:"absolute left-[48%] top-[28.5%]"},null,8,["img","text"])):$("",!0),r(a)[7]?(u(),w(l,{key:7,img:r(a)[7].img,text:r(a)[7].text,overwater:"",class:"absolute left-[65%] top-[28.5%]"},null,8,["img","text"])):$("",!0),i("div",Ye,[(u(!0),m(Y,null,ie(r(a).slice(8,29),(o,d)=>(u(),m(Y,{key:d+o},[o?(u(),w(l,{key:0,img:o.img,text:o.text,class:"w-10 h-10"},null,8,["img","text"])):$("",!0)],64))),128))])])}}}),Ve=t=>(H("data-v-bb96392b"),t=t(),R(),t),Ge={class:"flex flex-col items-center justify-center"},We=Ve(()=>i("h1",{class:"statistics-title text-center"},"Artists Popularity Iceberg",-1)),Je=y({__name:"ArtistIceberg",async setup(t){let e,a;const s=([e,a]=E(()=>C({endpoint:"/me/top/artists",query:{time_range:z[D("activeTimeframe").value],limit:50}})),e=await e,a(),e),n=[[],[],[],[],[],[],[]];s.items.forEach(o=>{o.popularity>90?n[0].push(o):o.popularity>80?n[1].push(o):o.popularity>70?n[2].push(o):o.popularity>60?n[3].push(o):o.popularity>50?n[4].push(o):o.popularity>40?n[5].push(o):n[6].push(o)}),n[0]=A(n[0],1),n[1]=A(n[1],3),n[2]=A(n[2],4),[3,4,5,6].forEach(o=>{n[o]=A(n[o],5)});const l=n.map(o=>Ce(o)).flat().flatMap(o=>o===null?null:{img:o.images[0].url,text:o.name});return(o,d)=>{const p=Ze;return u(),m("section",Ge,[We,x(p,{class:"w-[300px] h-[500px]",data:r(l)},null,8,["data"])])}}}),Ke=T(Je,[["__scopeId","data-v-bb96392b"]]),Qe=""+new URL("logout-icon.e22e5e34.png",import.meta.url).href,se=t=>(H("data-v-80f492bf"),t=t(),R(),t),Xe={class:"bg-gray z-[1] min-w-[100px] p-2"},et=se(()=>i("img",{src:Qe,alt:"",class:"h-5 inline-block"},null,-1)),tt=se(()=>i("span",null," Logout ",-1)),st=y({__name:"Menu",props:{me:null},setup(t){const e=t;return(a,s)=>{const n=ce;return u(),m("div",Xe,[i("p",null," Logged in as "+S(e.me.display_name),1),x(n,{to:"/logout",class:"no-tap-highlight"},{default:J(()=>[et,tt]),_:1})])}}}),at=T(st,[["__scopeId","data-v-80f492bf"]]),nt={"xml:space":"preserve",width:"168",height:"168",viewBox:"0 0 168.001 168.001",xmlns:"http://www.w3.org/2000/svg"},ot=i("path",{fill:"#1ED760",d:"M83.996.277C37.747.277.253 37.77.253 84.019c0 46.251 37.494 83.741 83.743 83.741 46.254 0 83.744-37.49 83.744-83.741 0-46.246-37.49-83.738-83.745-83.738l.001-.004zm38.404 120.78a5.217 5.217 0 0 1-7.18 1.73c-19.662-12.01-44.414-14.73-73.564-8.07a5.222 5.222 0 0 1-6.249-3.93 5.213 5.213 0 0 1 3.926-6.25c31.9-7.291 59.263-4.15 81.337 9.34 2.46 1.51 3.24 4.72 1.73 7.18zm10.25-22.805c-1.89 3.075-5.91 4.045-8.98 2.155-22.51-13.839-56.823-17.846-83.448-9.764-3.453 1.043-7.1-.903-8.148-4.35a6.538 6.538 0 0 1 4.354-8.143c30.413-9.228 68.222-4.758 94.072 11.127 3.07 1.89 4.04 5.91 2.15 8.976v-.001zm.88-23.744c-26.99-16.031-71.52-17.505-97.289-9.684-4.138 1.255-8.514-1.081-9.768-5.219a7.835 7.835 0 0 1 5.221-9.771c29.581-8.98 78.756-7.245 109.83 11.202a7.823 7.823 0 0 1 2.74 10.733c-2.2 3.722-7.02 4.949-10.73 2.739z"},null,-1),lt=[ot];function rt(t,e){return u(),m("svg",nt,lt)}const it={render:rt},ct={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 768 768"},ut=W('<path d="M326.02 379.48v60.93s-14.7 22.35-19.9 61.24c0 0-4.9 28.48 3.06 49.6 0 0-21.74 41.34-74.71 48.38-52.97 7.04-81.75-15.31-104.41-33.99-22.66-18.68-51.44-79-48.68-134.72 2.76-55.73 17.15-87.88 17.15-87.88s-.31-92.16 53.28-178.2c0 0 40.11-67.67 124.31-100.12C360.32 32.26 455.24 48.49 470.25 54c15 5.51 58.48 9.49 121.56 66.14 63.08 56.65 83.28 151.87 87.57 214.03 0 0 37.05 64.91 12.55 159.22-24.5 94.31-102.88 105.33-107.47 105.94-4.59.61-77.16 15.92-115.43-54.2 0 0 2.76-7.96 2.76-21.74 0 0 51.44-20.82 92.78-75.63 0 0 38.89-47.46 37.36-116.05 0 0-2.76-44.7-12.86-65.52 0 0 14.7 3.06 18.37 4.59 0 0-12.55-58.18-54.5-102.57-41.95-44.4-104.72-62.46-165.96-62.16-61.24.31-107.47 19.9-143.91 48.38 0 0-51.13 37.36-70.73 116.97 0 0 10.56-3.83 15.16-3.83 0 0-23.27 51.29-22.51 83.9 0 0-2.14 29.09 21.89 54.96s51.9 26.49 57.1 26.94c0 0 24.8 2.91 48.38-12.4 23.58-15.31 33.68-41.49 33.68-41.49Z" style="fill:#1db954;"></path><ellipse fill="#FFF" cx="388.13" cy="526.63" rx="59.59" ry="57.62"></ellipse><ellipse fill="#FFF" cx="248.28" cy="352.1" rx="59.59" ry="57.62"></ellipse><ellipse fill="#FFF" cx="386.77" cy="668.62" rx="59.59" ry="57.62"></ellipse><path fill="#FFF" d="m248.28 352.1-57.61-6.15c-.56 0-1.01-.45-.94-1.01 1.74-14.81 24.68-181.05 191.7-188.52 0 0 101.53-3.86 159.83 74.4 0 0 53.74 60.17 31.69 142.84s-80.38 109.77-96.91 120.79l-14.54 6.89s-7.95 3.65-11.18 9.19c0 0-3.69 6.18-2.61 16.1H328.53s-4.21-52.23 32.99-95.1c0 0 22.05-28.17 55.42-40.11 0 0 56.8-26.79 39.5-72.72 0 0-4.9-33.37-63.08-42.87 0 0-39.8-8.42-66.44 32.3 0 0-15.32 20.36-19.29 48.99l-59.36-5.03Z"></path>',5),dt=[ut];function ht(t,e){return u(),m("svg",ct,dt)}const pt={render:ht},_t=""+new URL("default-avatar.8660eeb0.svg?inline",import.meta.url).href,ft={class:"nav-bg h-12 w-full bg-gray p-1 relative"},mt={class:"h-full w-full relative"},gt=["src"],vt=y({__name:"Navbar",async setup(t){let e,a;const s=D("$pfbgD4BgAz"),n=([e,a]=E(()=>C({endpoint:"/me"})),e=await e,a(),e);function l(){s.value=!s.value}return(o,d)=>{var g,f;const p=at;return u(),m("nav",ft,[i("div",mt,[x(r(it),{class:"nav-element left-1"}),x(r(pt),{class:"nav-element left-[50%] translate-x-[-50%]"}),i("button",{class:"nav-element no-tap-highlight right-1",onClick:l},[i("img",{src:(f=(g=r(n).images[0])==null?void 0:g.url)!=null?f:r(_t),alt:"user",class:"h-full w-auto"},null,8,gt)])]),x(p,{me:r(n),class:O(["nav-menu absolute top-12 rounded-l-md max-w-[50%]",{"right-0":r(s),"right-[-51%]":!r(s)}])},null,8,["me","class"])])}}}),yt=T(vt,[["__scopeId","data-v-9bab7b9d"]]),bt={class:"w-full flex justify-around font-bold pt-1 pb-1"},wt=y({__name:"TimeframeSelection",setup(t){const e=D("activeTimeframe",()=>k.Month);return(a,s)=>(u(),m("div",bt,[i("span",{class:O(["cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors",[r(e)===r(k).Month?"before:w-full !text-white":"before:w-0"]]),onClick:s[0]||(s[0]=n=>e.value=r(k).Month)}," last month ",2),i("span",{class:O(["cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors",[r(e)===r(k).HalfYear?"before:w-full !text-white":"before:w-0"]]),onClick:s[1]||(s[1]=n=>e.value=r(k).HalfYear)}," last 6 months ",2),i("span",{class:O(["cursor-pointer relative hidden-green-underline hover:text-spotify-green transition-colors",[r(e)===r(k).Year?"before:w-full !text-white":"before:w-0"]]),onClick:s[2]||(s[2]=n=>e.value=r(k).Year)}," last year ",2)]))}}),xt=T(wt,[["__scopeId","data-v-5246c658"]]),$t={key:0,class:"bg-spotify-green bg-opacity-50 rounded-t-md"},Ct={key:0},kt={class:"flex h-16 justify-start"},Dt={class:"h-full p-1"},It=["src"],Mt={class:"my-auto"},Tt={class:"text-white"},St={class:"text-[#bbb]"},Et={class:"my-auto w-24 text-center self-center"},Lt={key:0,class:"flex align-baseline justify-evenly"},Ot={class:"h-1 relative overflow-hidden"},Ft=i("div",{class:"absolute bg-gray h-full w-full"},null,-1),jt={key:1,class:"text-center h-16"},At=y({__name:"MusicPlayer",async setup(t){let e,a;const s=D(()=>null,"$y4C0JPT9MN"),n=([e,a]=E(()=>C({endpoint:"/me"})),e=await e,a(),e),l=D(()=>({progress:0,percent:0,fetched:0}),"$pmQmXMhZQP");let o;ue(()=>{g(),o=setInterval(p,250)}),Z(()=>{clearInterval(o)});function d(c){if(c===null)return"~:~";const _=Math.floor(c/1e3);return`${Math.floor(_/60)}:${(_%60).toString().padStart(2,"0")}`}function p(){var v,I;const c=s.value;if(!((c==null?void 0:c.progress_ms)&&((v=c==null?void 0:c.item)==null?void 0:v.duration_ms)))return;let _=c.progress_ms;c.is_playing&&(_=c.progress_ms+(Date.now()-l.value.fetched)),_=Math.min(_,c.item.duration_ms),l.value={progress:_,percent:_/((I=c.item)==null?void 0:I.duration_ms),fetched:l.value.fetched}}function g(){C({endpoint:"/me/player",query:{additional_types:"track",market:n.country}}).then(c=>{s.value=c,l.value.fetched=Date.now(),setTimeout(()=>g(),2500)}).catch(c=>{console.error(c),setTimeout(()=>g(),1e4)})}function f(){C({endpoint:"/me/player/previous",method:"POST"}).catch(c=>{alert(c.message)})}function h(){s.value!==null&&(s.value.is_playing?C({endpoint:"/me/player/pause",method:"PUT",query:{device_id:s.value.device.id}}).catch(c=>{alert(c.message)}):C({endpoint:"/me/player/play",method:"PUT",query:{device_id:s.value.device.id}}).catch(c=>{alert(c.message)}))}function b(){C({endpoint:"/me/player/next",method:"POST"}).catch(c=>{alert(c.message)})}return(c,_)=>{var v;return u(),m("div",null,[r(s)?(u(),m("div",$t,[r(s).item?(u(),m("div",Ct,[i("div",kt,[i("div",Dt,[i("img",{class:"max-h-full",src:(v=r(s).item.album.images[0])==null?void 0:v.url,alt:"Album Cover"},null,8,It)]),i("div",Mt,[i("p",Tt,S(r(s).item.name),1),i("p",St,S(r(s).item.artists.map(I=>I.name).join(", ")),1)]),i("div",Et,[r(n).product==="premium"?(u(),m("div",Lt,[i("button",{onClick:_[0]||(_[0]=I=>f())},"\u23EE"),i("button",{onClick:_[1]||(_[1]=I=>h())},"\u23EF"),i("button",{onClick:_[2]||(_[2]=I=>b())},"\u23ED")])):$("",!0),i("p",null,S(d(r(l)?r(l).progress:null))+" / "+S(d(r(s).item.duration_ms)),1)])]),i("div",Ot,[Ft,i("div",{class:"absolute bg-white h-full",style:de({width:`${r(l).percent*100}%`})},null,4)])])):(u(),m("div",jt," Ad is playing "))])):$("",!0)])}}}),Bt={class:"flex flex-col items-center"},Ht={class:"w-[400px] relative"},Rt=y({__name:"home",setup(t){const e=D("currentSlide",()=>0),a=D("activeTimeframe",()=>k.Month),s=[Te,je,Ke],n=()=>{e.value++,e.value>=s.length&&(e.value=0)},l=()=>{e.value--,e.value<0&&(e.value=s.length-1)};return(o,d)=>{const p=yt,g=xt,f=At;return u(),m("section",Bt,[x(p),x(g,{class:"pb-5"}),i("div",Ht,[x(he,{name:"statistics",mode:"out-in"},{default:J(()=>[(u(),w(pe(s[r(e)]),{key:r(a),class:"min-h-[80vh]"}))]),_:1}),i("div",{class:"absolute top-0 flex w-full h-full"},[i("button",{class:"w-1/3 h-full no-tap-highlight",onClick:l}),i("button",{class:"w-2/3 h-full no-tap-highlight",onClick:n})])]),x(f,{class:"fixed left-0 bottom-0 right-0"})])}}});const Ut=T(Rt,[["__scopeId","data-v-1814ed20"]]);export{Ut as default};