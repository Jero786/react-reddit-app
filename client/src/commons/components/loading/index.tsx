import React from "react";
import { LoadingWrapper } from "./styles";

export const Loading = () => (
  <LoadingWrapper
    data-testid="locator-loading"
    className="mdl-progress mdl-js-progress mdl-progress__indeterminate"
  />
);
