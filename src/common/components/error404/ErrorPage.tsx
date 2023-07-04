import React from "react";
import error404 from "../../../assets/404.svg";


export const ErrorPage = () => {

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <img src={error404} alt={"404"} />
      </p>
    </div>
  );
};
