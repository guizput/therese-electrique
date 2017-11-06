let gallery = new Vue({
  el: '.te__gallery',
  data: {
    name: 'gallery',
    comp: {},
    DOM: {
      activeClass: 'te__gallery__item--active',
      limit: 6,
      loaded: false
    }
  },
  created: function() {
    axios.get(`js/data/${this.name}.json`)
      .then(function(res) {
        this.comp = res.data;
        this.DOM.loaded = true;
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    fullImage: function() {
      let item = event.target;
      item.classList.toggle(this.DOM.activeClass);
    },
    morePhotos: function() {
      if (this.DOM.limit < this.comp.photos.length) {
        this.DOM.limit += 6;
      }
    }
  }
});