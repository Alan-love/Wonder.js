@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    totalColor *= textureCube(u_samplerCube0, reflect(inDir, normalize(v_normal)));
}
@end
