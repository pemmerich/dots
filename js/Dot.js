function Dot(board)
{
	console.log("create dot");
	this.board = board;
	this.dot = $("<div class='dot'></div>");
	this.board.append(this.dot);
	
	this.startPositions = ["top","right","bottom","left"];

	
	this.initDot();
}

Dot.prototype = {
			
	initDot:function()
	{
		var self=this;
		var ele = self.dot;
		ele.css('top', 'auto');
		ele.css('right', 'auto');
		ele.css('bottom', 'auto');
		ele.css('left', 'auto');
		
		var startPosition = self.startPositions[Math.floor(Math.random() * self.startPositions.length)];
		//console.log(" init dot ");
		
		var size = ele.width();
		ele.css(startPosition,'-'+size+'px');
		
		if(startPosition == "top"){
			ele.css('left', Math.random()*100+'%');
		}else if(startPosition == "right"){
			ele.css('top', Math.random()*100+'%');
		}else if(startPosition == "bottom"){
			ele.css('left', Math.random()*100+'%');
		}else if(startPosition == "left"){
			ele.css('top', Math.random()*100+'%');
		}
		
		var animObj={};
		animObj[startPosition]="100%";
		var speed = (Math.random()*3000)+1000;
		//console.log('speed = '+speed);
		ele.animate(animObj, speed, "linear", function(){
			self.initDot();
		});
		
		
		
	   
	}
	
	
	

};//end dot prototype