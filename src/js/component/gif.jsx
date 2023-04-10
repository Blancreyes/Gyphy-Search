import React from "react";

export default function GIF ({title, url}) {
    return (
        <div>
            <h4>{title}</h4>
            <img src={url}/>
        </div>
        )
    
}