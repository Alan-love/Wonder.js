/// <reference path="../../../definitions.d.ts"/>
module dy.render{
export class ShaderChunk{public static basic_body_fragment:string = "    gl_FragColor = v_color;\n";
public static basic_body_vertex:string = "    v_color = a_color;\n";
public static basic_head_fragment:string = "varying vec4 v_color;\n";
public static basic_head_vertex:string = "varying vec4 v_color;\n";
public static common_body_fragment:string = "\n";
public static common_body_vertex:string = "\n";
public static common_head_fragment:string = "precision mediump float;\n";
public static common_head_vertex:string = "uniform mat4 u_mMatrix;\nuniform mat4 u_vMatrix;\nuniform mat4 u_pMatrix;\n";
public static cubemap_body_fragment:string = "    vec3 inDir = normalize(v_position - u_cameraPos);\n";
public static cubemap_body_vertex:string = "    v_normal = vec3(u_normalMatrix * a_normal);\n    v_position = vec3(u_mMatrix * a_position);\n";
public static cubemap_head_fragment:string = "uniform samplerCube u_sampler0;\nuniform vec3 u_cameraPos;\nvarying vec3 v_normal;\nvarying vec3 v_position;\n";
public static cubemap_head_vertex:string = "uniform mat4 u_normalMatrix;\nvarying vec3 v_normal;\nvarying vec3 v_position;\n";
public static fresnel_body_fragment:string = "    vec3 normal = normalize(v_normal);\n    vec3 reflectDir = reflect(inDir, normal);\n    vec3 refractDir = refract(inDir, normal, u_refractionRatio);\n\n    vec4 reflectColor = textureCube(u_sampler0, reflectDir);\n    vec4 refractColor = textureCube(u_sampler0, refractDir);\n\n    gl_FragColor = mix(reflectColor, refractColor, computeFresnelRatio(inDir, normal, u_refractionRatio));\n\n";
public static fresnel_head_fragment:string = "uniform float u_refractionRatio;\nfloat computeFresnelRatio(vec3 inDir, vec3 normal, float refractionRatio){\n    float f = pow(1.0 - refractionRatio, 2.0) / pow(1.0 + refractionRatio, 2.0);\n    float fresnelPower = 5.0;\n\n    float ratio = f + (1.0 - f) * pow((1.0 - dot(inDir, normal)), fresnelPower);\n\n    return ratio / 100.0;\n}\n";
public static reflection_body_fragment:string = "    gl_FragColor = textureCube(u_sampler0, reflect(inDir, normalize(v_normal)));\n";
public static refraction_body_fragment:string = "    gl_FragColor = textureCube(u_sampler0, refract(inDir, normalize(v_normal), u_refractionRatio));\n";
public static refraction_head_fragment:string = "uniform float u_refractionRatio;\n";
public static skybox_body_fragment:string = "    gl_FragColor = textureCube(u_sampler0, v_dir);\n";
public static skybox_body_vertex:string = "    vec4 pos = u_pMatrix * mat4(mat3(u_vMatrix)) * u_mMatrix * a_position;\n    gl_Position = pos.xyww;\n\n    v_dir = vec3(a_position);\n\n";
public static skybox_head_fragment:string = "uniform samplerCube u_sampler0;\nvarying vec3 v_dir;\n";
public static skybox_head_vertex:string = "varying vec3 v_dir;\n";
}
}