open ComponentPOType;

type transform = index;

type parent = transform;

type child = transform;

type children = list(child);

type position = (float, float, float);

type rotation = (float, float, float, float);

type scale = (float, float, float);

type localToWorldMatrix = Js.Typed_array.Float32Array.t;

type eulerAngles = (float, float, float);
