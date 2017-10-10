let gallery = new Vue({
  el: '.te__gallery',
  data: {
    name: 'gallery',
    comp: {},
    DOM: {
      activeClass: 'te__gallery__item--active'
    }
  },
  created: function() {
    axios.get(`js/data/${this.name}.json`)
      .then(function(res) {
        this.comp = res.data;
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    fullImage: function() {
      let item = event.target;
      item.classList.toggle(this.DOM.activeClass);
    }
  }
});