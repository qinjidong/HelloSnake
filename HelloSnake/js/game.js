/**
 * Created by QIN on 14-6-15.
 */

//var isCube = new Array( 1600 ); //判断当前格子有没有立方块（蛇）
var length = 0; //当前蛇身长度
var speed = 80; //蛇运行速度
var direction = 'left'; //蛇运行方向，初始向左
var score = 0; //得分

//for ( var i = 0; i < 1600; i ++ ) {
//    isCube[i] = 0;
//} //初始化都没有

//蛇
var geometry = new THREE.BoxGeometry( 25,25,25 );
var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 } );
var cube = new Array( 1600 );
for ( var i = 0; i < 3; i ++ ) { //初始化蛇身为10个单位长度（10个立方块），规定cube[0]为蛇头
    cube[i] = new THREE.Mesh( geometry, material );
//    cube[i].scale.y = 1;
    cube[i].position.x = i * 25 + 12.5;
    cube[i].position.y = 12.5;
    cube[i].position.z = 0 * 25 + 12.5; //取立方块中心点坐标为蛇的坐标
    scene.add( cube[i] );
    length ++;
}

//移动
var move = function() {
    switch ( direction ) {
        case 'up':
            for ( var i = length - 1; i > 0; i -- ) {
                cube[i].position.x = cube[i-1].position.x;
                cube[i].position.z = cube[i-1].position.z;
                touchEdge( i ); //判断并处理蛇出边缘情况（从另一边出来）
            }
            cube[0].position.z -= 25;
            touchEdge( 0 );
            touchSnake(); //判断当前蛇头是否触碰蛇身
            break;
        case 'down':
            for ( var i = length - 1; i > 0; i -- ) {
                cube[i].position.x = cube[i-1].position.x;
                cube[i].position.z = cube[i-1].position.z;
                touchEdge( i ); //判断并处理蛇出边缘情况（从另一边出来）
            }
            cube[0].position.z += 25;
            touchEdge( 0 );
            touchSnake(); //判断当前蛇头是否触碰蛇身
            break
        case 'left':
            for ( var i = length - 1; i > 0; i -- ) {
                cube[i].position.x = cube[i-1].position.x;
                cube[i].position.z = cube[i-1].position.z;
                touchEdge( i ); //判断并处理蛇出边缘情况（从另一边出来）
            }
            cube[0].position.x -= 25;
            touchEdge( 0 );
            touchSnake(); //判断当前蛇头是否触碰蛇身
            break;
        case 'right':
            for ( var i = length - 1; i > 0; i -- ) {
                cube[i].position.x = cube[i-1].position.x;
                cube[i].position.z = cube[i-1].position.z;
                touchEdge( i ); //判断并处理蛇出边缘情况（从另一边出来）
            }
            cube[0].position.x += 25;
            touchEdge( 0 );
            touchSnake(); //判断当前蛇头是否触碰蛇身
            break;
    }
    eatFood(); //吃食物？
}

//食物
var food;
var createFood = function() {
    var geometry = new THREE.BoxGeometry( 25,25,25 );
    var material = new THREE.MeshLambertMaterial( { color: 'red', shading: THREE.FlatShading, overdraw: 0.5 } );
    food = new THREE.Mesh( geometry, material );
    food.position.x = Math.floor( ( Math.random() * 1000 - 500 ) / 25 ) * 25 + 12.5;
    food.position.y = 12.5;
    food.position.z = Math.floor( ( Math.random() * 1000 - 500 ) / 25 ) * 25 + 12.5;
    scene.add(food);
}

createFood(); //游戏开始时添加一个食物

var eatFood = function() {
    if( ( cube[0].position.x == food.position.x ) && ( cube[0].position.z == food.position.z ) ) {
        scene.remove( food ); //移除食物
        var geometry = new THREE.BoxGeometry( 25,25,25 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 } );
        cube[length] = new THREE.Mesh( geometry, material );
        cube[length].position.x = cube[length-1].position.x + 25;
        cube[length].position.y = 12.5;
        cube[length].position.z = cube[length-1].position.z;
        scene.add( cube[length] ); //加一截蛇身
        if( speed > 1 )
            speed -= 1; //加快蛇移动速度
        length ++;
        createFood(); //添加食物
        score += 100; //增加得分
//        播放音效？
    }
}

//判断蛇头触碰蛇神情况，如果触碰，则游戏结束
var touchSnake = function() {
    for( var i = 1; i < length; i++ ) {
        if( ( cube[0].position.x == cube[i].position.x ) && ( cube[0].position.z == cube[i].position.z ) )
            endGame();
    }
//    播放音效？
}

//判断并处理蛇到边缘情况
var touchEdge = function( i ) {
    if( cube[i].position.x >  500 - 12.5 ) cube[i].position.x = -500 + 12.5;
    if( cube[i].position.x < -500 + 12.5 ) cube[i].position.x =  500 - 12.5;
    if( cube[i].position.z >  500 - 12.5 ) cube[i].position.z = -500 + 12.5;
    if( cube[i].position.z < -500 + 12.5 ) cube[i].position.z =  500 - 12.5;
}

var endGame = function() {
    alert("Game over！\nscore: " + score);
    for( var i = 0; i < length; i++ ) {
        scene.remove( cube[i] );
    }
    length = 0;
    speed = 80;
    score = 0;
    var geometry = new THREE.BoxGeometry( 25,25,25 );
    var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 } );
    cube = new Array( 1600 );
    for ( var i = 0; i < 3; i ++ ) {
        cube[i] = new THREE.Mesh( geometry, material );
        cube[i].position.x = i * 25 + 12.5;
        cube[i].position.y = 12.5;
        cube[i].position.z = 0 * 25 + 12.5;
        scene.add( cube[i] );
        length ++;
    }
    direction = 'left';
} //游戏结束,重新开始