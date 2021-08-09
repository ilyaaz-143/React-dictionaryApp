import React from "react";
import { useState } from "react";

const Definition = ({ meanning, word, lang }) => {
  return (
    <div className="information">
      <h1>{word ? word : "Type Word"}</h1>
      <div className="audioDiv">
        {meanning[0] && word && lang === "en" && (
          <audio
            className="audio"
            src={meanning[0].phonetics[0] && meanning[0].phonetics[0].audio}
            controls
          >
            No Audio
          </audio>
        )}
      </div>
      {word !== ""
        ? !meanning.title
          ? meanning.map((mean, index) => {
              // console.log(mean);
              return (
                <div key={index}>
                  <h3>
                    {mean.origin !== undefined
                      ? `phonetic: ${mean.phonetic}`
                      : ""}
                  </h3>
                  <p>{mean.origin}</p>
                </div>
              );
            })
          : meanning.message
        : ""}
      <div>
        {word !== ""
          ? !meanning.title &&
            meanning.map((mean, index) =>
              mean.meanings.map((def) =>
                def.definitions.map((definition, index) => (
                  <div key={index} className="definitions">
                    <h4>
                      <b>
                        {definition.definition === null
                          ? ""
                          : `Definition: ${definition.definition}`}
                      </b>
                    </h4>
                    <h5>
                      {definition.example === undefined
                        ? ""
                        : `Example: ${definition.example}`}
                    </h5>
                    <p>
                      {definition.synonyms === undefined ||
                      definition.synonyms.length < 1
                        ? ""
                        : `synonyms: ${definition.synonyms}`}
                    </p>
                  </div>
                ))
              )
            )
          : // : meanning.message
            ""}
      </div>
    </div>
  );
};
export default Definition;
