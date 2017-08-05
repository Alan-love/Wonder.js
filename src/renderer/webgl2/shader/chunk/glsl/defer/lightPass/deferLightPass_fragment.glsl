@varDeclare
//todo move to light ubo
uniform vec3 u_lightPosition;
uniform vec3 u_lightColor;
uniform float u_lightIntensity;
uniform float u_lightConstant;
uniform float u_lightLinera;
uniform float u_lightQuadratic;
uniform float u_lightRange;

uniform float u_lightRadius;




uniform int u_lightModel;
uniform vec3 u_cameraPos;



    in vec2 v_texcoord;
@end


@funcDefine
float getBlinnShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 halfAngle = normalize(lightDir + viewDir);

        float blinnTerm = dot(normal, halfAngle);

        blinnTerm = clamp(blinnTerm, 0.0, 1.0);
        blinnTerm = dotResultBetweenNormAndLight != 0.0 ? blinnTerm : 0.0;
        blinnTerm = pow(blinnTerm, shininess);

        return blinnTerm;
}

float getPhongShininess(float shininess, vec3 normal, vec3 lightDir, vec3 viewDir, float dotResultBetweenNormAndLight){
        vec3 reflectDir = reflect(-lightDir, normal);
        float phongTerm = dot(viewDir, reflectDir);

        phongTerm = clamp(phongTerm, 0.0, 1.0);
        phongTerm = dotResultBetweenNormAndLight != 0.0 ? phongTerm : 0.0;
        phongTerm = pow(phongTerm, shininess);

        return phongTerm;
}


//todo optimize specular color
vec3 getSpecularColor(vec3 diffuseColor)
{
return diffuseColor;
}

vec3 calcLight(vec3 lightDir, vec3 color, float intensity, float attenuation, vec3 normal, vec3 viewDir, vec3 materialDiffuse, float specularStrength, float shininess)
{
        vec3 materialLight = getMaterialLight();

        //todo fix front render,basic render->diffuse: change vec4 to vec3
//        vec4 materialDiffuse = getMaterialDiffuse();

//        vec3 materialSpecular = u_specular;
        vec3 materialSpecular = getSpecularColor(materialDiffuse);

        vec3 materialEmission = getMaterialEmission();

//        float specularStrength = getSpecularStrength();

        float dotResultBetweenNormAndLight = dot(normal, lightDir);
        float diff = max(dotResultBetweenNormAndLight, 0.0);

        vec3 emissionColor = materialEmission;

        //todo pass ambient data: u_ambient
//        vec3 ambientColor = (u_ambient + materialLight) * materialDiffuse;
        vec3 ambientColor = vec3(0.0);


        if(u_lightModel == 3){
//            return vec4(emissionColor + ambientColor, 1.0);
            return emissionColor + ambientColor;
        }

//        vec4 diffuseColor = vec4(color * materialDiffuse * diff * intensity, materialDiffuse.a);
        vec3 diffuseColor = color * materialDiffuse * diff * intensity;

        float spec = 0.0;

        if(u_lightModel == 2){
                spec = getPhongShininess(shininess, normal, lightDir, viewDir, diff);
        }
        else if(u_lightModel == 1){
                spec = getBlinnShininess(shininess, normal, lightDir, viewDir, diff);
        }

        vec3 specularColor = spec * materialSpecular * specularStrength * intensity;
//        vec3 specularColor = vec3(0.5);

//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), diffuseColor.a);
        return emissionColor + ambientColor + attenuation * (diffuseColor + specularColor);
//        return color;
//        return vec4(emissionColor + ambientColor + attenuation * (diffuseColor.rgb + specularColor), 1.0);
}



//        vec4 calcPointLight(vec3 lightDir, PointLight light, vec3 normal, vec3 viewDir)
        vec3 calcPointLight(vec3 lightDir, vec3 normal, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess)
{
        //lightDir is not normalize computing distance
        float distance = length(lightDir);

        float attenuation = 0.0;

        //todo test
        if(distance >= u_lightRadius){
            return vec3(0.0);
        }

//        if(distance < light.range)
            //todo replace range with radius
        if(distance < u_lightRange)
        {
//            attenuation = 1.0 / (light.constant + light.linear * distance + light.quadratic * (distance * distance));
            attenuation = 1.0 / (u_lightConstant + u_lightLinera * distance + u_lightQuadratic * (distance * distance));
        }

        lightDir = normalize(lightDir);

//        return calcLight(lightDir, light.color, light.intensity, attenuation, normal, viewDir);
        return calcLight(lightDir, u_lightColor, u_lightIntensity, attenuation, normal, viewDir, diffuseColor, specularStrength, shininess);
}

vec4 calcTotalLight(vec3 normal, vec3 position, vec3 viewDir, vec3 diffuseColor, float specularStrength, float shininess){
    vec4 totalLight = vec4(0.0, 0.0, 0.0, 1.0);

//    #if POINT_LIGHTS_COUNT > 0
//                for(int i = 0; i < POINT_LIGHTS_COUNT; i++){
//                totalLight += calcPointLight(getPointLightDir(i), u_pointLights[i], norm, viewDir);
                totalLight += vec4(calcPointLight(getPointLightDir(position), normal, viewDir, diffuseColor, specularStrength, shininess), 0.0);
//        }
//    #endif

//    #if DIRECTION_LIGHTS_COUNT > 0
//                for(int i = 0; i < DIRECTION_LIGHTS_COUNT; i++){
//                totalLight += calcDirectionLight(getDirectionLightDir(i), u_directionLights[i], norm, viewDir);
//        }
//    #endif

        return totalLight;
}
@end


@body
//            ivec2 fragCoord = ivec2(gl_FragCoord.xy);


//            vec4 positionData = texelFetch(u_positionBuffer, fragCoord, 0);
            vec4 positionData = texture(u_positionBuffer,
v_texcoord);

            vec3 position = positionData.xyz;
            float shininess = positionData.w;


//            vec3 normal = normalize(texelFetch(u_normalBuffer, fragCoord, 0).xyz);
            vec3 normal = normalize(texture(u_normalBuffer, v_texcoord).rgb);
//            vec4 colorData = texelFetch(u_colorBuffer, fragCoord, 0);
            vec4 colorData = texture(u_colorBuffer, v_texcoord);

            vec3 diffuseColor = colorData.xyz;
            float specularStrength  = colorData.w;

//            vec4 colorData = texelFetch(u_colorBuffer, fragCoord, 0).xyzw;



vec3 viewDir = normalize(getViewDir(position));

vec4 totalColor = calcTotalLight(normal, position, viewDir, diffuseColor, specularStrength, shininess);
//vec4 totalColor = vec4(1.0);

//not pass u_opacity in defer shading
//totalColor.a *= u_opacity;
//totalColor.a = 1.0;


//totalColor.rgb = totalColor.rgb * getShadowVisibility();
//totalColor.rgb = normal;
//totalColor.rgb = diffuseColor;
//totalColor.rgb = totalColor.rgb;
//totalColor.rgb = vec3(0.5);
@end


