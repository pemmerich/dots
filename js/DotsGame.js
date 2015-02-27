function DotsGame(board,numDots)
{
	console.log("create dots game");
	this.board = board;
	this.numDots = numDots;
	this.collisions = 0;
	this.collisionsAllowed = 4;
	this.elapsedTime;
	this.hero;
	this.dots;
	this.startTime;
	this.touching;
	this.monitoring=false;
	
	this.initGame();
	
	
}

DotsGame.prototype = {
		
		
	initGame:function()
	{
		
		var self=this;
		console.log(" init dots game ");
		
		var w = self.board.width();
		var h = self.board.height();
		var size;
		if(w>h){
			size=w*.15;
		}else{
			size=h*.15;
		}
		//$('.hero').height(size);
		//$('.hero').width(size);
		self.hero = $("<div class='hero'></div>");
		self.board.append(self.hero);

		self.board.append("<div id='clock' class='ui-text-normal'></div>");
		self.board.append("<div id='lives' class='ui-text-normal'></div>");
		self.board.append("<div id='replay' class='ui-text-small ui-btn'>Replay</div>");
		self.board.append("<div id='menu' class='ui-text-small ui-btn'>Menu</div>");
		self.startTime = new Date().getTime();
		self.elapsedTime=0;
		
		$("#replay").bind("click",function(e) {
			console.log("replay");
			self.replayGame();
				 
		});
		
		self.createDots();
		
		
		
		if("ontouchstart" in window) {
			 $(document).bind("touchstart touchmove",function(e) {
				 console.log("touch");
				 if(!self.monitoring){
				 	self.monitorDots();
				 }
				 self.touching=true;
			        self.hero.offset({
			            top: e.originalEvent.touches[0].pageY - self.hero.height()*1.5,
			            left: e.originalEvent.touches[0].pageX - self.hero.width() / 2
			        });
			    });
			 $(document).bind("touchend",function(e) {
				 console.log("touch end");
				 self.touching=false;
			       
			    });
		} else {
			 $(document).bind("mousemove",function(e) {
			        self.hero.offset({
			            top: e.pageY - self.hero.height(),
			            left: e.pageX - self.hero.width() / 2
			        });
			    });
			 self.monitorDots();
		}
		
		
		
	   
	},
	replayGame:function(){

		var self=this;
		console.log(" replay dots game ");

		self.collisions = 0;

		self.board.append(self.hero);

		$('#replay').css({"display":"none"});
		$('#menu').css({"display":"none"});

		self.startTime = new Date().getTime();
		self.elapsedTime=0;

		self.createDots();
		
		self.monitorDots();

	},
	monitorDots:function(){
		var self=this;
		console.log(" start monitor dots game ");
		self.monitoring=true;
		var dotsInterval = setInterval(function(){
			var list = $(".hero").collision(".dot");
			
			var curTime = new Date();
			self.elapsedTime = Math.floor((curTime.getTime()-self.startTime)/1000);
			curTime = null;
			
			$('#clock').html("SCORE:"+Math.floor(self.elapsedTime));
			
			if(list.length >0){
				self.collisions += list.length;
				console.log("collisions = "+self.collisions+" list lenght = "+list.length);
				for (var i = 0; i < list.length; i++) {
					console.log(list[i]);
					//$(list[i]).remove();
					var id = Number($(list[i]).attr('id').replace("dot-",""));
					self.dots[id].initDot();
				}
				if(self.collisions >= self.collisionsAllowed){
					$('#clock').append("<br>GAME OVER");
					clearInterval(dotsInterval);
					self.monitoring=false;
					for(i=0; i < self.dots.length; i++){
						self.dots[i].removeDot();
					}
					$('#replay').css({"display":"block"});
					$('#menu').css({"display":"block"});
					self.hero.remove();
				}
			}

			var lives = "LIVES: "+(self.collisionsAllowed-self.collisions);
			$('#lives').html(lives);

		},10);
	},
	createDots:function(){
		var self = this;
		self.dots=[];
		for(i=0; i < self.numDots; i++){
			var dot = new Dot(self.board,i);
			self.dots.push(dot);
		}
	}
	
	
	

};//end dots game prototype