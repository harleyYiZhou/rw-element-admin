<template>
  <div class="dashboard-container">
    <baidu-map ref="baiduMap"></baidu-map>
    <el-card class="box-card leftPanel" :class="hideClass?`leftPanelHide ${backgroundClass}`:`${backgroundClass}`" >
      <div slot="header" class="clearfix">
        <span>设备</span>
        <el-button type="text" @click="hideLeftPanel">X</el-button>
      </div>
      <div>
        <tree-panel></tree-panel>
      </div>
      <div class="footer">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-card>
    <el-button type="primary" class="showButton" :class="!hideClass?'showButtonShow':''" @click="hideClass=false;">显示</el-button>
  </div>
</template>

<script>
import baiduMap from "../../components/Map";
import treePanel from "../../components/TreePanel";
export default {
  name: "dashboard",
  components: {
    baiduMap,
    treePanel
  },
  data() {
    return {
      input: '',
      select: null,
      hideClass: false,
      backgroundClass: 'custom-ffffff'
    };
  },
  computed: {
    pickthemeColor(){
      return this.$store.state.app.language
    }
  },
  watch:{
    pickthemeColor(){
      console.log(1)
      this.backgroundClass=""
    }
  },
  methods: {
    hideLeftPanel() {
      this.hideClass = true;
    }
  }
};
</script>

<style lang="scss" >
.dashboard-container {
  width: 100%;
  height: 100%;
  position: relative;
  .el-card__header {
    padding: 2px 20px;
    .clearfix {
      display: flex;
      align-items: center;
      span {
        flex: 1;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
  }
}

.leftPanel {
  position: absolute;
  top: 10px;
  left: 10px;
  min-width: 300px;
  min-height: 60%;
  overflow-x: hidden;
  transition: left, 1s;
  background: #666;
}
.custom-ffffff{
  background: #fff;
}
.leftPanelHide {
  left: -300px;
}
.showButton {
  position: absolute;
  width: 190px;
  top: 40vh;
  left: -80px;
  transform: rotate(90deg);
  transition: left,1s;
}
.showButtonShow{
  left: -120px;
}
</style>
