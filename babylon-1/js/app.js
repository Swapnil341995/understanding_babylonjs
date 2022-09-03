//global variable
const viewer = {
  engine: null,
  scene: null,
};
let ADD = 0.01,
  theta = 0;
//scene set up
const createScene = () => {
  const bblon = BABYLON;
  const canvasElement = document.getElementById("canvas_id");
  canvasElement.height = window.innerHeight;
  canvasElement.width = window.innerWidth;
  viewer.engine = new bblon.Engine(canvasElement, true);
  viewer.scene = new bblon.Scene(viewer.engine);

  //adding cube
  const cube = bblon.MeshBuilder.CreateBox("cube", viewer.scene);
  cube.material = new bblon.StandardMaterial("cube_material", viewer.scene);
  cube.material.diffuseColor = bblon.Color3.Red();

  //adding ground plane
  const ground = bblon.MeshBuilder.CreatePlane(
    "ground",
    {
      height: 2,
      width: 2,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    viewer.scene
  );
  ground.position.z = 1;
  ground.material = new bblon.StandardMaterial("ground_material", viewer.scene);

  //adding camera
  const camera = new bblon.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new bblon.Vector3(0, 0, 0)
  );
  camera.attachControl(canvasElement, true);

  //adding light
  const light = new bblon.HemisphericLight(
    "light",
    new bblon.Vector3(1, 1, 0),
    viewer.scene
  );
};

//change scale position and rotation
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
