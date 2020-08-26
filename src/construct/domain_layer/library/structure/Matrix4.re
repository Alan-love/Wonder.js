open Js.Typed_array;

type t = Float32Array.t;

let fromTranslationRotationScale =
    (resultFloat32Arr, (tx, ty, tz), (x, y, z, w), (sx, sy, sz)) => {
  let x2 = x +. x;
  let y2 = y +. y;
  let z2 = z +. z;

  let xx = x *. x2;
  let xy = x *. y2;
  let xz = x *. z2;
  let yy = y *. y2;
  let yz = y *. z2;
  let zz = z *. z2;
  let wx = w *. x2;
  let wy = w *. y2;
  let wz = w *. z2;

  Float32Array.unsafe_set(resultFloat32Arr, 0, (1. -. (yy +. zz)) *. sx);
  Float32Array.unsafe_set(resultFloat32Arr, 1, (xy +. wz) *. sx);
  Float32Array.unsafe_set(resultFloat32Arr, 2, (xz -. wy) *. sx);
  Float32Array.unsafe_set(resultFloat32Arr, 3, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 4, (xy -. wz) *. sy);
  Float32Array.unsafe_set(resultFloat32Arr, 5, (1. -. (xx +. zz)) *. sy);
  Float32Array.unsafe_set(resultFloat32Arr, 6, (yz +. wx) *. sy);
  Float32Array.unsafe_set(resultFloat32Arr, 7, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 8, (xz +. wy) *. sz);
  Float32Array.unsafe_set(resultFloat32Arr, 9, (yz -. wx) *. sz);
  Float32Array.unsafe_set(resultFloat32Arr, 10, (1. -. (xx +. yy)) *. sz);
  Float32Array.unsafe_set(resultFloat32Arr, 11, 0.);
  Float32Array.unsafe_set(resultFloat32Arr, 12, tx);
  Float32Array.unsafe_set(resultFloat32Arr, 13, ty);
  Float32Array.unsafe_set(resultFloat32Arr, 14, tz);
  Float32Array.unsafe_set(resultFloat32Arr, 15, 1.);

  resultFloat32Arr;
};

let multiply =
    (
      resultFloat32Arr,
      aMatTypeArr: Float32Array.t,
      bMatTypeArr: Float32Array.t,
    ) => {
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
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    1,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    2,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    3,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33,
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 4);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 5);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 6);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 7);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    4,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    5,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    6,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    7,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33,
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 8);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 9);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 10);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 11);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    8,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    9,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    10,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    11,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33,
  );
  b0 := Float32Array.unsafe_get(bMatTypeArr, 12);
  b1 := Float32Array.unsafe_get(bMatTypeArr, 13);
  b2 := Float32Array.unsafe_get(bMatTypeArr, 14);
  b3 := Float32Array.unsafe_get(bMatTypeArr, 15);
  Float32Array.unsafe_set(
    resultFloat32Arr,
    12,
    b0^ *. a00 +. b1^ *. a10 +. b2^ *. a20 +. b3^ *. a30,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    13,
    b0^ *. a01 +. b1^ *. a11 +. b2^ *. a21 +. b3^ *. a31,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    14,
    b0^ *. a02 +. b1^ *. a12 +. b2^ *. a22 +. b3^ *. a32,
  );
  Float32Array.unsafe_set(
    resultFloat32Arr,
    15,
    b0^ *. a03 +. b1^ *. a13 +. b2^ *. a23 +. b3^ *. a33,
  );

  resultFloat32Arr;
};

let getTranslationTuple = matTypeArr => (
  Float32Array.unsafe_get(matTypeArr, 12),
  Float32Array.unsafe_get(matTypeArr, 13),
  Float32Array.unsafe_get(matTypeArr, 14),
);

