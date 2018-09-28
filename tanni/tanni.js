phina.globalize();

var ASSETS = {
	image: {
		'chimpan': 'Resource/chimpanzee.png',
		'bg_school': 'Resource/bg_school.jpg',
	}
}

phina.define('MainScene',{
	superClass:'DisplayScene',
	
	init: function(){
		this.superInit();
		
		this.timer = 0;
		this.count = 0;
		this.cdown = 30 * 1000;
		
		this.bg = Sprite('bg_school').addChildTo(this);
		//this.bg.setSize(640,320);
		this.bg.setScale(0.4,0.4);
		this.bg.setOrigin(0,0);
		
		this.chimpan = Sprite('chimpan').addChildTo(this);
		this.chimpan.x = phina.input.Mouse.x;
		this.chimpan.y = 260;
		this.chimpan.setScale(0.1,0.1);
		//this.chimpan.width = 100;
		//this.chimpan.height = 100;
		
		this.backgroundColor = 'Blue';
		
		this.lbl_count = Label("取得単位数: " + this.count).addChildTo(this);
		this.lbl_count.setScale(0.5,0.5);
		this.lbl_count.x = 60;
		this.lbl_count.y = 25;
		
		this.lbl_time = Label("残り時間: " + this.cdown).addChildTo(this);
		this.lbl_time.setScale(0.5,0.5);
		this.lbl_time.x = 60;
		this.lbl_time.y = 50;
		
		this.lbl_end = Label("終了").addChildTo(this);
		this.lbl_end.setScale(0.5,0.5);
		this.lbl_end.x = 320;
		this.lbl_end.y = 160;
		this.lbl_end.hide();
		
		this.t_group = DisplayElement().addChildTo(this);
		
		
		/*
		var circle = CircleShape().addChildTo(this);
		circle.x = 200;
		circle.y = 480;
		circle.fill = 'cyan';
		*/
	},
	
	update :function(app){
		this.chimpan.x = app.pointer.x;
		
		//console.log(app.deltaTime)
		
		this.timer += app.deltaTime;
		this.cdown -= app.deltaTime;
		
		if(this.cdown <= 0){
			this.lbl_count.hide();
			this.lbl_time.hide();
			this.lbl_end.show();
			
			if(this.cdown <= -3 * 1000){
				this.exit({score: this.count});
			}
			return;
		}
		
		//this.timer = Math.floor(this.timer);
		
		//console.log(this.timer);
		

		if(this.timer >= 500){
			this.timer = 0;
			console.log("OK");
			/*
			CircleShape({
				fill:'cyan',
				radius:15,
			}).addChildTo(this.t_group);
			Label('単位').addChildTo(this.t_group);
			*/
			TanniShape().addChildTo(this.t_group);
			this.t_group.children.last.x = Random.randint(10,630);
			this.t_group.children.last.y = -75;
		}
		
		this.t_group.children.forEach(function(child){
			child.y += 20;
			if(child.y >= 400){
				child.remove();
			}
			else if(Distance(child.x,child.y,this.chimpan.x,this.chimpan.y,30)){
				child.remove();
				this.count++;
			}
		},this)
		//this.t_group.children += 10;
		this.lbl_count.text = "取得単位数: " + this.count;
		this.lbl_time.text = "残り時間: " + Math.floor(this.cdown / 1000);
	},
});

phina.define('TanniShape',{
	superClass: 'CircleShape',
	
	init: function() {
		this.superInit({
			radius: 15,
			fill:'cyan',
		});
		
		this.lbl = Label('単位').addChildTo(this);
		this.lbl.setScale(0.4,0.4);
		this.lbl.x = this.x;
		this.lbl.y = this.y;
	},
	
})

phina.main(function(){
	console.log(phina.VERSION);
	var app = GameApp({
		startLabel: 'title',
		title:'単位キャッチャー',
		assets: ASSETS,
		height:320
	});
	
	app.run();
});

function Distance(x1,y1,x2,y2,dist){
	var a,b,d;
	
	a = x1 - x2;
	b = y1 - y2;
	
	if(Math.sqrt(a * a + b * b) < dist){
		return true;
	}
	else{
		return false;
	}
}