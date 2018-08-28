open SourceTextureType;

let getGlFormat = (gl, format) =>
  switch (format) {
  | Rgb => gl |> WonderWebgl.Gl.getRgb
  | Rgba => gl |> WonderWebgl.Gl.getRgba
  | Alpha => gl |> WonderWebgl.Gl.getAlpha
  | Luminance => gl |> WonderWebgl.Gl.getLuminance
  | LuminanceAlpha => gl |> WonderWebgl.Gl.getLuminanceAlpha
  | Rgbs3tcdxt1 => gl |> WonderWebgl.Gl.getRgbS3tcDxt1
  | Rgbas3tcdxt1 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt1
  | Rgbas3tcdxt3 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt3
  | Rgbas3tcdxt5 => gl |> WonderWebgl.Gl.getRgbaS3tcDxt5
  };