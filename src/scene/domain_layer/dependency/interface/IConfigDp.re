type otherConfig = {getIsDebug: unit => bool};

type poConfig = {getTransformCount: unit => int};

type config = {
  otherConfig,
  poConfig,
};
