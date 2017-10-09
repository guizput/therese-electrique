let trio = new Vue({
  el: '.te__trio',
  data: {
    name: 'trio',
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