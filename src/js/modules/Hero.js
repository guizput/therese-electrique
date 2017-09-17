class Hero{
  constructor(options){
		this.options = options
		this.DOM ={
			trigger: document.querySelectorAll(this.options.trigger)[0],
	  	target: document.querySelectorAll(this.options.target),
	  	heroClass: this.options.heroClass,
	  	intro: this.options.intro
		}

		if(this.isMobileDevice()){
			this.init();
		}
  }

  init() {
  	this.DOM.trigger.addEventListener('click', function(e){
			this.showAllSections();
  		this.scrollToIntro();
		}.bind(this));
  }

  isMobileDevice() {
    let wWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if(wWidth <= 768){
      return true;
    }else{
      return false;
    }
  }

	showAllSections() {
		this.DOM.target.forEach(function(section){
			if(!section.classList.contains(this.DOM.heroClass)){
				section.style.display = 'block';
			}
		}.bind(this));
	}

	scrollToIntro() {
		let introPos = $(this.DOM.intro).offset().top;
		$('html, body').animate( { scrollTop: introPos}, 250);
	}
}