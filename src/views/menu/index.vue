<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="title">菜单列表</span>
                <el-button style="float: right;" @click="menuDialog = true" type="primary">添加菜单</el-button>
            </div>
            <tree-table :data="data" :columns="columns" border>
                <el-table-column header-align="center" align="center" label="状态" width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.status}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="显示" width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.show}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="菜单图表" width="100">
                    <template slot-scope="scope">
                        <i class="el-icon-edit"></i>
                    </template>
                </el-table-column>
                <el-table-column header-align="center" align="center" label="可选操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="menuDialog = true">添加子类</el-button>
                        <el-button type="success" size="mini">查看</el-button>
                        <el-button type="info" size="mini">改变状态</el-button>
                        <el-button type="warning" size="mini">编辑</el-button>
                        <el-button type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </tree-table>
        </el-card>
        <!-- 弹窗 -->
        <el-dialog title="添加/修改菜单" :visible.sync="menuDialog" width="50%">
            <!-- <el-form ref="menuForm" :model="menuForm" label-width="80">
                <el-form-item label="父级">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="路由路径">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="菜单图表">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item label="显示">
                    <el-input v-model="menuForm.parent"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form> -->
        </el-dialog>
    </div>
</template>

<script>
import treeTable from "@/components/treeTable";
export default {
  name: "menuManager",
  components: {
    treeTable
  },
  data() {
    return {
      menuDialog: false,
      func: "treeToArray",
      expandAll: false,
      columns: [
        {
          text: "标题",
          value: "title",
          width: 200
        },
        {
          text: "父级",
          value: "parent",
          width: 100
        },
        {
          text: "级别",
          value: "_level",
          width: "100"
        },
        {
          text: "排序",
          value: "sort",
          width: 100
        }
      ],
      data: [
        {
          title: "系统管理",
          sort: "1",
          status: "可用",
          show: "是",
          icon: "",
          children: [
            {
              title: "菜单管理",
              sort: "1",
              status: "可用",
              show: "是",
              icon: ""
            }
          ]
        }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.el-button {
  margin-left: 0px;
}
.m-b-2 {
  margin-bottom: 20px;
}
.title {
  font-size: 1.5rem;
}
</style>
