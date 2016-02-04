module wd {
    //todo change array format to "Array<xxx>"
    export interface IGLTFChildRootProperty {
        name?: string;
    }

    export interface IGLTFJsonData {
        asset: IGLTFAsset;
        accessors: {
            [id:string]: IGLTFAccessor
        };
        buffers: {
            [id:string]: IGLTFBuffer
        };
        bufferViews: {
            [id:string]: IGLTFBufferView
        };
        meshes: {
            [id:string]: IGLTFMesh
        };
        cameras?: Object;
        nodes: {
            [id:string]: IGLTFNode
        };
        images?: {
            [id:string]: IGLTFImage
        };
        textures?: {
            [id:string]: IGLTFTexture
        };
        shaders: Object;
        programs: Object;
        samplers: {
            [id:string]: IGLTFSampler
        };
        techniques: Object;
        materials: {
            [id:string]: IGLTFMaterial
        };
        animations: Object;
        skins: Object;
        scene: string;
        scenes: {
            [id:string]: IGLTFScene
        };

        extensionsUsed?:Array<string>;
    }


    export interface IGLTFScene extends IGLTFChildRootProperty {
        nodes: Array<string>;
    }

    export interface IGLTFNode extends IGLTFChildRootProperty {
        children: Array<string>;
        camera?: string;
        skin?: string;
        jointName?: string;
        matrix?: Array<number>;
        mesh?: string;
        meshes?: Array<string>;
        rotation?: Array<number>;
        scale?: Array<number>;
        translation?: Array<number>;
    }

    export interface IGLTFAsset {
        version:string;

        genertor?:string;
        premultipliedAlpha?:boolean;
        profile?: {
            api :string;
            version:string
            extras:Object
        }
    }

    export interface IGLTFMaterial extends IGLTFChildRootProperty {
        technique?: string;
        values?: Array<string>;
        extensions?:Object;
    }

    export interface IGLTFImage extends IGLTFChildRootProperty {
        uri: string;
    }

    export interface IGLTFSampler extends IGLTFChildRootProperty {
        magFilter?: number;
        minFilter?: number;
        wrapS?: number;
        wrapT?: number;
    }

    export interface IGLTFTexture extends IGLTFChildRootProperty {
        sampler: string;
        source: string;

        format?: number;
        internalFormat?: number;
        target?: number;
        type?: number;
    }

    export interface IGLTFAccessor extends IGLTFChildRootProperty {
        bufferView: string;
        byteOffset: number;
        byteStride: number;
        count: number;
        type: string;
        componentType: number;

        max?: Array<number>;
        min?: Array<number>;
    }

    export interface IGLTFBufferView extends IGLTFChildRootProperty {
        buffer: string;
        byteOffset: number;
        byteLength: number;

        target?: number;
    }

    export interface IGLTFBuffer extends IGLTFChildRootProperty {
        uri: string;

        byteLength?: number;
        type?: string;
    }

    export interface IGLTFMeshPrimitive {
        attributes: Object;
        indices?: string;
        material: string;
        mode: number;
    }

    export interface IGLTFMesh extends IGLTFChildRootProperty {
        primitives: Array<IGLTFMeshPrimitive>;
    }









    export interface IGLTFParseData{
        metadata:DYFileMetadata;
        scene:{
            ambientColor?: Color
        };
        objects: wdCb.Collection<IGLTFObjectData>;
    }


    export interface IGLTFObjectData {
        name?:string;
        isContainer:boolean;

        components: wdCb.Collection<IGLTFComponent>;


        //parent:IGLTFParseData;
        children: wdCb.Collection<IGLTFObjectData>;

        //currentScene: Object;
    }


    export interface IGLTFComponent{
    }

    export interface IGLTFGeometry extends IGLTFComponent{
        material:IGLTFMaterial;

        vertices: Array<number>;
        colors?: Array<number>;
        texCoords?: Array<number>;
        faces:Array<Face3>;

        //todo add this
        drawMode:DrawMode;

        //morphTargets: wdCb.Hash<wdCb.Collection<Array<number>>>;
        //morphNormals:wdCb.Hash<wdCb.Collection<Array<number>>>;
    }

    export interface IGLTFMaterial{
        type:string;

        doubleSided:boolean;
        transparent:boolean;
        //transparency?:number;
        opacity?: number
    }


    export interface IGLTFBasicMaterial extends IGLTFMaterial{
    }

    export interface IGLTFLightMaterial extends IGLTFMaterial{
        //blend functions
        functions: Object;

        lightModel:LightModel;


        diffuseColor: Color;
        specularColor: Color;
        emissionColor:Color;

        diffuseMap:Texture;
        specularMap:Texture;
        emissionMap:Texture;

        //todo support normalMap
        //normalMap:Texture;

        shininess: number;
    }



    export interface IGLTFMetadata {
        version:string;
        genertor?:string;
        premultipliedAlpha?:boolean;
        profile?: {
            api :string;
            version:string
            extras:Object
        }
    }






    export interface IGLTFResult{
        metadata:wdCb.Hash<IGLTFMetadata>;
        scene:{
            ambientColor?: Color
        };
        models:wdCb.Collection<GameObject>
    }
}
