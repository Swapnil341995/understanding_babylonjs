//global variable
const viewer = {
  engine: null,
  scene: null,
};
let ADD = 0.01,
  theta = 0;
//scene set up
const createScene = () => {
  const canvasElement = document.getElementById("canvas_id");
  canvasElement.height = window.innerHeight;
  canvasElement.width = window.innerWidth;
  viewer.engine = new BABYLON.Engine(canvasElement, true);
  viewer.scene = new BABYLON.Scene(viewer.engine);

  //adding cube
  const cube = BABYLON.MeshBuilder.CreateBox("cube", viewer.scene);
  cube.material = new BABYLON.StandardMaterial("cube_material", viewer.scene);
  cube.material.diffuseColor = BABYLON.Color3.Red();

  //adding ground plane
  const ground = BABYLON.MeshBuilder.CreatePlane(
    "ground",
    {
      height: 2,
      width: 2,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    viewer.scene
  );
  ground.position.z = 1;
  ground.material = new BABYLON.StandardMaterial(
    "ground_material",
    viewer.scene
  );

  //adding camera
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );
  camera.attachControl(canvasElement, true);

  //adding light
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    viewer.scene
  );
};

//change scale position and rotation all at the same time.
const changeScalePositionRotation = () => {
  const ground = viewer.scene.getMeshByName("ground");
  ground.position.x = 2 * Math.sin(theta);
  ground.position.y = 2 * Math.cos(theta);

  ground.scaling.x = 2 * Math.sin(theta);
  ground.scaling.y = 2 * Math.cos(theta);

  ground.rotation.x = 2 * Math.sin(theta);
  ground.rotation.y = 2 * Math.cos(theta);
  theta += ADD;
};

//handling events
const addEventListeners = () => {
  //resize event
  window.addEventListener("resize", () => {
    viewer.engine.resize();
    const canvasElement = document.getElementById("canvas_id");
    canvasElement.height = window.innerHeight;
    canvasElement.width = window.innerWidth;
  });
};

createScene();
addEventListeners();

//game engine render loop
viewer.engine.runRenderLoop(() => {
  viewer.scene.render();
  changeScalePositionRotation();
});
