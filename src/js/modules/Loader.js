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
      this.$refs.loader.classList.add(this.outClass);
      setTimeout(function() {
        this.$refs.loader.remove();
      }.bind(this), 200);
    }
  }
});