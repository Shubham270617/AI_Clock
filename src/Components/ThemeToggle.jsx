import React from "react";

export default function ThemeToggle({theme, setTheme, widgetMode, setWidgetMode}){
  return (
    <div style={{position:"fixed", left:20, top:20, zIndex:60}}>
      <div className="bg-black/50 p-2 rounded-lg clock-card">
        <div className="flex gap-2 items-center">
          <select value={theme} onChange={e=> setTheme(e.target.value)} className="p-1 rounded">
            <option value="fire">Fire</option>
            <option value="ice">Ice</option>
            <option value="galaxy">Galaxy</option>
            <option value="aurora">Aurora</option>
          </select>
          <button onClick={()=> setWidgetMode(!widgetMode)} className="ml-2 px-2 bg-orange-500 rounded">{widgetMode ? "Exit widget" : "Widget"}</button>
        </div>
      </div>
    </div>
  );
}
