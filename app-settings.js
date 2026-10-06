"use strict";
let settings={theme:localStorage.getItem("cfo_pro_theme")||"system"};
function persistTheme(){localStorage.setItem("cfo_pro_theme",settings.theme)}
function applyTheme(){let theme=settings.theme;if(theme==="system")theme=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.body.classList.toggle("dark",theme==="dark")}
