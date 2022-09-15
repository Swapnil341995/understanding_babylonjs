const viewer = {
    canvas: document.getElementById("canvas_id"),
    engine: null,
    scene: null,
    camera: null,
    light: null,
}

const createScene = () => {
    //basic set up
    {
        viewer.canvas.width = window.innerWidth;
        viewer.canvas.height = window.innerHeight;
        viewer.engine = new BABYLON.Engine(viewer.canvas);
        viewer.scene = new BABYLON.Scene(viewer.engine);
        viewer.camera = new BABYLON.ArcRotateCamera(
            "camera",
            -Math.PI/2,
            Math.PI/2.5,
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
        const ground = new BABYLON.MeshBuilder.CreateGround(
            "ground", {
                height: 2,
                width: 2,
                // sideOrientation: BABYLON.Mesh.DOUBLESIDE  
            }
        )
    }
    //create box as hut
    {
        const box = new BABYLON.MeshBuilder.CreateBox("box", {});
        box.position.y = 0.5;
    }
    //create cylinder as roof
    {
        const roof = new BABYLON.MeshBuilder.CreateCylinder("roof", {diameter: 1.3, height: 1.2, tessellation: 3});
        roof.scaling.x = 0.75;
        roof.rotation.z = Math.PI / 2;
        roof.position.y = 1.22;
    }
}
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