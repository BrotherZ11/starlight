import React from "react";

function Slots() {
  return (
    <div>
      <h2>Slots</h2>
      {/* Cambia el enlace a tu video de YouTube */}
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    
  );
}

export default Slots;
