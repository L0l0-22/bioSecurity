import React from "react";
import logo from "./assets/Logoonly.png"; 

export default function Loading() {
return (
    <div className="flex items-center justify-center h-screen">
    <img
        src={logo}
        alt="Loading..."
        className="w-20 h-20 animate-spin"
    />
    </div>
);
}