let getRotationTuple = matTypeArr => {
  let trace =
    Float32Array.unsafe_get(matTypeArr, 0)
    +. Float32Array.unsafe_get(matTypeArr, 5)
    +. Float32Array.unsafe_get(matTypeArr, 10);

  if (trace > 0.) {
    let s = Js.Math.sqrt(trace +. 1.0) *. 2.;
    (
      (
        Float32Array.unsafe_get(matTypeArr, 6)
        -. Float32Array.unsafe_get(matTypeArr, 9)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 8)
        -. Float32Array.unsafe_get(matTypeArr, 2)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 1)
        -. Float32Array.unsafe_get(matTypeArr, 4)
      )
      /. s,
      0.25 *. s,
    );
  } else if (Float32Array.unsafe_get(matTypeArr, 0)
             > Float32Array.unsafe_get(matTypeArr, 5)
             && Float32Array.unsafe_get(matTypeArr, 0)
             > Float32Array.unsafe_get(matTypeArr, 10)) {
    let s =
      Js.Math.sqrt(
        1.0
        +. Float32Array.unsafe_get(matTypeArr, 0)
        -. Float32Array.unsafe_get(matTypeArr, 5)
        -. Float32Array.unsafe_get(matTypeArr, 10),
      )
      *. 2.;
    (
      0.25 *. s,
      (
        Float32Array.unsafe_get(matTypeArr, 1)
        +. Float32Array.unsafe_get(matTypeArr, 4)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 8)
        +. Float32Array.unsafe_get(matTypeArr, 2)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 6)
        -. Float32Array.unsafe_get(matTypeArr, 9)
      )
      /. s,
    );
  } else if (Float32Array.unsafe_get(matTypeArr, 5)
             > Float32Array.unsafe_get(matTypeArr, 10)) {
    let s =
      Js.Math.sqrt(
        1.0
        +. Float32Array.unsafe_get(matTypeArr, 5)
        -. Float32Array.unsafe_get(matTypeArr, 0)
        -. Float32Array.unsafe_get(matTypeArr, 10),
      )
      *. 2.;
    (
      (
        Float32Array.unsafe_get(matTypeArr, 1)
        +. Float32Array.unsafe_get(matTypeArr, 4)
      )
      /. s,
      0.25 *. s,
      (
        Float32Array.unsafe_get(matTypeArr, 6)
        +. Float32Array.unsafe_get(matTypeArr, 9)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 8)
        -. Float32Array.unsafe_get(matTypeArr, 2)
      )
      /. s,
    );
  } else {
    let s =
      Js.Math.sqrt(
        1.0
        +. Float32Array.unsafe_get(matTypeArr, 10)
        -. Float32Array.unsafe_get(matTypeArr, 0)
        -. Float32Array.unsafe_get(matTypeArr, 5),
      )
      *. 2.;
    (
      (
        Float32Array.unsafe_get(matTypeArr, 8)
        +. Float32Array.unsafe_get(matTypeArr, 2)
      )
      /. s,
      (
        Float32Array.unsafe_get(matTypeArr, 6)
        +. Float32Array.unsafe_get(matTypeArr, 9)
      )
      /. s,
      0.25 *. s,
      (
        Float32Array.unsafe_get(matTypeArr, 1)
        -. Float32Array.unsafe_get(matTypeArr, 4)
      )
      /. s,
    );
  };
};

let getScaleTuple = matTypeArr => {
  let m11 = Float32Array.unsafe_get(matTypeArr, 0);
  let m12 = Float32Array.unsafe_get(matTypeArr, 1);
  let m13 = Float32Array.unsafe_get(matTypeArr, 2);
  let m21 = Float32Array.unsafe_get(matTypeArr, 4);
  let m22 = Float32Array.unsafe_get(matTypeArr, 5);
  let m23 = Float32Array.unsafe_get(matTypeArr, 6);
  let m31 = Float32Array.unsafe_get(matTypeArr, 8);
  let m32 = Float32Array.unsafe_get(matTypeArr, 9);
  let m33 = Float32Array.unsafe_get(matTypeArr, 10);
  (
    Js.Math.sqrt(m11 *. m11 +. m12 *. m12 +. m13 *. m13),
    Js.Math.sqrt(m21 *. m21 +. m22 *. m22 +. m23 *. m23),
    Js.Math.sqrt(m31 *. m31 +. m32 *. m32 +. m33 *. m33),
  );
};

