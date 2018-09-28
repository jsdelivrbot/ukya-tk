phina.globalize();

var ASSETS = {
	image: {
		'chimpan': 'Resource/chimpanzee.png',
		'bg_school': 'Resource/bg_school.jpg',
	}
};

var LIMIT_TIME = 30;
var FALL_TIME = 0.5;
var FALL_SPEED = 75;

phina.define('MyMainScene', {
	superClass: 'DisplayScene',

	init: function () {
		this.superInit();

		this.score = 0;
		this.time_fall = FALL_TIME * 1000;
		this.time_end = 3 * 1000;

		this.bg = Sprite('bg_school').addChildTo(this);
		//this.bg.setSize(640,320);
		this.bg.setScale(0.4, 0.4);
		this.bg.setOrigin(0, 0);


		this.chimpan = Sprite('chimpan').addChildTo(this);
		this.chimpan.x = phina.input.Mouse.x;
		this.chimpan.y = 260;
		this.chimpan.setScale(0.1, 0.1);
		//this.chimpan.width = 100;
		//this.chimpan.height = 100;

		//this.backgroundColor = 'Blue';

		/*
		this.lbl_count = Label("取得単位数: " + this.count).addChildTo(this);
		this.lbl_count.setScale(0.5,0.5);
		this.lbl_count.x = 60;
		this.lbl_count.y = 25;
		*/

		/*
		this.lbl_time = Label("残り時間: " + this.cdown).addChildTo(this);
		this.lbl_time.setScale(0.5,0.5);
		this.lbl_time.x = 60;
		this.lbl_time.y = 50;
		*/


		this.lbl_end = Label("終了").addChildTo(this);
		//this.lbl_end.setScale(0.5,0.5);
		this.lbl_end.x = 320;
		this.lbl_end.y = 160;
		this.lbl_end.hide();


		this.gg_time = Gauge({
			width: 620,
			height: 10,
			x: 320,
			y: 10,
			maxValue: LIMIT_TIME * 1000,
			value: LIMIT_TIME * 1000,
		}).addChildTo(this);

		this.t_group = DisplayElement().addChildTo(this);


		/*
		var circle = CircleShape().addChildTo(this);
		circle.x = 200;
		circle.y = 480;
		circle.fill = 'cyan';
		*/
	},

	update: function (app) {
		this.chimpan.x = app.pointer.x;

		//console.log(app.deltaTime)

		this.time_fall -= app.deltaTime;
		this.gg_time.value -= app.deltaTime;

		if (this.gg_time.isEmpty()) {
			this.time_end -= app.deltaTime;
			this.lbl_end.show();

			if (this.time_end <= 0) {
				this.exit({ score: this.score });
			}
			return;
		}

		//this.timer = Math.floor(this.timer);

		//console.log(this.timer);


		if (this.time_fall <= 0) {
			this.time_fall = FALL_TIME * 1000;
			console.log("OK");
			/*
			CircleShape({
				fill:'cyan',
				radius:15,
			}).addChildTo(this.t_group);
			Label('単位').addChildTo(this.t_group);
			*/
			TanniShape().addChildTo(this.t_group);
			this.t_group.children.last.x = Random.randint(10, 630);
			this.t_group.children.last.y = -FALL_SPEED;
		}

		this.t_group.children.forEach(function (child) {
			child.y += 20;
			if (child.y >= 400) {
				child.remove();
			}
			else if (Distance(child.x, child.y, this.chimpan.x, this.chimpan.y, 30)) {
				child.remove();
				this.score++;
			}
		}, this);
		//this.t_group.children += 10;
		//this.lbl_count.text = "取得単位数: " + this.count;
		//this.lbl_time.text = "残り時間: " + Math.floor(this.cdown / 1000);
	},
});

phina.define('MyTitleScene', {
  superClass: 'DisplayScene',

  init: function (param) {
    this.superInit();

    this.bg = Sprite('bg_school').addChildTo(this);
		this.bg.setScale(0.4, 0.4);
		this.bg.setOrigin(0, 0);

		this.lbl_title = Label(param.title).addChildTo(this);
		this.lbl_title.x = 320;
		this.lbl_title.y = 120;

		this.lbl_start = Label('Touch to Start').addChildTo(this);
		this.lbl_start.setScale(0.5, 0.5);
		this.lbl_start.x = 320;
		this.lbl_start.y = 180;
  },
  onclick: function () {
    this.exit();
  }
});

