export default {
  methods: {
    /**
     * Date -> hh:mm:ssに変換
     * @param {*} date
     */
    formatDateToTime(value) {
      var hour = this.zeroPadding(value.getHours(), 2);
      var minute = this.zeroPadding(value.getMinutes(), 2);
      var second = this.zeroPadding(value.getSeconds(), 2);
      return hour + ":" + minute + ":" + second;
    },
    /**
     * 0のパディング処理
     */
    zeroPadding(num, len) {
      let zero = "";
      for (var i = 0; i < len; i++) {
        zero += "0";
      }
      return (zero + num).slice(-len);
    },
    changeDayNumToWeek(num) {
      var resWeek;
      switch (num) {
        case 0:
          resWeek = "日";
          break;
        case 1:
          resWeek = "月";
          break;
        case 2:
          resWeek = "火";
          break;
        case 3:
          resWeek = "水";
          break;
        case 4:
          resWeek = "木";
          break;
        case 5:
          resWeek = "金";
          break;
        case 6:
          resWeek = "土";
          break;
        default:
          resWeek = "未";
      }
      return resWeek;
    },
  },
};
