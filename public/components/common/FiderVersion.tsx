import * as React from "react";

export const FiderVersion = () => {
  return (
    <p className="info center hidden-sm hidden-md">
      Support our{" "}
      <a target="_blank" href="http://opencollective.com/fider">
        OpenCollective
      </a>
      <br />
      Fider v{Fider.settings.version}
    </p>
  );
};
