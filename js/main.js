(function(global) {
	
	
	// Creating our presentation and global namespace "app"
	  global.game = new DotsGame($('#game-board'),5);

 
})(window);


// Prevent vertical bouncing of slides
document.ontouchmove = function(e) {
   e.preventDefault();
};

