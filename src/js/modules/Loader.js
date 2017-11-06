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
      loader.$el.classList.add(this.outClass);
      setTimeout(function() {
        loader.$el.remove();
      }.bind(this), 200);
    }
  }
});