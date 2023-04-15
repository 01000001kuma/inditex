import React from "react";

const Sidebar = ({ podcast }) => {

    return (
        <div className="sidebar">
        <img src={podcast['im:image'][0].label} alt={podcast['im:name'].label} />
        <h1>{podcast['im:name'].label}</h1>
        <p>{podcast['im:artist'].label}</p>
        <p>{podcast.summary.label}</p>
        </div>
    );

};

export default Sidebar;