let convertToBasicCameraViews =
    ({scenes, scene, cameras}: GLTFType.gltf)
    : WDType.basicCameraViews => {
  let count =
    switch (cameras) {
    | None => 0
    | Some(cameras) => cameras |> Js.Array.length
    };

  {
    count,
    /* TODO test */
    isActiveIndex: {
      let defaultIsActiveIndex = count > 0 ? Some(0) : None;

      switch (ConvertCommon.getScene(scenes, scene).extras) {
      | None => defaultIsActiveIndex
      | Some({isActiveCameraIndex}) =>
        switch (isActiveCameraIndex) {
        | None => defaultIsActiveIndex
        | Some(isActiveCameraIndex) => Some(isActiveCameraIndex)
        }
      };
    },
  };
};

let _convertRadiansToDegree = angle => angle *. 180. /. Js.Math._PI;

let convertToPerspectiveCameraProjections = ({cameras}: GLTFType.gltf) =>
  switch (cameras) {
  | None => [||]
  | Some(cameras) =>
    cameras
    |> WonderCommonlib.ArrayService.reduceOneParam(
         (. arr, {type_, perspective}: GLTFType.camera) =>
           switch (type_) {
           | "perspective" =>
             let {aspectRatio, yfov, zfar, znear}: GLTFType.perspective =
               perspective |> OptionService.unsafeGet;
             arr
             |> ArrayService.push(
                  {
                    near: znear,
                    far: zfar,
                    fovy: yfov |> _convertRadiansToDegree,
                    aspect: aspectRatio,
                  }: WDType.perspectiveCameraProjection,
                );
           | _ => arr
           },
         [||],
       )
  };

let convertToArcballCameraControllers = ({extras}: GLTFType.gltf) =>
  switch (extras) {
  | None => [||]
  | Some({arcballCameraControllers}) =>
    switch (arcballCameraControllers) {
    | None => [||]
    | Some(arcballCameraControllers) =>
      arcballCameraControllers
      |> WonderCommonlib.ArrayService.reduceOneParam(
           (. arr, data) => arr |> ArrayService.push(data),
           [||],
         )
    }
  };