phina.define('MyResultScene', {
  superClass: 'DisplayScene',
  
  init: function (param) {
    this.superInit();

    this.bg = Sprite('bg_school').addChildTo(this);
	this.bg.setScale(0.4, 0.4);
	this.bg.setOrigin(0, 0);

	this.lbl_score = Label('取得単位数:' + param.score).addChildTo(this);
	this.lbl_score.x = 320;
	this.lbl_score.y = 120;

	this.btn_retry = Button({
		text: 'リトライ',
		fontSize: 24,
		width: 80,
		height: 80,
		cornerRadius: 38,
		x: 240,
		y: 200,
	}).addChildTo(this);

	this.btn_tweet = Button({
		text:'Twitter投稿',
		fontSize:12,
		width: 80,
		height: 80,
		cornerRadius: 38,
		x: 400,
		y: 200
	}).addChildTo(this);
	
	/*
	this.btn_regranking = Button({
		text:'ランキング登録',
		fontSize: 8,
		width: 80,
		height: 80,
		cornerRadius: 38,
		x:400,
		y:200
	}).addChildTo(this);
	
	this.btn_viewranking = Button({
		text:'ランキングを見る',
		fontSize:6,
		width:80,
		height:80,
		cornerRadius:38,
		x:320,
		y:260
	}).addChildTo(this);
	*/

	var self = this;

	this.btn_retry.onpush = function () {
		self.exit();
	};

	this.btn_regranking.onpush = function(){
		var name = window.prompt("名前を入力してね");
		if(name == null){
			return;
		}
		$.post("rankingregist.php",{"score":param.score,"name":name},function(data){
			//console.log("OK," + data);
			window.alert("登録完了 単位数:" + param.score + ",名前:" + name);
		});
		//location.href = "http://www.google.com"
		//self.exit('MyRegistRanking');
	};
	
	this.btn_viewranking.onpush = function(){
		location.href = "ranking.php";
	}

	this.btn_tweet.onpush = function(){
		var text = "取得単位数:" + param.score;
		var url = phina.social.Twitter.createURL({
			text:text,
			hashtags:'',
		});
		window.open(url,'share window','width=480,height=320');
	}
  },

});

phina.define('MyRegistRankingScene',{
	superClass: 'DisplayScene',

	init: function(){
		this.superInit();

		this.bg = Sprite('bg_school').addChildTo(this);
		this.bg.setScale(0.4, 0.4);
		this.bg.setOrigin(0, 0);

	}

});

phina.define('TanniShape', {
	superClass: 'CircleShape',

	init: function () {
		this.superInit({
			radius: 15,
			fill: 'cyan',
		});

		this.lbl = Label('単位').addChildTo(this);
		this.lbl.setScale(0.4, 0.4);
		this.lbl.x = this.x;
		this.lbl.y = this.y;
	},

});

/*
phina.define('MyManagerScene',{
  superClass:'ManagerScene',
  init:function(){
    this.superInit({
      scenes: [
        {
          label:'タイトル',
          className:'MyTitleScene',
          nextLabel:'メイン',
        },
        {
          label:'メイン',
          className:'MyMainScene',
          nextLabel:'タイトル',
        },
        {
          label:'リザルト',
          className:'MyResultScene',
          nextLabel:'メイン',
        }
      ]
    });
  }
});
*/

phina.main(function () {
	console.log(phina.VERSION);
	var app = GameApp({
		startLabel: 'MyTitle',
		title: '単位キャッチャー',
		assets: ASSETS,
		scenes: [
			{
				label: 'MyTitle',
				className: 'MyTitleScene',
				nextLabel: 'MyMain',
			},
			{
				label: 'MyMain',
				className: 'MyMainScene',
				nextLabel: 'MyResult',
			},
			{
				label: 'MyResult',
				className: 'MyResultScene',
				nextLabel: 'MyMain',
			},
			{
				label: 'MyRegistRanking',
				className: 'MyRegistRankingScene',
				nextLabel: 'MyMain',
			}
		],
		height: 320
	});

	//	app.replaceScene(MyManagerScene());

	app.run();
});

function Distance(x1, y1, x2, y2, dist) {
	var a, b;

	a = x1 - x2;
	b = y1 - y2;

	if (Math.sqrt(a * a + b * b) < dist) {
		return true;
	}
	else {
		return false;
	}
}
