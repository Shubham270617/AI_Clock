import React from "react";
import ClockWidget from "./Components/ClockWidget";
import JarvisSidebar from "./Components/JarvisSidebar";
import AIBootScreen from "./Components/AIBootScreen";
import AIHeartbeatOverlay from "./Components/AIHeartbeatOverlay";
function App() {
  return (
    <div className="h-screen w-screen bg-black relative overflow-hidden">
      {/* Boot overlay on top */}
      <AIBootScreen />

      {/* Main UI always rendered below */}
      <JarvisSidebar />
      <AIHeartbeatOverlay/>
      <ClockWidget />
    </div>
  );
}

export default App;
