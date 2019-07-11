new Vue({
	el : "#app",
	data : {
		characterHealth: 100,
		monsterHealth: 100,
		gameStarted: false,
		char_attack_multiple : 10,
		special_attack_multiple : 25,
		char_heal_multiple : 20,
		monster_attack_multiple : 15,
		logs : [],
		log_text : {
			player_attack : "player attack :",
			player_special_attack : "player special attack :",
			player_healing : "player healed :",
			player_giveUp : "player gave up :",
			monster_attack : "monster attack :"

		},
		opponent : ["BULBASAUR", "CHARMANDER", "SQUIRTLE", "BUTTERFREE", "KAKUNA", "RATTATA", "NIDORAN"],
		selectedOpponent : ' '

	},
	created(){
		const selectedOpponent = Math.floor(Math.random() * this.opponent.length);
		this.selectedOpponent = this.opponent[selectedOpponent]
	},
	methods : {
		startGame : function() {
			this.gameStarted = true;
		},
		characterAttack : function(){
			var point = Math.ceil(Math.random() * this.char_attack_multiple);
			this.monsterHealth -= point;
			this.addLogs({turn : "p", text : this.log_text.player_attack + point});
			this.monsterAttack();

		},
		specialAttack : function(){
			var point = Math.ceil(Math.random() * this.special_attack_multiple);
			this.monsterHealth -= point;
			this.addLogs({turn : "p", text : this.log_text.player_special_attack + point});
			this.monsterAttack();
		},
		firstAid : function(){
			var point = Math.ceil(Math.random() * this.char_heal_multiple);
			this.characterHealth += point;
			this.addLogs({turn : "p", text : this.log_text.player_healing + point});
			this.monsterAttack();
		},
		giveUp : function(){
			this.characterHealth = 0;
			this.addLogs({turn : "m", text : this.log_text.player_giveUp});
		},
		monsterAttack: function(){
			var point = Math.ceil(Math.random() * this.monster_attack_multiple);
			this.characterHealth -= point;
			this.addLogs({turn : "m", text : this.log_text.monster_attack + point});
		},
		addLogs: function(log){
			this.logs.push(log);
		}


	},
	watch : {
		characterHealth : function(value){

			if(value <= 0){
				this.characterHealth = 0;
				if(confirm("You lost. Try again?")){
					this.characterHealth = 100;
					this.monsterHealth = 100;
					this.logs = [];
				}
			}else if(value >= 100) {
				this.characterHealth = 100;
			}

		},
		monsterHealth : function(value){

			if(value <= 0){
				this.monsterHealth = 0;
				if(confirm("You won. Try again?")){
					this.characterHealth = 100;
					this.monsterHealth = 100;
					this.logs = [];
				}
			}

		}
	},
	computed : {
		player_progress : function(){
			return {
				width : this.characterHealth + '%'
			}
		},
		monster_progress : function(){
			return {
				width : this.monsterHealth + '%'
			}
		}
	}



});
