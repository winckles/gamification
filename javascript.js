// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
(function(){
	
	var Memory = {

		init: function(cards){
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$modal2 = $(".modal-2");
			this.$overlay2 = $(".modal-overlay-2");
			this.$restartButton = $("button.restart");
			this.$startButton = $("button.start");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.start();
			// this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     	this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function(){
			var _ = Memory;
			var $card = $(this);
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				if(!_.guess){
					_.guess = $(this).attr("data-id");
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function(){
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if($(".matched").length == $(".card").length){
					_.win();
				}
			}
		},

		start: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal2();
				Memory.$game.fadeOut();
			}, 500);
			this.$startButton.on("click", $.proxy(this.startFirst, this));			
		},

		startFirst: function(){
			this.hideModal2();
			// this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		win: function(){
			this.paused = true;
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function(){
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},

		showModal2: function(){
			this.$overlay2.show();
			this.$modal2.fadeIn("slow");
		},

		hideModal2: function(){
			this.$overlay2.hide();
			this.$modal2.hide();
		},

		reset: function(){
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function(array){
			var counter = array.length, temp, index;
	   	// While there are elements in the array
	   	while (counter > 0) {
        	// Pick a random index
        	index = Math.floor(Math.random() * counter);
        	// Decrease counter by 1
        	counter--;
        	// And swap the last element with it
        	temp = array[counter];
        	array[counter] = array[index];
        	array[index] = temp;
	    	}
	    	return array;
		},

		buildHTML: function(){
			var frag = '';
			this.$cards.each(function(k, v){
				frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
				<div class="front"><img src="'+ v.img +'"\
				alt="'+ v.name +'" /><div class="small-text"><p>'+ v.text +'</p></div></div>\
				<div class="back"><img src="assets/memory.png"\
				alt="Memory" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "triforce",
			img: "assets/triforce.gif",
			text: "Gamification\nTriforce",
			id: 1,
		},
		{
			name: "Human-Focused-Design",
			img: "assets/gamecard.png",
			text: "Human Focused",
			id: 2
		},
		{
			name: "training",
			img: "assets/yoshi.gif",
			text: "Training Elements",
			id: 3
		},
		{
			name: "presentation",
			img: "assets/mario.gif",
			text: "Presentation Elements",
			id: 4
		}, 
		{
			name: "charmeleon",
			img: "assets/charmeleon.gif",
			text: "Evolve your training",
			id: 5
		},
		{
			name: "switch",
			img: "assets/switch.gif",
			text: "Take action!",
			id: 6
		},
		{
			name: "arcade",
			img: "assets/arcade.gif",
			text: "Increased engagement\n& retention",
			id: 7
		},
		{
			name: "left",
			img: "assets/left.png",
			text: "Logic &\ncalculation",
			id: 8
		},
		{
			name: "right",
			img: "assets/right.png",
			text: "Creativity",
			id: 9
		},
		{
			name: "prizes",
			img: "assets/prizes.gif",
			text: "Engagement\nwith rewards",
			id: 10
		},
		{
			name: "darth",
			img: "assets/darth.gif",
			text: "'Bad' Motivators",
			id: 11
		},
		{
			name: "Jedi",
			img: "assets/yedi.gif",
			text: "'Good' Motivators",
			id: 12
		},
	];
    
	Memory.init(cards);


})();
