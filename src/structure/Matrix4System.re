open Js.Typed_array;

open Contract;

let fromTranslation = (positionTypeArr: Float32Array.t, resultFloat32Arr) => {
  Float32Array.unsafe_set(resultFloat32Arr, 0, 1.);
  Float32Array.unsafe_set(resultFloat32Arr, 1, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 2, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 3, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 4, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 5, 1.);
  Float32Array.unsafe_set(resultFloat32Arr, 6, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 7, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 8, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 9, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 10, 1.);
  Float32Array.unsafe_set(resultFloat32Arr, 11, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 12, Float32Array.unsafe_get(positionTypeArr, 0));
  Float32Array.unsafe_set(resultFloat32Arr, 13, Float32Array.unsafe_get(positionTypeArr, 1));
  Float32Array.unsafe_set(resultFloat32Arr, 14, Float32Array.unsafe_get(positionTypeArr, 2));
  Float32Array.unsafe_set(resultFloat32Arr, 15, 1.);
  resultFloat32Arr
};

let getTranslationTypeArray = (matTypeArr) =>
  Float32Array.make([|
    Float32Array.unsafe_get(matTypeArr, 12),
    Float32Array.unsafe_get(matTypeArr, 13),
    Float32Array.unsafe_get(matTypeArr, 14)
  |]);

let getTranslationTuple = (matTypeArr) => (
  Float32Array.unsafe_get(matTypeArr, 12),
  Float32Array.unsafe_get(matTypeArr, 13),
  Float32Array.unsafe_get(matTypeArr, 14)
);

let multiply = (aMatTypeArr: Float32Array.t, bMatTypeArr: Float32Array.t, resultFloat32Arr) => {
  let a00 = Float32Array.unsafe_get(aMatTypeArr, 0);
  let a01 = Float32Array.unsafe_get(aMatTypeArr, 1);
  let a02 = Float32Array.unsafe_get(aMatTypeArr, 2);
  let a03 = Float32Array.unsafe_get(aMatTypeArr, 3);
  let a10 = Float32Array.unsafe_get(aMatTypeArr, 4);
  let a11 = Float32Array.unsafe_get(aMatTypeArr, 5);
  let a12 = Float32Array.unsafe_get(aMatTypeArr, 6);
  let a13 = Float32Array.unsafe_get(aMatTypeArr, 7);
  let a20 = Float32Array.unsafe_get(aMatTypeArr, 8);
  let a21 = Float32Array.unsafe_get(aMatTypeArr, 9);
  let a22 = Float32Array.unsafe_get(aMatTypeArr, 10);
  let a23 = Float32Array.unsafe_get(aMatTypeArr, 11);
  let a30 = Float32Array.unsafe_get(aMatTypeArr, 12);
  let a31 = Float32Array.unsafe_get(aMatTypeArr, 13);
  let a32 = Float32Array.unsafe_get(aMatTypeArr, 14);
  let a33 = Float32Array.unsafe_get(aMatTypeArr, 15);
  /* Cache only the current line of the second matrix */
  let b0 = ref(Float32Array.unsafe_get(bMatTypeArr, 0));
  let b1 = ref(Float32Array.unsafe_get(bMatTypeArr, 1));
  let b2 = ref(Float32Array.unsafe_get(bMatTypeArr, 2));
  let b3 = ref(Float32Array.unsafe_get(bMatTypeArr, 3));
  Float32Array.unsafe_set(
    resultFloat32Arr,
    0,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    1,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    2,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    3,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 4);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 5);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 6);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 7);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    4,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    5,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    6,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    7,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 8);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 9);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 10);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 11);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    8,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    9,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    10,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    11,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 12);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 13);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 14);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 15);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    12,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    13,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    14,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    15,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33
  );
  resultFloat32Arr
};

