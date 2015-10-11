@funcDeclare
float getShadowBias(vec3 lightDir, float shadowBias);
float unpackDepth(vec4 rgbaDepth);
@end

@funcDefine
float getShadowBias(vec3 lightDir, float shadowBias){
    if(shadowBias != NULL){
        return shadowBias;
    }

    /*!
     //todo need verify

     A shadow bias of 0.005 solves the issues of our scene by a large extent, but some surfaces that have a steep angle to the light source might still produce shadow acne. A more solid approach would be to change the amount of bias based on the surface angle towards the light: something we can solve with the dot product:

     return max(0.005 * (1.0 - dot(normalize(getNormal()), lightDir)), 0.001);
     */

    return 0.001;
}

float unpackDepth(vec4 rgbaDepth) {
    const vec4 bitShift = vec4(1.0 / (256.0 * 256.0 * 256.0), 1.0 / (256.0 * 256.0), 1.0 / 256.0, 1.0);
    return dot(rgbaDepth, bitShift);
}

vec3 getShadowVisibility() {
    vec3 shadowColor = vec3(1.0);

//todo add twoD
	for( int i = 0; i < SHADOWMAP_COUNT; i ++ ) {
        shadowColor *= getCubemapShadowVisibility(getLightDir(u_lightPos[i]), u_cubemapShadowMapSampler[i], u_lightPos[i], u_farPlane[i], u_shadowBias[i], u_shadowDarkness[i]);
	}


	return shadowColor;
}

@end

