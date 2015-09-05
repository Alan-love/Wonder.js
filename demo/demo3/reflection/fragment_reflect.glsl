precision mediump float;

uniform samplerCube u_sampler0;
uniform vec3 u_cameraPos;

varying vec3 v_normal;
varying vec3 v_position;

void main(void){
    vec3 inDir = normalize(v_position - u_cameraPos);
    vec3 reflectDir = reflect(inDir, normalize(v_normal));

    gl_FragColor = textureCube(u_sampler0, reflectDir);
}