/* let buildPerspective = (fovy: float, aspect: float, near: float, far: float) => {
     requireCheck(
       () =>
         Contract.Operators.(
           test(
             "frustum shouldn't be null",
             () => {
               let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
               Js.Math.sin(fovy) <>=. 0.
             }
           )
         )
     );
     let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
     let s = Js.Math.sin(fovy);
     let rd = 1. /. (far -. near);
     let ct = Js.Math.cos(fovy) /. s;
     [|
       ct /. aspect,
       0.,
       0.,
       0.,
       0.,
       ct,
       0.,
       0.,
       0.,
       0.,
       -. (far +. near) *. rd,
       (-1.),
       0.,
       0.,
       (-2.) *. far *. near *. rd,
       0.
     |]
   };
   /*
   let invert = (mat: Js.Array.t(float)) => {
     let a00 = WonderCommonlib.ArraySystem.unsafeGet(mat, 0);
     let a01 = WonderCommonlib.ArraySystem.unsafeGet(mat, 1);
     let a02 = WonderCommonlib.ArraySystem.unsafeGet(mat, 2);
     let a03 = WonderCommonlib.ArraySystem.unsafeGet(mat, 3);
     let a10 = WonderCommonlib.ArraySystem.unsafeGet(mat, 4);
     let a11 = WonderCommonlib.ArraySystem.unsafeGet(mat, 5);
     let a12 = WonderCommonlib.ArraySystem.unsafeGet(mat, 6);
     let a13 = WonderCommonlib.ArraySystem.unsafeGet(mat, 7);
     let a20 = WonderCommonlib.ArraySystem.unsafeGet(mat, 8);
     let a21 = WonderCommonlib.ArraySystem.unsafeGet(mat, 9);
     let a22 = WonderCommonlib.ArraySystem.unsafeGet(mat, 10);
     let a23 = WonderCommonlib.ArraySystem.unsafeGet(mat, 11);
     let a30 = WonderCommonlib.ArraySystem.unsafeGet(mat, 12);
     let a31 = WonderCommonlib.ArraySystem.unsafeGet(mat, 13);
     let a32 = WonderCommonlib.ArraySystem.unsafeGet(mat, 14);
     let a33 = WonderCommonlib.ArraySystem.unsafeGet(mat, 15);
     let b00 = a00 *. a11 -. a01 *. a10;
     let b01 = a00 *. a12 -. a02 *. a10;
     let b02 = a00 *. a13 -. a03 *. a10;
     let b03 = a01 *. a12 -. a02 *. a11;
     let b04 = a01 *. a13 -. a03 *. a11;
     let b05 = a02 *. a13 -. a03 *. a12;
     let b06 = a20 *. a31 -. a21 *. a30;
     let b07 = a20 *. a32 -. a22 *. a30;
     let b08 = a20 *. a33 -. a23 *. a30;
     let b09 = a21 *. a32 -. a22 *. a31;
     let b10 = a21 *. a33 -. a23 *. a31;
     let b11 = a22 *. a33 -. a23 *. a32;
     /* Calculate the determinant */
     let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
     switch det^ {
     | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
     | _ =>
       det := 1.0 /. det^;
       [|
         (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
         (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
         (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
         (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
         (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
         (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
         (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
         (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
         (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
         (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
         (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
         (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
         (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
         (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
         (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
         (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
       |]
     }
   }; */
   let invert = (mat: Float32Array.t) => {
     let a00 = Float32Array.unsafe_get(mat, 0);
     let a01 = Float32Array.unsafe_get(mat, 1);
     let a02 = Float32Array.unsafe_get(mat, 2);
     let a03 = Float32Array.unsafe_get(mat, 3);
     let a10 = Float32Array.unsafe_get(mat, 4);
     let a11 = Float32Array.unsafe_get(mat, 5);
     let a12 = Float32Array.unsafe_get(mat, 6);
     let a13 = Float32Array.unsafe_get(mat, 7);
     let a20 = Float32Array.unsafe_get(mat, 8);
     let a21 = Float32Array.unsafe_get(mat, 9);
     let a22 = Float32Array.unsafe_get(mat, 10);
     let a23 = Float32Array.unsafe_get(mat, 11);
     let a30 = Float32Array.unsafe_get(mat, 12);
     let a31 = Float32Array.unsafe_get(mat, 13);
     let a32 = Float32Array.unsafe_get(mat, 14);
     let a33 = Float32Array.unsafe_get(mat, 15);
     let b00 = a00 *. a11 -. a01 *. a10;
     let b01 = a00 *. a12 -. a02 *. a10;
     let b02 = a00 *. a13 -. a03 *. a10;
     let b03 = a01 *. a12 -. a02 *. a11;
     let b04 = a01 *. a13 -. a03 *. a11;
     let b05 = a02 *. a13 -. a03 *. a12;
     let b06 = a20 *. a31 -. a21 *. a30;
     let b07 = a20 *. a32 -. a22 *. a30;
     let b08 = a20 *. a33 -. a23 *. a30;
     let b09 = a21 *. a32 -. a22 *. a31;
     let b10 = a21 *. a33 -. a23 *. a31;
     let b11 = a22 *. a33 -. a23 *. a32;
     /* Calculate the determinant */
     let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
     switch det^ {
     | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
     | _ =>
       det := 1.0 /. det^;
       Float32Array.make([|
         (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
         (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
         (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
         (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
         (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
         (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
         (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
         (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
         (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
         (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
         (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
         (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
         (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
         (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
         (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
         (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
       |])
     }
   }; */
let buildPerspective = (fovy: float, aspect: float, near: float, far: float) => {
  requireCheck(
    () =>
      Contract.Operators.(
        test(
          "frustum shouldn't be null",
          () => {
            let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
            Js.Math.sin(fovy) <>=. 0.
          }
        )
      )
  );
  let fovy = Js.Math._PI *. fovy /. 180. /. 2.;
  let s = Js.Math.sin(fovy);
  let rd = 1. /. (far -. near);
  let ct = Js.Math.cos(fovy) /. s;
  Float32Array.make([|
    ct /. aspect,
    0.,
    0.,
    0.,
    0.,
    ct,
    0.,
    0.,
    0.,
    0.,
    -. (far +. near) *. rd,
    (-1.),
    0.,
    0.,
    (-2.) *. far *. near *. rd,
    0.
  |])
};

/*
 let invert = (mat: Js.Array.t(float)) => {
   let a00 = WonderCommonlib.ArraySystem.unsafeGet(mat, 0);
   let a01 = WonderCommonlib.ArraySystem.unsafeGet(mat, 1);
   let a02 = WonderCommonlib.ArraySystem.unsafeGet(mat, 2);
   let a03 = WonderCommonlib.ArraySystem.unsafeGet(mat, 3);
   let a10 = WonderCommonlib.ArraySystem.unsafeGet(mat, 4);
   let a11 = WonderCommonlib.ArraySystem.unsafeGet(mat, 5);
   let a12 = WonderCommonlib.ArraySystem.unsafeGet(mat, 6);
   let a13 = WonderCommonlib.ArraySystem.unsafeGet(mat, 7);
   let a20 = WonderCommonlib.ArraySystem.unsafeGet(mat, 8);
   let a21 = WonderCommonlib.ArraySystem.unsafeGet(mat, 9);
   let a22 = WonderCommonlib.ArraySystem.unsafeGet(mat, 10);
   let a23 = WonderCommonlib.ArraySystem.unsafeGet(mat, 11);
   let a30 = WonderCommonlib.ArraySystem.unsafeGet(mat, 12);
   let a31 = WonderCommonlib.ArraySystem.unsafeGet(mat, 13);
   let a32 = WonderCommonlib.ArraySystem.unsafeGet(mat, 14);
   let a33 = WonderCommonlib.ArraySystem.unsafeGet(mat, 15);
   let b00 = a00 *. a11 -. a01 *. a10;
   let b01 = a00 *. a12 -. a02 *. a10;
   let b02 = a00 *. a13 -. a03 *. a10;
   let b03 = a01 *. a12 -. a02 *. a11;
   let b04 = a01 *. a13 -. a03 *. a11;
   let b05 = a02 *. a13 -. a03 *. a12;
   let b06 = a20 *. a31 -. a21 *. a30;
   let b07 = a20 *. a32 -. a22 *. a30;
   let b08 = a20 *. a33 -. a23 *. a30;
   let b09 = a21 *. a32 -. a22 *. a31;
   let b10 = a21 *. a33 -. a23 *. a31;
   let b11 = a22 *. a33 -. a23 *. a32;
   /* Calculate the determinant */
   let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
   switch det^ {
   | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
   | _ =>
     det := 1.0 /. det^;
     [|
       (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
       (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
       (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
       (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
       (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
       (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
       (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
       (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
       (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
       (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
       (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
       (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
       (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
       (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
       (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
       (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
     |]
   }
 }; */
let invert = (mat: Float32Array.t) => {
  let a00 = Float32Array.unsafe_get(mat, 0);
  let a01 = Float32Array.unsafe_get(mat, 1);
  let a02 = Float32Array.unsafe_get(mat, 2);
  let a03 = Float32Array.unsafe_get(mat, 3);
  let a10 = Float32Array.unsafe_get(mat, 4);
  let a11 = Float32Array.unsafe_get(mat, 5);
  let a12 = Float32Array.unsafe_get(mat, 6);
  let a13 = Float32Array.unsafe_get(mat, 7);
  let a20 = Float32Array.unsafe_get(mat, 8);
  let a21 = Float32Array.unsafe_get(mat, 9);
  let a22 = Float32Array.unsafe_get(mat, 10);
  let a23 = Float32Array.unsafe_get(mat, 11);
  let a30 = Float32Array.unsafe_get(mat, 12);
  let a31 = Float32Array.unsafe_get(mat, 13);
  let a32 = Float32Array.unsafe_get(mat, 14);
  let a33 = Float32Array.unsafe_get(mat, 15);
  let b00 = a00 *. a11 -. a01 *. a10;
  let b01 = a00 *. a12 -. a02 *. a10;
  let b02 = a00 *. a13 -. a03 *. a10;
  let b03 = a01 *. a12 -. a02 *. a11;
  let b04 = a01 *. a13 -. a03 *. a11;
  let b05 = a02 *. a13 -. a03 *. a12;
  let b06 = a20 *. a31 -. a21 *. a30;
  let b07 = a20 *. a32 -. a22 *. a30;
  let b08 = a20 *. a33 -. a23 *. a30;
  let b09 = a21 *. a32 -. a22 *. a31;
  let b10 = a21 *. a33 -. a23 *. a31;
  let b11 = a22 *. a33 -. a23 *. a32;
  /* Calculate the determinant */
  let det = ref(b00 *. b11 -. b01 *. b10 +. b02 *. b09 +. b03 *. b08 -. b04 *. b07 +. b05 *. b06);
  switch det^ {
  | 0. => ExceptionHandleSystem.throwMessage("det shouldn't be 0.")
  | _ =>
    det := 1.0 /. det^;
    Float32Array.make([|
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^
    |])
  }
};