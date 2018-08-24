/**
 * Created by QIN on 14-6-15.
 */

container = document.createElement( 'div' );
document.body.appendChild( container );
var info = document.createElement( 'div' );
info.style.position = 'absolute';
info.style.top = '30px';
info.style.width = '100%';
info.style.textAlign = 'center';
info.style.color = 'black';
info.innerHTML = 'Designed by QJD - ' +
    '<a href="http://wpa.qq.com/msgrd?v=3&uin=446812629&site=qq&menu=yes"><img border="0" src="http://wpa.qq.com/pa?p=2:446812629:52"></a>' +
    '<br><br><a href="index.html">返回主页</a>';
container.appendChild( info );
var label = document.createElement( 'label' );
container.appendChild( label );
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
container.appendChild( stats.domElement );

var scene = new THREE.Scene();

var camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, - 500, 1000 );
camera.position.x = 200;
camera.position.y = 100;
camera.position.z = 200;

// 坐标格
var size = 500, step = 25;
var geometry = new THREE.Geometry();
for ( var i = - size; i <= size; i += step ) {
    geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );
    geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
    geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );
}
var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.2 } );
var line = new THREE.Line( geometry, material );
line.type = THREE.LinePieces;
scene.add( line );

//灯光
var ambientLight = new THREE.AmbientLight( Math.random() * 0x10 );
scene.add( ambientLight );
var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
directionalLight.position.x = Math.random() - 0.5;
directionalLight.position.y = Math.random() - 0.5;
directionalLight.position.z = Math.random() - 0.5;
directionalLight.position.normalize();
scene.add( directionalLight );
var directionalLight = new THREE.DirectionalLight( Math.random() * 0xffffff );
directionalLight.position.x = Math.random() - 0.5;
directionalLight.position.y = Math.random() - 0.5;
directionalLight.position.z = Math.random() - 0.5;
directionalLight.position.normalize();
scene.add( directionalLight );

var renderer = new THREE.CanvasRenderer(); //Canvas渲染
//var renderer = new THREE.WebGLRenderer(); //WebGL渲染
renderer.setClearColor( 0xf0f0f0 );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var last = 0;
var rotate = 0;
var render = function () {
    requestAnimationFrame(render);
    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
    var timer = Date.now() * 0.00005;
    camera.position.x = Math.cos( timer ) * 200;
    camera.position.z = Math.sin( timer ) * 200; //旋转视角(自动旋转)
    //camera.position.x = Math.cos( rotate ) * 200;
    //camera.position.z = Math.sin( rotate ) * 200; //旋转视角(手动旋转)
    if ( Date.now() - last > speed ) {
        move(); //移动函数调用
        last = Date.now();
    }
    label.innerHTML = "score:" + score; //实时刷新得分
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
    stats.update(); //fps监听

};

var onWindowResize = function() {
    camera.left = window.innerWidth / - 2;
    camera.right = window.innerWidth / 2;
    camera.top = window.innerHeight / 2;
    camera.bottom = window.innerHeight / - 2;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
};
window.addEventListener( 'resize', onWindowResize, false );
render();