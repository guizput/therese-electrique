let intro = new Vue({
  el: '.te__intro',
  data: {
    name: 'intro',
    comp: {}
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
  methods: {}
});