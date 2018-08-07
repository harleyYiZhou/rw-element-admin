<template>
  <section class="app-main">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleHeading"></hamburger> -->
    <!-- <i class="el-icon-arrow-down hamburger-container"></i> -->
    <el-button type="text" :icon="icon" class="hamburger-container" @click="toggleHeading"></el-button>
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import Hamburger from "@/components/Hamburger";

export default {
  name: "AppMain",
  components: {
    Hamburger
  },
  data() {
    return {};
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
    icon() {
      return this.$store.state.app.heading
        ? "el-icon-arrow-down"
        : "el-icon-arrow-up";
    }
  },
  methods: {
    toggleHeading() {
      this.$store.dispatch("toggleHeading");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
  .hamburger-container {
    line-height: 20px;
    height: 20px;
    position: absolute;
    top: 0px;
    right: 10px;
    padding: 0 10px;
    z-index: 1000;
  }
  .el-button--text {
    padding: 0px;
    font-size: 30px;
  }
}
.hideNavbar {
  .app-main {
    min-height: calc(100vh);
    position: relative;
    overflow: hidden;
  }
  #contianer {
    width: 100%;
    height: 100vh;
  }
}
</style>

