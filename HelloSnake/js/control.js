/**
 * Created by QIN on 14-6-15.
 */

function onKeyDown( event ){
    if( event.keyCode == 37 ) { //←
        if(direction != 'right') {
            direction = 'left';
        }
    }
    if( event.keyCode == 38 ) { //↑
        if(direction != 'down') {
            direction = 'up';
        }
    }
    if( event.keyCode == 39 ) { //→
        if(direction != 'left') {
            direction = 'right';
        }
    }
    if( event.keyCode == 40 ) { //↓
        if(direction != 'up') {
            direction = 'down';
        }
    }
    if( event.keyCode == 65 ) { //a
        rotate += 0.01;
    }
    if( event.keyCode == 68 ) { //d
        rotate -= 0.01;
    }
	if( event.keyCode == 13 ) { //enter
        rotate += 0.01;
    }
}

function onKeyUp( event ){

}

window.addEventListener( 'keydown', onKeyDown, true );
window.addEventListener( 'keyup', onkeyUp, false );
