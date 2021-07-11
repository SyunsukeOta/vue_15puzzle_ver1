const app1 = new Vue({
  el: '#app',
  data: {
    timerCount: 0,
    seconds: '00',
    minutes: '00',

  },
  methods: {
    convert: function() {
      this.seconds = (this.timerCount%60).toString(10);
      this.minutes = (Math.floor(this.timerCount/60)).toString(10);
      if (this.minutes == 0) {
        this.minutes = '';
      }
    },
  },
  mounted: function(){
    this.timerCount = Number(localStorage.getItem("count"));
    this.convert();
  }
});