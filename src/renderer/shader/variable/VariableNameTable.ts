module wd{
    const _table = wdCb.Hash.create<string>();

    _table.addChild("lightMap", "u_lightMapSampler");
    _table.addChild("diffuseMap", "u_diffuseMapSampler");
    _table.addChild("diffuseMap1", "u_diffuseMap1Sampler");
    _table.addChild("diffuseMap2", "u_diffuseMap2Sampler");
    _table.addChild("diffuseMap3", "u_diffuseMap3Sampler");
    _table.addChild("specularMap", "u_specularMapSampler");
    _table.addChild("emissionMap", "u_emissionMapSampler");
    _table.addChild("normalMap", "u_normalMapSampler");
    _table.addChild("reflectionMap", "u_reflectionMapSampler");
    _table.addChild("refractionMap", "u_refractionMapSampler");
    _table.addChild("bitmap", "u_bitmapSampler");

    _table.addChild("bumpMap", "u_bumpMapSampler");
    _table.addChild("bumpMap1", "u_bumpMap1Sampler");
    _table.addChild("bumpMap2", "u_bumpMap2Sampler");
    _table.addChild("bumpMap3", "u_bumpMap3Sampler");

    _table.addChild("mixMap", "u_mixMapSampler");


    export class VariableNameTable{
        @ensure(function(variableName:string){
            it("variableName should in VariableNameTable", () => {
                expect(variableName).exist;
            });
        })
        public static getVariableName(name: string){
            return _table.getChild(name);
        }
    }
}
