@varDeclare
varying vec2 v_mapCoord0;
@end

@body
    totalColor *= texture2D(u_sampler2D0, v_mapCoord0);
@end
