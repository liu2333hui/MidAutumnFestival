import { _decorator, Component, CameraComponent, systemEvent, SystemEventType, Touch, PhysicsSystem, geometry, LabelComponent, MeshRenderer, Material } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('game')
export class game extends Component {

@property({displayName: "3D相机", type: CameraComponent})
    camera: CameraComponent = null!;

    @property({displayName: "描边材质", tooltip: "描边材质", type: Material})
    outline: Material = null!;

    @property({displayName: "默认材质", tooltip: "默认材质", type: Material})
    default: Material = null!;

// 上一个选中的结果
    last: MeshRenderer = null!;


    //https://www.nowcoder.com/discuss/517362217574989824?urlSource=sitemap
    onLoad(){
systemEvent.on(SystemEventType.TOUCH_START, (e: Touch) => {
            // 获取触摸点并且创建射线
            let pos = e.getLocation();
            let ray = this.camera.screenPointToRay(pos.x, pos.y);
            // 传入射线
            this.rayCollisionDetection(ray);
        }, this);

    }


     rayCollisionDetection (ray: geometry.Ray) {
        // 如果选中了节点
        if (PhysicsSystem.instance.raycastClosest(ray) == true) {
            // 获取射线最短的检测结果
            var node = PhysicsSystem.instance.raycastClosestResult;
            // 获取名字
            let name = node.collider.name;

            console.log("月饼", name);

// 设置检测结果的材质为红色描边
            node.collider.node.getComponent(MeshRenderer)!.material = this.outline;
            // 如果不是第一次选中并本次选中和上次不同
            if (this.last != null && node.collider.node.getComponent(MeshRenderer) != this.last) {
                // 设置为默认材质
                this.last.material = this.default;
            }
            // 设置上次选中的结果
            this.last = node.collider.node.getComponent(MeshRenderer)!;
      }
     }


    update(deltaTime: number) {
        
    }

   onClick(){
       alert("抱抱");
          // ??
    }
}

