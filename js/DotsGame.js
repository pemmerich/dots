function DotsGame(board,numDots)
{
	console.log("create dots game");
	this.board = board;
	this.numDots = numDots;
	this.collisions = 0;
	this.collisionsAllowed = 4;
	this.elapsedTime;
	this.hero = $("<div class='hero'></div>");
	this.board.append(this.hero);
	this.dots=[];
	this.startTime;
	this.touching;
	
	setTimeout(function(){
		this.initGame();
	},1000);
	
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
		
		self.board.append("<div id='clock' class='ui-text-normal'></div>");
		self.board.append("<div id='lives' class='ui-text-normal'></div>");
		self.startTime = new Date().getTime();
		self.elapsedTime=0;
		
		
		
		for(i=0; i < self.numDots; i++){
			var dot = new Dot(self.board,i);
			self.dots.push(dot);
		}
		
		
		
		if("ontouchstart" in window) {
			 $(document).bind("touchstart touchmove",function(e) {
				 console.log("touch");
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
		}
		
		
		
		if("ondeviceorientation" in window){
			var vx=0;
			var vy=0;
			var x=self.board.width()/2;
			var y=self.board.height()/2;
			var ax = 0;  
			var ay = 0; 
			
			//alert("access to motion");
			/*
			window.ondevicemotion = function(event) {
				
				if(!self.touching){
					ax = event.accelerationIncludingGravity.x;  
					ay = event.accelerationIncludingGravity.y;  
				
				
					var landscapeOrientation = window.innerWidth/window.innerHeight > 1;
					if ( landscapeOrientation) {
						vx =  ay;
						vy =  ax;
					} else {
						vy = - ay;
						vx =  ax;
					}
					vx = vx * 6;
					vy = vy * 6;
					y = parseInt(y + vy);
					x = parseInt(x + vx);
				
					if (x<0) { x = 0; vx = -vx; }
					if (y<0) { y = 0; vy = -vy; }
					if (x>self.board.width()-20) { x = self.board.width()-20; vx = -vx; }
					if (y>self.board.height()-20) { y = self.board.height()-20; vy = -vy; }
				
					$('.hero').css('top', y + 'px');
					$('.hero').css('left', x + 'px');
				}
				
			}
			*/
		}else{
			//alert("no access to motion");
		}
		
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
				}
			}

			var lives = "LIVES: "+(self.collisionsAllowed-self.collisions);
			$('#lives').html(lives);

		},10);
		
	   
	}
	
	
	

};//end dots game prototype