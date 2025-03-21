import { useState, useEffect } from "react";

const Comic = ({ key, elem }) => {
  console.log(elem);

  return (
    <div className="ContainerFiche">
      <div className="Fiche" key={key}>
        <h2>{elem.title}</h2>
        <p>{elem.description}</p>
      </div>
      <div className="Fiche">
        <img
          src={
            elem.thumbnail.path +
            "/portrait_xlarge" +
            "." +
            elem.thumbnail.extension
          }
          alt="img du comic"
        />
      </div>
    </div>
  );
};

export default Comic;
