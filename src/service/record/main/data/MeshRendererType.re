open ComponentType;

type meshRenderer = int;

type renderGameObjectMap =
  WonderCommonlib.SparseMapService.t(GameObjectPrimitiveType.gameObject);

type isRender =
  | Not_render
  | Render;

type meshRendererRecord = {
  index: int,
  buffer: WorkerType.sharedArrayBuffer,
  drawModes: Js.Typed_array.Uint8Array.t,
  isRenders: Js.Typed_array.Uint8Array.t,
  basicMaterialRenderGameObjectMap: renderGameObjectMap,
  lightMaterialRenderGameObjectMap: renderGameObjectMap,
  gameObjectMap,
  disposedIndexArray: array(meshRenderer),
};

external uint8ToIsRender : Js.Typed_array.Uint8Array.elt => isRender =
  "%identity";

external isRenderToUint8 : isRender => Js.Typed_array.Uint8Array.elt =
  "%identity";