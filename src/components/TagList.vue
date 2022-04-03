<template>
  <div class="tag-list">
    <template v-for="tag in tagList" :key="tag.id">
      <TheTag
        :tagName="tag.name"
        :tagColor="tagColor(tag.isAvable)"
        @click-tag="$emit('click-tag', tag.id)"
      />
    </template>
  </div>
</template>
<script>
import TheTag from "@/components/base/TheTag";
export default {
  name: "TagList",
  components: { TheTag },
  props: {
    tagList: Array,
  },
  emits: ["click-tag"],
  computed: {},
  methods: {
    tagColor(isAvable) {
      return isAvable ? "blue" : "gray";
    },
  },
};
</script>
<style scoped>
.tag-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
