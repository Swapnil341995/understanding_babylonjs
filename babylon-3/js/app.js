const createScene = () => {
  //basic scene set up
  {
    viewer.canvas.width = window.innerWidth;
    viewer.canvas.height = window.innerHeight;
    viewer.engine = new BABYLON.Engine(viewer.canvas);
    viewer.scene = new BABYLON.Scene(viewer.engine);
    viewer.camera = new BABYLON.ArcRotateCamera(
      "camera",
      -Math.PI / 2,
      Math.PI / 2.5,
      15,
      new BABYLON.Vector3(0, 0, 0)
    );
    viewer.camera.attachControl(viewer.canvas, true);
    viewer.light = new BABYLON.HemisphericLight(
      "light",
      new BABYLON.Vector3(1, 1, 0),
      viewer.scene
    );
  }
  //ground plane
  {
    const ground = new BABYLON.MeshBuilder.CreatePlane("ground_plane", {
      height: 2,
      width: 2,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    });
    groundMat = new BABYLON.StandardMaterial("ground_material");
    ground.material = groundMat;
    ground.material.diffuseTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/roof.jpg"
    );
  }
  //applying texture to only one side of face
  {
    var columns = 6; // 6 columns
    var rows = 4; // 4 rows
    const cubeMat = new BABYLON.StandardMaterial("cube_material");
    const cubeTexture = new BABYLON.Texture(
      "https://assets.babylonjs.com/environments/roof.jpg"
    );
    cubeMat.diffuseTexture = cubeTexture;
    const faceUV = [];
    faceUV[0] = new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[1] = new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[2] = new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[3] = new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[4] = new BABYLON.Vector4(0, 0, 0, 0);
    faceUV[5] = new BABYLON.Vector4(0, 0, 0, 0);
    // faceUV[1] = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/roof.jpg"
    // );
    // faceUV[2] = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/roof.jpg"
    // );
    // faceUV[3] = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/roof.jpg"
    // );
    // faceUV[4] = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/roof.jpg"
    // );
    // faceUV[5] = new BABYLON.Texture(
    //   "https://assets.babylonjs.com/environments/roof.jpg"
    // );
    //overwrite wanted face with sprite coordinates
    faceUV[1] = new BABYLON.Vector4(
      3 / columns,
      0,
      (3 + 1) / columns,
      1 / rows
    );

    const cube = new BABYLON.MeshBuilder.CreateBox(
      "cube",
      { faceUV: faceUV, wrap: true },
      viewer.scene
    );
    cube.position.z = -1;
    cube.material = cubeMat;
  }
};
const addEventListener = () => {
  window.addEventListener("resize", () => {
    viewer.engine.resize();
    viewer.canvas.width = window.innerWidth;
    viewer.canvas.height = window.innerHeight;
  });
};
createScene();
addEventListener();
viewer.engine.runRenderLoop(() => {
  viewer.scene.render();
});
