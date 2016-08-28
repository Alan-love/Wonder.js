@funcDefine
mat3 cotangentFrame(vec3 normal,vec3 p,vec2 uv)
{
    vec3 dp1=dFdx(p);
    vec3 dp2=dFdy(p);
    vec2 duv1=dFdx(uv);
    vec2 duv2=dFdy(uv);

    vec3 dp2perp=cross(dp2,normal);
    vec3 dp1perp=cross(normal,dp1);
    vec3 tangent=dp2perp*duv1.x+dp1perp*duv2.x;
    vec3 binormal=dp2perp*duv1.y+dp1perp*duv2.y;

    float invmax=inversesqrt(max(dot(tangent,tangent),dot(binormal,binormal)));
    return mat3(tangent*invmax,binormal*invmax,normal);
}
@end

