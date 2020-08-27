type link =
  | Merge
  | Concat;

type elementType =
  | Job
  | Group;

type elementName = string;

type element = {
  name: elementName,
  type_: elementType,
};

type groupName = string;

type group = {
  name: groupName,
  link,
  elements: list(element),
};

type pipelineName = string;

type pipelineData = {
  name: pipelineName,
  groups: list(group),
  firstGroup: groupName,
};

type execFunc = unit => WonderBsMost.Most.stream(unit);
