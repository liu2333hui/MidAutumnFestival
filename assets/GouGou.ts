import { _decorator, Component, input, Vec3, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass } = _decorator;

@ccclass('GouGou')
export class GouGou extends Component {

    key;

    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);

console.log(this.node.getPosition(this._curPos));
this._targetPos = this._curPos;

    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
 input.off(Input.EventType.KEY_PRESSING, this.onKeyPressing, this);
    }


    update(dt){


this.node.getPosition(this._curPos);
this._targetPos = this._curPos;

       let step = 0.1;
        switch(this.key) {
           case "A":
               Vec3.add(this._targetPos, this._curPos, new Vec3(-step, 0, 0));  
	break;
         case  "D":
	Vec3.add(this._targetPos, this._curPos, new Vec3(+step, 0, 0));  
	break;

          case  "W":
	Vec3.add(this._targetPos, this._curPos, new Vec3(0,0,-step));  
	break;

          case  "S":
	Vec3.add(this._targetPos, this._curPos, new Vec3(0,0,+step));  
	break;
        
        }
       this.node.setPosition(this._targetPos);


    }

 onKeyPressing (event: EventKeyboard) {

}

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.key = "A";
	break;
            case KeyCode.KEY_D:
                this.key = "D";
	break;
            case KeyCode.KEY_W:
                this.key = "W";
	break;
            case KeyCode.KEY_S:
                this.key = "S";
	break;
        }
        console.log(this.key)
    }

    // current position of the
    private _curPos: Vec3 = new Vec3();
    // The difference of the current frame movement position during each jump
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    // Target position of the character
    private _targetPos: Vec3 = new Vec3();


    onKeyUp (event: EventKeyboard) {

         switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.key = "";
	break;
            case KeyCode.KEY_D:
                this.key = "";
	break;
            case KeyCode.KEY_W:
                this.key = "";
	break;
            case KeyCode.KEY_S:
                this.key = "";
	break;
        }
    }

    
    
}

