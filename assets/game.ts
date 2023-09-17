import { _decorator, Component, CameraComponent, Node,instantiate,
systemEvent, SystemEventType, Touch, PhysicsSystem, geometry, 
LabelComponent, MeshRenderer, Material, Prefab } from 'cc';
const { ccclass, property } = _decorator;

enum 模型类型{
    五仁,
    兔子,
    月亮,
    莲花    
};


@ccclass('game')
export class game extends Component {



@property({displayName: "3D相机", type: CameraComponent})
    camera: CameraComponent = null!;

    //@property({displayName: "描边材质", tooltip: "描边材质", type: Material})
    //outline: Material = null!;

    //@property({displayName: "月饼材质", tooltip: "月饼材质", type: Material})
    //default: Material = null!;

    @property(Node)
    游戏盘;


    @property({displayName: "五仁模型", tooltip: "五仁模型", type: Prefab})
    五仁: Prefab = null!;
    @property({displayName: "五仁材质", tooltip: "五仁材质", type: Material})
    五仁材质: Material = null!;
    @property({displayName: "五仁描边材质", tooltip: "五仁描边材质", type: Material})
    五仁描边材质: Material = null!;


    @property({displayName: "兔子模型", tooltip: "兔子模型", type: Prefab})
    兔子: Prefab  = null!;
    @property({displayName: "兔子材质", tooltip: "兔子材质", type: Material})
    兔子材质: Material = null!;
    @property({displayName: "兔子描边材质", tooltip: "兔子描边材质", type: Material})
    兔子描边材质: Material  = null!;

    @property({displayName: "月亮模型 ", tooltip: "月亮模型 ", type: Prefab})
    月亮: Prefab  = null!;
    @property({displayName: "月亮材质", tooltip: "月亮材质", type: Material})
    月亮材质: Material = null!;
    @property({displayName: "月亮描边材质", tooltip: "月亮描边材质", type: Material})
    月亮描边材质: Material  = null!;

    @property({displayName: "莲花模型 ", tooltip: "莲花模型 ", type: Prefab})
    莲花: Prefab  = null!;
    @property({displayName: "莲花材质", tooltip: "莲花材质", type: Material})
    莲花材质: Material = null!;
    @property({displayName: "莲花描边材质", tooltip: "莲花描边材质", type:Material})
    莲花描边材质: Material  = null!;


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

    //游戏参数
    关号 : int = 0;
    长 : int = 8;
    宽  : int= 8;
    游戏数组 = [];

    随机生成关(){
        // this.游戏盘.
         console.log(this.游戏盘)

         this.游戏数组 = [];
        
          this.游戏盘.removeAllChildren();
        for(let i = 0; i < this.长; i++){
                let 行 = []
           for(let j = 0; j < this.宽 ; j++){
                let 模型;
                let id = Math.floor(Math.random() * (3  )) //到时候改成类型的数量
                if(id == 模型类型.兔子)  模型 = instantiate(this.兔子);
                else if(id == 模型类型.五仁)  模型 = instantiate(this.五仁);
	else if(id == 模型类型.月亮)  模型 = instantiate(this.月亮);
	//if(id == 模型类型.莲花)  模型 = instantiate(this.莲花);
	
	console.log(i,j,id)
	//console.log(模型类型.兔子, 模型类型.月饼

                模型?.setPosition(i*1.5, 0, j*1.5);
	行.push(id)
                this.游戏盘.addChild(模型);
           }
             this.游戏数组.push(行);
        }
        console.log(this)
    }

    start(){
        //创造游戏
        this.随机生成关();
        //this.从文件(关号);

    }

     getType(name){
         //Name is "？？模型-01"
       let i = 0; 
       let subname = "";
        for(i = 0; i < name.length; i++){
           if( name[i] == "-") break;
            subname += name[i];
          }
         if(subname == "兔子模型") return 模型类型.兔子;
         if(subname == "月亮模型") return 模型类型.月亮;
         if(subname == "五仁模型") return 模型类型.五仁;
         if(subname == "莲花模型") return 模型类型.莲花;
          
     }


    // 上一个选中的结果
    last: MeshRenderer = null!;
     last_material: Material = null!;
      last_type : 模型类型;

     rayCollisionDetection (ray: geometry.Ray) {
        // 如果选中了节点
        if (PhysicsSystem.instance.raycastClosest(ray) == true) {
            // 获取射线最短的检测结果
            var node = PhysicsSystem.instance.raycastClosestResult;
            // 获取名字
            let name = node.collider.name;

            console.log("月饼", name);
	console.log(node.collider.node.name);
           let type = this.getType(node.collider.node.name);
         console.log(node.collider.node.name, type);

         let 描边材质;
         if(type == 模型类型.兔子) 描边材质 = this.兔子描边材质;
         else if(type == 模型类型.月亮) 描边材质 =this.月亮描边材质;
         else if(type == 模型类型.五仁) 描边材质 = this.五仁描边材质;
         else if(type == 模型类型.莲花) 描边材质 =this.莲花描边材质;

           this.last_type = type;
           
	//this.last_material = node.collider.node.getComponent(MeshRenderer)!.material

	node.collider.node.getComponent(MeshRenderer)!.material = 描边材质;
	
	if(this.last != null && node.collider.node.getComponent(MeshRenderer) != this.last){
		this.last.material = this.last_material;
		/*
	             if(type == 模型类型.兔子) this.last.material = this.兔子材质;
         		else if(type == 模型类型.月亮) this.last.material = this.月亮材质;
        		else if(type == 模型类型.五仁) this.last.material = this.五仁材质;
         		else if(type == 模型类型.莲花) this.last.material = this.莲花材质;
		*/
                }
	this.last = node.collider.node.getComponent(MeshRenderer)!;
	             if(type == 模型类型.兔子) this.last_material= this.兔子材质;
         		else if(type == 模型类型.月亮) this.last_material = this.月亮材质;
        		else if(type == 模型类型.五仁)this.last_material = this.五仁材质;
         		else if(type == 模型类型.莲花)this.last_material= this.莲花材质;


	/*
	// 设置检测结果的材质为红色描边
            node.collider.node.getComponent(MeshRenderer)!.material = this.outline;
            // 如果不是第一次选中并本次选中和上次不同
            if (this.last != null && node.collider.node.getComponent(MeshRenderer) != this.last) {
                // 设置为默认材质
                this.last.material = this.default;
            }
            // 设置上次选中的结果
            this.last = node.collider.node.getComponent(MeshRenderer)!;
	*/


      }
     }


    update(deltaTime: number) {
        
    }

   onClick(){
       alert("抱抱");
          // ??
    }
}