let invert = (resultFloat32Arr, mat: Float32Array.t) => {
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
  let det =
    ref(
      b00
      *. b11
      -. b01
      *. b10
      +. b02
      *. b09
      +. b03
      *. b08
      -. b04
      *. b07
      +. b05
      *. b06,
    );
  switch (det^) {
  | 0. =>
    Result.fail(
      Log.buildFatalMessage(
        ~title="invert",
        ~description={j|det shouldn't be 0.|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  | _ =>
    det := 1.0 /. det^;
    Float32Array.unsafe_set(
      resultFloat32Arr,
      0,
      (a11 *. b11 -. a12 *. b10 +. a13 *. b09) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      1,
      (a02 *. b10 -. a01 *. b11 -. a03 *. b09) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      2,
      (a31 *. b05 -. a32 *. b04 +. a33 *. b03) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      3,
      (a22 *. b04 -. a21 *. b05 -. a23 *. b03) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      4,
      (a12 *. b08 -. a10 *. b11 -. a13 *. b07) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      5,
      (a00 *. b11 -. a02 *. b08 +. a03 *. b07) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      6,
      (a32 *. b02 -. a30 *. b05 -. a33 *. b01) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      7,
      (a20 *. b05 -. a22 *. b02 +. a23 *. b01) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      8,
      (a10 *. b10 -. a11 *. b08 +. a13 *. b06) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      9,
      (a01 *. b08 -. a00 *. b10 -. a03 *. b06) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      10,
      (a30 *. b04 -. a31 *. b02 +. a33 *. b00) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      11,
      (a21 *. b02 -. a20 *. b04 -. a23 *. b00) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      12,
      (a11 *. b07 -. a10 *. b09 -. a12 *. b06) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      13,
      (a00 *. b09 -. a01 *. b07 +. a02 *. b06) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      14,
      (a31 *. b01 -. a30 *. b03 -. a32 *. b00) *. det^,
    );
    Float32Array.unsafe_set(
      resultFloat32Arr,
      15,
      (a20 *. b03 -. a21 *. b01 +. a22 *. b00) *. det^,
    );

    resultFloat32Arr->Result.succeed;
  };
};

let getEulerAngles = matTypeArr => {
  let (sx, sy, sz) = getScaleTuple(matTypeArr);

  let a00 = Float32Array.unsafe_get(matTypeArr, 0);
  let a01 = Float32Array.unsafe_get(matTypeArr, 1);
  let a02 = Float32Array.unsafe_get(matTypeArr, 2);
  let a10 = Float32Array.unsafe_get(matTypeArr, 4);
  let a11 = Float32Array.unsafe_get(matTypeArr, 5);
  let a12 = Float32Array.unsafe_get(matTypeArr, 6);
  let a22 = Float32Array.unsafe_get(matTypeArr, 10);

  let y = Js.Math.asin(-. a02 /. sx);
  let halfPi = Js.Math._PI *. 0.5;

  let x = ref(0.);
  let z = ref(0.);
  if (y < halfPi) {
    if (y > -. halfPi) {
      x := Js.Math.atan2(~y=a12 /. sy, ~x=a22 /. sz, ());
      z := Js.Math.atan2(~y=a01 /. sx, ~x=a00 /. sx, ());
    } else {
      /* Not a unique solution */
      z := 0.;
      x := -. Js.Math.atan2(~x=a10 /. sy, ~y=a11 /. sy, ());
    };
  } else {
    /* Not a unique solution */
    z := 0.;
    x := Js.Math.atan2(~x=a10 /. sy, ~y=a11 /. sy, ());
  };

  Vector3.scale(Vector3.Float, Angle.getRadToDeg(), (x^, y, z^));
};
