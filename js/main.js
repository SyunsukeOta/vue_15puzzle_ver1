const app = new Vue({
  el: '#app',
  data: {
    color: "green",
    direction: ["left", "right", "top", "bottom"],

    moveCount: 1000,
    timerCount: 0,
    timerObject: null,
    seconds: '00',
    minutes: '00',
    holeX: 0,
    holeY: 0,
    dir: '',
    checkPoint: 0,
    blockData: [
      [
        { color: "blue", number: 1 },
        { color: "blue", number: 2 },
        { color: "blue", number: 3 },
        { color: "blue", number: 4 },
      ],
      [
        { color: "orange", number: 5 },
        { color: "orange", number: 6 },
        { color: "orange", number: 7 },
        { color: "orange", number: 8 },
      ],
      [
        { color: "yellow", number: 9 },
        { color: "yellow", number: 10 },
        { color: "", number: null },
        { color: "yellow", number: 12 },
      ],
      [
        { color: "green", number: 13 },
        { color: "green", number: 14 },
        { color: "yellow", number: 11 },
        { color: "green", number: 15 },
      ]
    ]
  },
  methods: {
    clickEvent: function(x,y) {
      this.checkMove(x,y);
      this.checkCorrect();
    },
    checkMove: function(x,y) {
      if (x>0 && !this.blockData[y][x-1].number) {
        this.move(x,y,"left");
      }
      if (x<3 && !this.blockData[y][x+1].number) {
        this.move(x,y,"right");
      }
      if (y>0 && !this.blockData[y-1][x].number) {
        this.move(x,y,"top");
      }
      if (y<3 && !this.blockData[y+1][x].number) {
        this.move(x,y,"bottom");
      }
    },
    checkHole: function(x, y, direction) {
      if (direction == "left" && x<3) {
        this.move(x+1, y, "left");
        this.holeX++;
      }
      if (direction == "right" && x>0) {
        this.move(x-1, y, "right");
        this.holeX--;
      }
      if (direction == "top" && y<3) {
        this.move(x, y+1, "top");
        this.holeY++;
      }
      if (direction == "bottom" && y>0) {
        this.move(x, y-1, "bottom");
        this.holeY--;
      }
    },
    move: function(x,y,direction) {
      let pointX = x, pointY = y;
      if (direction === "left") pointX--;
      if (direction === "right") pointX++;
      if (direction === "top") pointY--;
      if (direction === "bottom")pointY++;
      this.blockData[pointY][pointX].color = this.blockData[y][x].color;
      this.blockData[pointY][pointX].number = this.blockData[y][x].number;
      this.blockData[y][x].color = "";
      this.blockData[y][x].number = null;
    },
    checkCorrect: function() {
      for(let i=0; i<15; i++) {
        this.checkPoint = this.blockData[Math.floor(i/4)][i%4].number;
        if (this.checkPoint-(i+1)) return;
      }
      console.log("Yes");
      this.correct();
    },
    correct: function() {
      this.stop();
      localStorage.setItem('count', this.timerCount.toString());
      location.href = './result.html';
    },
    convert: function() {
      this.seconds = (this.timerCount%60).toString(10);
      if (this.seconds.length == 1) {
        this.seconds = '0' + this.seconds;
      }
      this.minutes = (Math.floor(this.timerCount/60)).toString(10);
      if (this.minutes.length == 1) {
        this.minutes = '0' + this.minutes;
      }
    },
    count: function() {
      this.timerCount++;
      this.convert();
    },
    start: function() {
      console.log('OK');
      this.timerCount = 0;
      this.timerObject = setInterval(this.count, 1000);
    },
    stop: function() {
      clearInterval(this.timerObject);
    }
  },
  mounted: function () {
    console.log('mounted');
    for(let i=0; i<16; i++) {
      if (!this.blockData[Math.floor(i/4)][i%4].number) {
        this.holeX = i%4;
        this.holeY = Math.floor(i/4);
      }
    }
    for(let i=0; i<this.moveCount; i++) {
      this.dir = this.direction[Math.floor(Math.random()*4)];
      this.checkHole(this.holeX, this.holeY, this.dir);
    }
    this.start();
  }
})