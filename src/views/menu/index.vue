<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">菜单列表</span>
        <el-button style="float: right;" @click="addMenuItem(null)" type="primary">添加菜单</el-button>
      </div>
      <tree-table :data="menuData" :columns="columns" border>
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
            <el-button type="primary" size="mini" @click="addMenuItem(scope)">添加子类</el-button>
            <el-button type="success" size="mini">查看</el-button>
            <el-button type="info" size="mini">改变状态</el-button>
            <el-button type="warning" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </tree-table>
    </el-card>

    <!-- 弹窗 -->
    <el-dialog title="添加/修改菜单" :visible.sync="menuDialog" width="30%">
      <el-form :rules="menuRules" ref="menuForm" :model="menuForm" label-width="80px" style='width: 100%; margin-left:10px;'>
        <el-form-item label="父级">
          <el-cascader placeholder="试试搜索：指南" :options="options" :value="menuForm.parent" :show-all-levels="showAllLevels" filterable change-on-select @change="selectParent"></el-cascader>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="menuForm.title"></el-input>
        </el-form-item>
        <el-form-item label="路由路径">
          <el-input v-model="menuForm.route"></el-input>
        </el-form-item>
        <el-form-item label="菜单图表">
          <el-input v-model="menuForm.icon"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number :precision="0" v-model="menuForm.sort" :min="1" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="menuForm.status" placeholder="请选择">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示">
          <el-select v-model="menuForm.show" placeholder="请选择">
            <el-option v-for="item in showOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from "@/components/treeTable";
import Sortable from "sortablejs";
import trim from "@/utils/index.js";

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
      showAllLevels: false,
      options: [
        {
          value: "system",
          label: "系统管理",
          children: [
            {
              value: "menu",
              label: "菜单管理"
            },
            {
              value: "daohang",
              label: "导航"
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic"
            },
            {
              value: "form",
              label: "Form"
            },
            {
              value: "data",
              label: "Data"
            },
            {
              value: "notice",
              label: "Notice"
            },
            {
              value: "navigation",
              label: "Navigation"
            },
            {
              value: "others",
              label: "Others"
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
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
      menuData: [
        {
          title: "系统管理",
          sort: 1,
          status: "可用",
          show: "是",
          icon: "",
          routes: ["system"],
          children: [
            {
              title: "菜单管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            },
            {
              title: "权限管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            },
            {
              title: "用户管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            }
          ]
        },
        {
          title: "传感器",
          sort: 1,
          status: "可用",
          show: "是",
          icon: "",
          routes: ["system"],
          children: [
            {
              title: "路灯管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            },
            {
              title: "汽车管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            },
            {
              title: "设备管理",
              sort: 1,
              status: "可用",
              show: "是",
              icon: "",
              routes: ["system", "menu"]
            }
          ]
        }
      ],
      menuForm: {
        parent: ["zujian", "form"],
        title: "",
        route: "",
        icon: "",
        sort: "",
        status: "",
        show: ""
      },
      statusOptions: [
        {
          value: "1",
          label: "可用"
        },
        {
          value: "2",
          label: "不可用"
        }
      ],
      showOptions: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "2",
          label: "不是"
        }
      ],
      menuRules: {
        title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let a=this.filterMenu(this.filterMenu, [], this.menuData, "用户管理");
    console.log(this.a)
    let el = document.querySelectorAll(
      ".el-table__body-wrapper > table > tbody"
    )[0];
    let sortable = Sortable.create(el, {
      onEnd: evt => {
        const targetRow = this.menuData.splice(evt.oldIndex, 1)[0];
        this.menuData.splice(evt.newIndex, 0, targetRow);
        console.log(evt);
        //先判断拖拽列表的级别
        let menuName = trim(evt.item.cells[0].innerText);
      }
    });
  },
  methods: {
    filterMenu: function(callback, arr1, data, menuName) {
      if (data) {
        data.forEach((element, index, arr) => {
          if (element.title === menuName) {
            arr1.push(index);
            this.a=arr1;
            console.log(this.a, element.title);
          } else {
            if (element.children) {
              arr1.push(index);
              callback(callback, arr1, element.children, menuName);
            } else {
            }
            if (index == arr.length - 1) {
              arr1.splice(arr1.length - 1, 1);
            }
          }
        });
      }
    },
    selectParent: function(e) {
      console.log(e);
      this.menuForm.parent = e;
    },
    addMenuItem: function(value1 = null) {
      console.log(value1);
      if (value1 !== null) {
        this.menuForm.parent = value1.row.routes;
      }
      this.menuDialog = true;
    }
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
