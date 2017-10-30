let loader = new Vue({
  el: '.te__loader',
  data: {
    name: 'loader',
    outClass: 'te__loader--out'
  },
  created: function() {
    window.onload = function() {
      this.removeWhenLoaded();
    }.bind(this);
  },
  methods: {
    removeWhenLoaded: function() {
      let element = document.querySelectorAll('.te__loader');
      element[0].classList.add(this.outClass);
      setTimeout(function() {
        element[0].remove();
      }, 200);
    }
  }
});