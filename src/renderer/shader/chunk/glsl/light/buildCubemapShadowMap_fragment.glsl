@varDeclare
    varying vec3 v_worldPosition;
@end

//todo dry
@funcDefine
// Packing a float in GLSL with multiplication and mod
vec4 packDepth(in float depth) {
    const vec4 bit_shift = vec4(256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0);
    const vec4 bit_mask = vec4(0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0);

    // combination of mod and multiplication and division works better
    vec4 res = mod(depth * bit_shift * vec4(255), vec4(256) ) / vec4(255);
    res -= res.xxyz * bit_mask;

    return res;
}

@end

@body

// get distance between fragment and light source
    float lightDistance = length(v_worldPosition - u_lightPos);

    // map to [0,1] range by dividing by farPlane
    lightDistance = lightDistance / u_farPlane;


gl_FragData[0] = packDepth(lightDistance);


//gl_FragColor = vec4(0.5, 0.0, 1.0, 1.0);
//gl_FragData[0] = vec4(lightDistance, 1.0, 1.0, 1.0);
@end
