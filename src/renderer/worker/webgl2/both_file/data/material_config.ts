export const webgl2_material_config = {
    // "materials": {
    //     //todo fix BasicMaterial
    //     // "BasicMaterial": {
    //     //     "shader": {
    //     //         "shaderLib": [
    //     //             { "type": "group", "value": "engineMaterialTop" },
    //     //
    //     //             "BasicMaterialColorShaderLib",
    //     //             "BasicShaderLib",
    //     //
    //     //             {
    //     //                 "type": "branch",
    //     //                 "branch": (materialIndex, {
    //     //                     getMapCount
    //     //                 }, {
    //     //                                MapManagerDataFromSystem
    //     //                            }) => {
    //     //                     if (getMapCount(materialIndex, MapManagerDataFromSystem) === 1) {
    //     //                         return "BasicMapShaderLib";
    //     //                     }
    //     //                 }
    //     //             },
    //     //
    //     //
    //     //             "BasicEndShaderLib",
    //     //
    //     //             { "type": "group", "value": "engineMaterialEnd" }
    //     //         ]
    //     //     }
    //     // },
    //     // "LightMaterial": {
    //     //     "shader": {
    //     //         "shaderLib": [
    //     //             { "type": "group", "value": "engineMaterialTop" },
    //     //
    //     //             "NormalMatrixNoInstanceShaderLib",
    //     //             "NormalCommonShaderLib",
    //     //             "LightCommonShaderLib",
    //     //             "LightSetWorldPositionShaderLib",
    //     //
    //     //             {
    //     //                 "type": "branch",
    //     //                 "branch": (materialIndex, {
    //     //                     hasDiffuseMap,
    //     //                     hasSpecularMap
    //     //                 }, {
    //     //                                LightMaterialDataFromSystem
    //     //                            }) => {
    //     //                     if (hasDiffuseMap(LightMaterialDataFromSystem)
    //     //                         || hasSpecularMap(LightMaterialDataFromSystem)) {
    //     //                         return "CommonLightMapShaderLib";
    //     //                     }
    //     //                 }
    //     //             },
    //     //             {
    //     //                 "type": "branch",
    //     //                 "branch": (materialIndex, {
    //     //                     hasDiffuseMap
    //     //                 }, {
    //     //                                LightMaterialDataFromSystem
    //     //                            }) => {
    //     //                     if (hasDiffuseMap(LightMaterialDataFromSystem)) {
    //     //                         return "DiffuseMapShaderLib";
    //     //                     }
    //     //
    //     //                     return "NoDiffuseMapShaderLib";
    //     //                 }
    //     //             },
    //     //             {
    //     //                 "type": "branch",
    //     //                 "branch": (materialIndex, {
    //     //                     hasSpecularMap
    //     //                 }, {
    //     //                                LightMaterialDataFromSystem
    //     //                            }) => {
    //     //                     if (hasSpecularMap(LightMaterialDataFromSystem)) {
    //     //                         return "SpecularMapShaderLib";
    //     //                     }
    //     //
    //     //                     return "NoSpecularMapShaderLib";
    //     //                 }
    //     //             },
    //     //
    //     //             "NoLightMapShaderLib",
    //     //             "NoEmissionMapShaderLib",
    //     //             "NoNormalMapShaderLib",
    //     //             "NoShadowMapShaderLib",
    //     //             "LightShaderLib",
    //     //             "AmbientLightShaderLib",
    //     //             "DirectionLightShaderLib",
    //     //             "PointLightShaderLib",
    //     //             "LightEndShaderLib",
    //     //
    //     //             { "type": "group", "value": "engineMaterialEnd" }
    //     //         ]
    //     //     }
    //     // }
    //
    //     //todo separate(e.g. material in webgl1/webgl2 has different shader)
    //
    //     // "LightMaterial": {
    //     //     // "shader": "GBuffer"
    //     //     "canUseShaderForCheck": [
    //     //         "GBuffer"
    //     //     ]
    //     // }
    // },
    "shaders":{
        "materialShaders":{
            "FrontRenderLight": [
                { "type": "group", "value": "engineMaterialTop" },

                "NormalMatrixNoInstanceShaderLib",
                "NormalCommonShaderLib",
                "LightCommonShaderLib",
                "LightSetWorldPositionShaderLib",

                {
                    "type": "branch",
                    //todo fix bug?: test one has map, one not has map?(should specify with materialIndex?)
                    "branch": (materialIndex, {
                        hasDiffuseMap,
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(LightMaterialDataFromSystem)
                            || hasSpecularMap(LightMaterialDataFromSystem)) {
                            return "CommonLightMapShaderLib";
                        }
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasDiffuseMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(LightMaterialDataFromSystem)) {
                            return "DiffuseMapShaderLib";
                        }

                        return "NoDiffuseMapShaderLib";
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasSpecularMap(LightMaterialDataFromSystem)) {
                            return "SpecularMapShaderLib";
                        }

                        return "NoSpecularMapShaderLib";
                    }
                },

                "NoLightMapShaderLib",
                "NoEmissionMapShaderLib",
                "NoNormalMapShaderLib",
                "NoShadowMapShaderLib",
                "LightShaderLib",
                "PointLightShaderLib",
                "LightEndShaderLib",
                { "type": "group", "value": "engineMaterialEnd" }
            ],
            "GBuffer": [
                { "type": "group", "value": "engineMaterialTop" },

                // "LightModelDataShaderLib",

                "NormalMatrixNoInstanceShaderLib",
                "NormalCommonShaderLib",
                "GBufferCommonShaderLib",
                "GBufferSetWorldPositionShaderLib",

                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasDiffuseMap,
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(materialIndex, LightMaterialDataFromSystem)
                            || hasSpecularMap(materialIndex, LightMaterialDataFromSystem)) {
                            return "CommonLightMapShaderLib";
                        }
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasDiffuseMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasDiffuseMap(materialIndex, LightMaterialDataFromSystem)) {
                            return "DiffuseMapShaderLib";
                        }

                        return "NoDiffuseMapShaderLib";
                    }
                },
                {
                    "type": "branch",
                    "branch": (materialIndex, {
                        hasSpecularMap
                    }, {
                                   LightMaterialDataFromSystem
                               }) => {
                        if (hasSpecularMap(materialIndex, LightMaterialDataFromSystem)) {
                            return "SpecularMapShaderLib";
                        }

                        return "NoSpecularMapShaderLib";
                    }
                },

                // "NoLightMapShaderLib",
                // "NoEmissionMapShaderLib",
                "GBufferNoNormalMapShaderLib",
                // "NoShadowMapShaderLib",
                "GBufferShaderLib",
                "GBufferEndShaderLib",
                { "type": "group", "value": "engineMaterialEnd" }
            ]
        },
        "noMaterialShaders": {
            "DeferLightPass": [
                // { "type": "group", "value": "engineMaterialTop" },
                "VerticeCommonShaderLib",

                "DeferLightPassCommonShaderLib",
                "DeferLightPassNoNormalMapShaderLib",
                "NoLightMapShaderLib",
                "NoEmissionMapShaderLib",
                "NoShadowMapShaderLib",
                "DeferLightPassShaderLib",
                "DeferLightPassEndShaderLib"
            ]
        }
    },
    "shaderLibGroups": {
        "engineMaterialTop": [
            "CommonShaderLib",
            "ModelMatrixNoInstanceShaderLib",
            "VerticeCommonShaderLib"
        ],
        "engineMaterialEnd": [
            "EndShaderLib"
        ]
    }
}
