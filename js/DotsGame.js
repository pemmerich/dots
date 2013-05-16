function DotsGame(board,numDots)
{
	console.log("create dots game");
	this.board = board;
	this.numDots = numDots;
	this.collisions = 0;
	this.elapsedTime;
	this.hero = $("<div class='hero'></div>");
	this.board.append(this.hero);
	
	
	this.initGame();
}

DotsGame.prototype = {
		
		
	initGame:function()
	{
		
		var self=this;
		console.log(" init dots game ");
		
		self.board.append("<div id='clock'></div>");
		self.elapsedTime=0;
		$('#clock').html(self.elapsedTime);
		
		for(i=0; i < self.numDots; i++){
			var dot = new Dot(self.board);
		}
		
		
		
		if("ontouchstart" in window) {
			 $(document).bind("touchstart touchmove",function(e) {
				 console.log("touch");
			        self.hero.offset({
			            top: e.originalEvent.touches[0].pageY - self.hero.height() / 2,
			            left: e.originalEvent.touches[0].pageX - self.hero.width() / 2
			        });
			    });
		} else {
			 $(document).bind("mousemove",function(e) {
			        self.hero.offset({
			            top: e.pageY - self.hero.height() / 2,
			            left: e.pageX - self.hero.width() / 2
			        });
			    });
		}
		
		
		var dotsInterval = setInterval(function(){
			var list = $(".hero").collision(".dot");
			console.log("interval");
			self.elapsedTime+=.01;
			$('#clock').html(Math.floor(self.elapsedTime));
			
			if(list.length >0){
				self.collisions += list.length;
				for (var i = 0; i < list.length; i++) {
					console.log(list[i]);
					$(list[i]).remove();
					  // Do something with element i.
				}
				if(self.collisions >= self.numDots){
					$('#clock').append("<br>Game Over");
					clearInterval(dotsInterval);
				}
			}
		},10);
		
	   
	}
	
	
	

};//end dots game prototype