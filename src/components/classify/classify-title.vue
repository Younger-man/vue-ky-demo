<template>
  <div class="wrapper">
    <div class="theme-wrapper" v-for="(item, index) in list" :key="index">
      <div class="theme">{{ item.name }}</div>
      <div class="topic">
        <div
          class="topic-desc"
          v-for="itemTopic in item.cols"
          :key="itemTopic.id"
          @click="handleClick(itemTopic, item)"
        >
          {{ itemTopic.name }}
        </div>
      </div>
    </div>
    <div v-if="isPlayer" class="player"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'classifytitle',
  props: {
    list: Array,
  },
  data() {
    return {
      px: 0,
    };
  },
  computed: {
    ...mapState('home', {
      isPlayer: state => state.isPlayer,
    }),
  },
  methods: {
    ...mapMutations('home', {
      classtarget: 'CLASSTARGET',
      emptyclasslistRes: 'EMPTYCLASSLISTRES',
    }),
    handleClick(itemTopic, item) {
      // console.log(itemTopic, item);
      this.$store.commit('home/UPDATE_SELECT_CLASSIFY', { itemTopic, item });
      this.px = 0;
      this.emptyclasslistRes();
      this.classtarget({ id: itemTopic.id, target: itemTopic.target });
      this.$router.push({
        name: `classifyrings`,
        // params: { id: itemTopic.id, theme: itemTopic.name, target: itemTopic.target, px: this.px },
      });
    },
  },
};
</script>

<style scoped>
.wrapper {
  box-sizing: border-box;
  width: 100%;
  margin-top: 10px;
  padding: 0 12px 0 16px;
}
.theme-wrapper {
  width: 100%;
  margin-bottom: 30px;
}
.theme {
  margin-top: 20px;
  color: #333333;
  font-weight: 600;
  font-size: 16px;
  font-family: '黑体';
}
.topic {
  width: 100%;
  overflow: hidden;
}
.topic-desc {
  float: left;
  box-sizing: border-box;
  width: 103px;
  height: 44px;
  margin: 18px 10px 0 0;
  font-size: 14px;
  line-height: 44px;
  text-align: center;
  border: 1px solid #c4c4c4;
  border-radius: 20px;
}
.player {
  width: 100%;
  height: 70px;
}
</style>
