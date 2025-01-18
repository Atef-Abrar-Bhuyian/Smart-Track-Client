import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const ReactHelmet = ({title}) => {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title> SmartTrack | {title}</title>
        </Helmet>
      </HelmetProvider>
    </div>
  );
};

export default ReactHelmet;
