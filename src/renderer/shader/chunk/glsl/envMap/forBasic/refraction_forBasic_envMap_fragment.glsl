@body
if(!isRenderListEmpty(u_isRenderListEmpty)){
    vec3 normal = normalize(v_normal);
    normal.y = -normal.y;
    normal.z = -normal.z;

    totalColor *= textureCube(u_samplerCube0, refract(inDir, normal, u_refractionRatio));
}
@end

