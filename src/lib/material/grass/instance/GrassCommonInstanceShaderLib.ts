module wd{
    export class GrassCommonInstanceShaderLib extends EngineShaderLib{
        public static create() {
        	var obj = new this();

        	return obj;
        }


        public type:string = "grass_common_instance";

        @require(function(program: Program, cmd:InstanceCommand, material:GrassInstanceMaterial){
            it("geometry should be GrassInstanceGeometry", () => {
                expect(material.geometry).instanceOf(GrassInstanceGeometry);
            });
        })
        public sendShaderVariables(program: Program, cmd: InstanceCommand, material: GrassInstanceMaterial) {
            this.sendAttributeBuffer(program, "a_vertexIndex", material.geometry.vertexIndexBuffer);

            this.sendUniformData(program, "u_mMatrix", cmd.mMatrix);
            this.sendUniformData(program, "u_vpMatrix", cmd.vpMatrix);
            this.sendUniformData(program, "u_size", material.size);
            this.sendUniformData(program, "u_time", material.time);

            this._sendTerrainData(material, program);

            this._sendLightData(program);
        }

        public setShaderDefinition(cmd:InstanceCommand, material:GrassInstanceMaterial){
            super.setShaderDefinition(cmd, material);

            this.addAttributeVariable(["a_vertexIndex"]);
            this.addUniformVariable([
                "u_grassMapSampler",
                "u_mMatrix",
                "u_vpMatrix",
                "u_size",
                "u_time",
                "u_terrainRangeWidth",
                "u_terrainRangeHeight",
                "u_terrainMinHeight",
                "u_terrainMaxHeight",
                "u_heightMapSampler",
                "u_lightPos",
                "u_lightColor"
            ]);

            this.vsSourceFuncDefine = ShaderChunk.common_heightMap.funcDefine + ShaderChunk.common_light.funcDefine + this.vsSourceFuncDefine;

            let geometry:GrassInstanceGeometry = material.geometry;

            this.vsSourceDefineList.addChildren([
                {
                    name: "BLADE_SEGS",
                    value:`${geometry.bladeSegments}.0`
                },
                {
                    name: "BLADE_DIVS",
                    value:`${geometry.bladeDivs}.0`
                },
                {
                    name: "BLADE_VERTS",
                    value:`${geometry.bladeVerts}.0`
                }
            ]);
        }

        @require(function(material:GrassInstanceMaterial, program:Program){
            it("material.terrainGeometry should exist ", () => {
                expect(material.terrainGeometry).exist;
            });
        })
        private _sendTerrainData(material:GrassInstanceMaterial, program:Program){
            let terrainGeo:TerrainGeometry = material.terrainGeometry;

            this.sendUniformData(program, "u_terrainRangeWidth", terrainGeo.rangeWidth);
            this.sendUniformData(program, "u_terrainRangeHeight", terrainGeo.rangeHeight);
            this.sendUniformData(program, "u_terrainMinHeight", terrainGeo.minHeight);
            this.sendUniformData(program, "u_terrainMaxHeight", terrainGeo.maxHeight);
        }

        @require(function(){
            var scene:SceneDispatcher = wd.Director.getInstance().scene,
                directionLights:wdCb.Collection<GameObject> = scene.directionLights,
                pointLights:wdCb.Collection<GameObject> = scene.pointLights;

            it("should exist light", () => {
                expect(!directionLights && !pointLights).false;

                if(directionLights){
                    expect(directionLights).not.empty;
                }

                expect(pointLights).not.empty;
            });
        })
        private _sendLightData(program:Program){
            var scene:SceneDispatcher = wd.Director.getInstance().scene,
                directionLights:wdCb.Collection<GameObject> = scene.directionLights,
                pointLights:wdCb.Collection<GameObject> = scene.pointLights;

            if(directionLights){
                let lightComponent:DirectionLight = directionLights.getChild(0).getComponent<DirectionLight>(DirectionLight);

                this.sendUniformData(program, "u_lightPos", LightUtils.getDirectionLightPosition(lightComponent));
                this.sendUniformData(program, "u_lightColor", lightComponent.color.toVector3());
            }
            else if(pointLights){
                let lightComponent:PointLight = pointLights.getChild(0).getComponent<PointLight>(PointLight);

                this.sendUniformData(program, "u_lightPos", LightUtils.getPointLightPosition(lightComponent))
                this.sendUniformData(program, "u_lightColor", lightComponent.color.toVector3());
            }
        }
    }
}

