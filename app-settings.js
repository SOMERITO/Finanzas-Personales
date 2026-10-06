"use strict";
const settingsState={theme:localStorage.getItem("cfo_pro_theme")||"system"};
const settings={};
Object.defineProperty(settings,"theme",{enumerable:true,get:()=>settingsState.theme,set:value=>{settingsState.theme=value;localStorage.setItem("cfo_pro_theme",value)}});
function persistTheme(){localStorage.setItem("cfo_pro_theme",settings.theme)}
function applyTheme(){let theme=settings.theme;if(theme==="system")theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.body.classList.toggle("dark",theme==="dark")}
