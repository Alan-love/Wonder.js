@varDeclare
varying vec3 v_worldPosition;

#if POINT_LIGHTS_COUNT > 0
struct PointLightAPI {
    vec3 position;
    vec3 color;
    float intensity;

    float range;
    float constant;
    float linear;
    float quadratic;
};
uniform PointLightAPI u_pointLights[POINT_LIGHTS_COUNT];

#endif


#if DIRECTION_LIGHTS_COUNT > 0
struct DirectionLightAPI {
    vec3 position;

    float intensity;

    vec3 color;
};
uniform DirectionLightAPI u_directionLights[DIRECTION_LIGHTS_COUNT];
#endif
@end

@funcDeclare
vec3 getDirectionLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos);
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition);
@end

@funcDefine
vec3 getDirectionLightDirByLightPos(vec3 lightPos){
    return lightPos - vec3(0.0);
}
vec3 getPointLightDirByLightPos(vec3 lightPos){
    return lightPos - v_worldPosition;
}
vec3 getPointLightDirByLightPos(vec3 lightPos, vec3 worldPosition){
    return lightPos - worldPosition;
}
@end
