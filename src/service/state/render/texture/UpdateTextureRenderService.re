open StateRenderType;

open RenderTextureType;

open BrowserDetectType;

let _isPowerOfTwo = (value) => value land (value - 1) === 0 && value !== 0;

let _isSourcePowerOfTwo = (width, height) => _isPowerOfTwo(width) && _isPowerOfTwo(height);

let _filterFallback = (filter, gl) =>
  if (filter === TextureFilterService.getNearest()
      || filter === TextureFilterService.getNearestMipmapNearest()
      || filter === TextureFilterService.getNearestMipmapLinear()) {
    Gl.getNearest(gl)
  } else {
    Gl.getLinear(gl)
  };

let _setTextureParameters =
    (gl, target, isSourcePowerOfTwo, (glWrapS, glWrapT, magFilter, minFilter)) =>
  isSourcePowerOfTwo ?
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, glWrapS);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, glWrapT);
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMagFilter,
           magFilter |> TextureFilterService.getGlFilter(gl)
         );
      gl
      |> Gl.texParameteri(
           target,
           gl |> Gl.getTextureMinFilter,
           minFilter |> TextureFilterService.getGlFilter(gl)
         )
    } :
    {
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapS, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureWrapT, gl |> Gl.getClampToEdge);
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMagFilter, _filterFallback(magFilter, gl));
      gl |> Gl.texParameteri(target, gl |> Gl.getTextureMinFilter, _filterFallback(minFilter, gl))
    };

let _drawTexture = (gl, (target, index, source, glFormat, glType)) =>
  gl
  |> Gl.texImage2D(
       target,
       index,
       glFormat,
       glFormat,
       glType,
       source |> Gl.imageElementToTextureSource
     );

let _drawNoMipmapTwoDTexture = (gl, (target, glFormat, glType), source) =>
  _drawTexture(gl, (target, 0, source, glFormat, glType));

let _allocateSourceToTexture = (gl, paramTuple, source) =>
  _drawNoMipmapTwoDTexture(gl, paramTuple, source);

let update = (gl, texture, {textureRecord, browserDetectRecord} as state) => {
  let {sourceMap, wrapSs, wrapTs, magFilters, minFilters, formats, types, isNeedUpdates, setFlipYFunc} = textureRecord;
  switch (TextureSourceMapService.getSource(texture, sourceMap)) {
  | None => state
  | Some(source) =>
    let width = TextureSizeService.getWidth(source);
    let height = TextureSizeService.getHeight(source);
    let glWrapS =
      OperateTypeArrayTextureService.getWrapS(texture, wrapSs)
      |> TextureWrapService.getGlWrap(gl);
    let glWrapT =
      OperateTypeArrayTextureService.getWrapT(texture, wrapTs) |> TextureWrapService.getGlWrap(gl);
    let magFilter = OperateTypeArrayTextureService.getMagFilter(texture, magFilters);
    let minFilter = OperateTypeArrayTextureService.getMinFilter(texture, minFilters);
    let glFormat =
      OperateTypeArrayTextureService.getFormat(texture, formats) |> TextureFormatService.getGlFormat(gl);
    let glType = OperateTypeArrayTextureService.getType(texture, types) |> TextureTypeService.getGlType(gl);
    let flipY = OperateTypeArrayTextureService.getFlipY();
    let target = Gl.getTexture2D(gl);
    let isSourcePowerOfTwo = _isSourcePowerOfTwo(width, height);
    setFlipYFunc(gl, flipY, browserDetectRecord);
    /* TODO handle _needClampMaxSize
       if(_needClampMaxSize(source, width, height)){
           this.clampToMaxSize();

           isSourcePowerOfTwo = this.isSourcePowerOfTwo();

           if(!isSourcePowerOfTwo){
               Log.warn("texture size is not power of two after clampToMaxSize()");
           }
       } */
    _setTextureParameters(
      gl,
      target,
      isSourcePowerOfTwo,
      (glWrapS, glWrapT, magFilter, minFilter)
    );
    _allocateSourceToTexture(gl, (target, glFormat, glType), source);
    /* TODO generateMipmaps
       if (this.generateMipmaps && isSourcePowerOfTwo) {
           gl.generateMipmap(gl[this.target]);
       } */
    OperateTypeArrayTextureService.setIsNeedUpdate(
      texture,
      BufferTextureService.getNotNeedUpdate(),
      isNeedUpdates
    )
    |> ignore;
    state
  }
};

let isNeedUpdate = (texture, {textureRecord}) =>
  OperateTypeArrayTextureService.getIsNeedUpdate(texture, textureRecord.isNeedUpdates)
  === BufferTextureService.getDefaultIsNeedUpdate();