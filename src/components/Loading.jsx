import React from "react";
import "./Loader.css";
function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center caret-transparent">
<div class="loader">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
</div>

    </div>
  );
}

export default Loading;
