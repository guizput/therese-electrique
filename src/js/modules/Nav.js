let nav = new Vue({
  el: '.te__nav',
  data: {
    name: 'nav',
    comp: {}
  },
  created: function() {
    axios.get(`js/data/${this.name}.json`)
      .then(function(res) {
        console.log(res.data);
        this.comp = res.data;
      }.bind(this))
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {}
});