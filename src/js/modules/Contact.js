let contact = new Vue({
  el: '.te__contact',
  data: {
    name: 'contact',
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