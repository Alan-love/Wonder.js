module wd{
    export class Billboard extends Component{
        public static create() {
            var obj = new this();

            return obj;
        }

        public entityObject:GameObject;

        public mode:EBillboardMode = EBillboardMode.ALL;

        public addToObject(entityObject:EntityObject, isShareComponent:boolean = false){
            var engine:BillboardEngine = BillboardEngine.getInstance();

            super.addToObject(entityObject, isShareComponent);

            if(!engine.hasChild(this)){
                engine.addChild(this);
            }
        }

        public removeFromObject(entityObject:EntityObject){
            super.removeFromObject(entityObject);

            BillboardEngine.getInstance().removeChild(this);
        }

        //todo optimize
        public update(elapsed:number){
            var camera = Director.getInstance().scene.currentCamera;

            if (this.mode !== EBillboardMode.NONE && camera) {
                let objToCamProj = Vector3.create(),
                    lookAt = Vector3.create(),
                //todo optimize:use global Temp class to reduce memory
                    upAux = Vector3.create(),
                    angleCosine = null,
                    isRotateAroundYAxis = false,
                    objTransform = this.entityObject.transform,
                    objPos = objTransform.position,
                    cameraPos = camera.transform.position;

                // objToCamProj is the vector in world coordinates from the
// local origin to the camera projected in the XZ plane
                objToCamProj.x = cameraPos.x - objPos.x ;
                objToCamProj.y = 0;
                objToCamProj.z = cameraPos.z - objPos.z ;

// This is the original lookAt vector for the object
// in world coordinates
                lookAt.x = 0;
                lookAt.y = 0;
                lookAt.z = 1;


// normalize both vectors to get the cosine directly afterwards
                objToCamProj.normalize();

// easy fix to determine wether the angle is negative or positive
// for positive angles upAux will be a vector pointing in the
// positive y direction, otherwise upAux will point downwards
// effectively reversing the rotation.

                upAux.cross(lookAt, objToCamProj);

// compute the angle
                angleCosine = lookAt.calAngleCos(objToCamProj);

// perform the rotation. The if statement is used for stability reasons
// if the lookAt and objToCamProj vectors are too close together then
// |angleCosine| could be bigger than 1 due to lack of precision
                if ((angleCosine < 0.99990) && (angleCosine > -0.9999)){
                    isRotateAroundYAxis = true;

                    //todo optimize:use global Temp class to reduce memory
                    objTransform.rotation = Quaternion.create().setFromAxisAngle(Math.acos(angleCosine) * 180 / Math.PI, upAux);
                }

                if(this.mode === EBillboardMode.ALL && isRotateAroundYAxis){
                    let objToCam = Vector3.create();
                    // so far it is just like the cylindrical billboard. The code for the
// second rotation comes now
// The second part tilts the object so that it faces the camera

// objToCam is the vector in world coordinates from
// the local origin to the camera
                    objToCam.x = cameraPos.x - objPos.x ;
                    objToCam.y = cameraPos.y - objPos.y ;
                    objToCam.z = cameraPos.z - objPos.z ;

// Normalize to get the cosine afterwards
                    objToCam.normalize();

// Compute the angle between objToCamProj and objToCam,
//i.e. compute the required angle for the lookup vector

                    angleCosine = objToCamProj.calAngleCos(objToCam);


// Tilt the object. The test is done to prevent instability
// when objToCam and objToCamProj have a very small
// angle between them

                    //todo optimize:use global Temp class to reduce memory
                    if ((angleCosine < 0.99990) && (angleCosine > -0.9999))
                        if (objToCam.y < 0){
                            objTransform.rotateLocal(Math.acos(angleCosine) * 180 / Math.PI, 0, 0);
                        }
                        else{
                            objTransform.rotateLocal(-Math.acos(angleCosine) * 180 / Math.PI, 0, 0);
                        }
                }
            }
        }
    }
}

