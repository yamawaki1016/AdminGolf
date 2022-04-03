<template>
  <div class="selectdiv" :style="selectBoxStyle()">
    <label>
      <select v-model="record" @change="$emit('change-select-value', record)">
        <template v-for="record in selectBoxList" :key="record.id">
          <option :value="record">{{ record.name }}</option>
        </template>
      </select>
    </label>
  </div>
</template>
<script>
export default {
  name: "TheSelectBox",
  components: {},
  data() {
    return {
      record: null,
    };
  },
  props: {
    selectBoxList: {
      type: Array,
      required: true,
    },
    boxWidth: {
      type: String,
      required: false,
      default: "300px",
    },
  },
  emits: ["change-select-value"],
  computed: {},
  methods: {
    selectBoxStyle() {
      const boxWidth = this.boxWidth;
      let addStyle = {};
      addStyle["width"] = boxWidth;
      return addStyle;
    },
  },
};
</script>
<style scoped>
.selectdiv {
  position: relative;
  float: left;
  min-width: 200px;
}
/* IE11 hide native button (thanks Matt!) */
select::-ms-expand {
  display: none;
}
.selectdiv:after {
  content: "<>";
  font: 17px "Consolas", monospace;
  color: #333;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  right: 11px;
  top: 18px;
  padding: 0 0 2px;
  border-bottom: 1px solid #999;
  position: absolute;
  pointer-events: none;
}
.selectdiv select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  height: 50px;
  float: right;
  margin: 5px 0px;
  padding: 0px 24px;
  font-size: 16px;
  line-height: 1.75;
  color: #333;
  background-color: #ffffff;
  background-image: none;
  border: 1px solid #cccccc;
  -ms-word-break: normal;
  word-break: normal;
}
</style>
