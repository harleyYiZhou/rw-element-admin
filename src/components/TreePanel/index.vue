<template>
    <el-tree :data="data" :props="defaultProps" :render-content="renderContent" @node-click="handleNodeClick">
    </el-tree>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          className: 'el-icon-time',
          children: [
            {
              label: "二级 1-1",
              className: 'el-icon-time',
              children: [
                {
                  label: "三级 1-1-1",
                  className: 'el-icon-time',
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          className: 'el-icon-time',
          children: [
            {
              label: "二级 2-1",
              className: 'el-icon-time',
              children: [
                {
                  label: "三级 2-1-1",
                  className: 'el-icon-time',
                }
              ]
            },
            {
              label: "二级 2-2",
              className: 'el-icon-time',
              children: [
                {
                  label: "三级 2-2-1",
                  className: 'el-icon-time',
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          className: 'el-icon-time',
          children: [
            {
              label: "二级 3-1",
              className: 'el-icon-time',
              children: [
                {
                  label: "三级 3-1-1",
                  className: 'el-icon-time',
                }
              ]
            },
            {
              label: "二级 3-2",
              className: 'el-icon-time',
              children: [
                {
                  label: "三级 3-2-1",
                  className: 'el-icon-time',
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    },
    renderContent(h,{node,data,store}){
        return (
            <span class="custom-tree-node">
                <i class={data.className}></i>
                <span style="margin-left: 5px;">{node.label}</span>
            </span>
        )
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
