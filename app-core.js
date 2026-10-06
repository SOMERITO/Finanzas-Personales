"use strict";
const V=200, STORE="cfo_pro_v200", LEGACY="cfo_v110_arch", SETTINGS="cfo_pro_settings";
const MONTHS=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const uid=p=>`${p}-${crypto.randomUUID?.()||Date.now()+Math.random().toString(16).slice(2)}`;
const money=n=>`S/ ${(Number(n)||0).toLocaleString("es-PE",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
const amount=v=>{const n=Number(String(v??"").replace(",","."));return Number.isFinite(n)?n:0};
const esc=v=>String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const clamp=(n,a,b)=>Math.min(b,Math.max(a,n));
const dateKey=(y,m,d)=>`${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
const today=()=>{const d=new Date();return dateKey(d.getFullYear(),d.getMonth(),d.getDate())};
const copy=o=>JSON.parse(JSON.stringify(o));
const defaults=()=>({theme:"system",defaultMonth:new Date().getMonth(),yearOpeningBalance:0,jsonbinId:"",jsonbinKey:""});
let settings=(()=>{try{return {...defaults(),...JSON.parse(localStorage.getItem(SETTINGS)||"{}")}}catch{return defaults()}})();
function blankMonth(){return {openingBalance:0,sections:[
 {id:uid("sec"),title:"Ingresos",type:"income",items:[{id:uid("item"),name:"Sueldo",amount:0}],collapsed:false},
 {id:uid("sec"),title:"Gastos Fijos",type:"expense",items:[{id:uid("item"),name:"Alquiler",amount:0}],collapsed:false},
 {id:uid("sec"),title:"Gastos Variables",type:"expense",items:[{id:uid("item"),name:"Alimentación",amount:0}],collapsed:false},
 {id:uid("sec"),title:"Ahorro",type:"savings",items:[{id:uid("item"),name:"Fondo de emergencia",amount:0}],collapsed:false}]}}
function emptyState(){return {version:V,year:new Date().getFullYear(),activeMonth:new Date().getMonth(),months:Array.from({length:12},blankMonth),goals:[{id:uid("goal"),name:"Fondo de emergencia",target:5000,contributions:{}}],events:[]}}
