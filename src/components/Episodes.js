import React from "react";

const Episodes = ({ episodes }) => {
    return (
        <div className="episodes">
            <h2>{episodes.lengh} episodios</h2>
            <ul>
                {episodes.map((episode) => (
                    <li key={episode.id.attributes["im:id"]}>
                        <a href={episode.link.attributes.href} target='blank' rel='noreferrer' >
                            {episode["im:name"].label}
                        </a>
                        <p>{episode['im:relaseDate'].attributes.label}</p>
                        <p>{episode['im:duration'].label}</p>
                    </li>           
                ))}
            </ul>
        </div>
    );

};

export default Episodes; 