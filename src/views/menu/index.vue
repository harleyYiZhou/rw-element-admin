<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">菜单列表</span>
        <el-button style="float: right;" @click="addMenuItem(null)" type="primary">添加菜单</el-button>
      </div>
      <draggable v-model="menuData" :options="{draggable:'.el-table__row'}" @start="drag=true" @end="drag=false">
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
      </draggable>
      <table  style="width: 100%; border: 1px solid #666">
        <thead>
          <tr>
            <th>name</th>
            <th>email</th>
            <th>age</th>
          </tr>
        </thead>

        <tbody class="aa" v-for=" item in menuData">
          <tr>
            <td>
              <button @click="item.a=!item.a" type="text">></button>
              harley
            </td>
            <td>harley@guyzuz.com</td>
            <td>12</td>
          </tr>
          <tr>
            <tr v-for="items in item.children" v-show="item.a">
              <td>aaa</td>
              <td>aaa</td>
              <td>aaa</td>
            </tr>
          </tr>
        </tbody>

      </table>
      <div>
        <div>

        </div>
      </div>
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
import draggable from "vuedraggable";

export default {
  name: "menuManager",
  components: {
    treeTable,
    draggable
  },
  data() {
    return {
      a: false,
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
          a: false,
          children: [
            {
              title: "菜单管理",
              sort: 2,
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
          a: false,
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
      },

      //
      stop: false,
      stop1: false,
      a: 0
    };
  },
  mounted() {
    // var toNode = this.filterMenu(
    //   this.filterMenu,
    //   [],
    //   this.menuData,
    //   '设备管理'
    // );
    // var fromNode = this.filterMenu(
    //   this.filterMenu,
    //   [],
    //   this.menuData,
    //   "传感器"
    // );
    // console.log(toNode,fromNode)
    this.a = 0;
    // let el = document.getElementsByClassName("aa");
    let el = document.querySelectorAll(
      ".aa"
    )[0];
    var sortable = Sortable.create(el);

    // let sortable = Sortable.create(el, {
    //   onEnd: evt => {
    //     console.log(evt);
    //     // // 先判断拖拽列表的级别
    //     // let menuName = trim(evt.item.cells[0].innerText);
    //     // //获取要删除的节点
    //     // var fromNode = this.filterMenu(
    //     //   this.filterMenu,
    //     //   [],
    //     //   this.menuData,
    //     //   menuName
    //     // );
    //     // var resArr1 = this.menuData.slice();
    //     // var resArr = this.toString(resArr1, this.sortArray(fromNode));
    //     // //获取要插入的位置
    //     // var toNode = this.filterMenu1(
    //     //   this.filterMenu1,
    //     //   [],
    //     //   this.menuData,
    //     //   evt.newIndex
    //     // );
    //     // const targetNow = resArr.splice(fromNode[fromNode.length - 1], 1)[0];

    //     // resArr.splice(toNode[toNode.length - 1], 0, targetNow);
    //     // console.log(resArr, this.menuData, fromNode, toNode);

    //     // const b = this.toString(this.menuData,this.sortArray(toNode));
    //   }
    // });
  },
  methods: {
    //获取数组下标形式[0,2]   通过menuname
    filterMenu: function(callback, arr1, data, menuName) {
      if (data) {
        data.map((element, index, arr) => {
          if (element.title === menuName) {
            arr1.push(index);
            this.stop = true;
          } else {
            if (this.stop === false) {
              if (element.children) {
                arr1.push(index);
                callback(callback, arr1, element.children, menuName);
              } else {
                if (index == arr.length - 1) {
                  arr1.splice(arr1.length - 1, 1);
                }
              }
            }
          }
        });
        return arr1;
      }
    },
    //获取数组下标形式[0,2]   通过index
    filterMenu1: function(callback, arr1, data, eindex) {
      if (data) {
        data.map((element, index, arr) => {
          this.a++;
          if (eindex === this.a - 1) {
            arr1.push(index);
            this.stop1 = true;
          } else {
            if (this.stop1 === false) {
              if (element.children) {
                arr1.push(index);
                callback(callback, arr1, element.children, eindex);
              } else {
                if (index == arr.length - 1) {
                  arr1.splice(arr1.length - 1, 1);
                }
              }
            }
          }
        });
        return arr1;
      }
    },
    //处理数组
    sortArray: function(arr) {
      var arr1 = [];
      arr.map((element, index, arr) => {
        if (index === arr.length - 1 && index !== 0) {
          arr1.push("children");
        } else {
          if (index % 2 === 1) {
            arr1.push("children");
            arr1.push(element);
          } else {
            arr1.push(element);
          }
        }
      });
      return arr1;
    },
    toString: function(value, path, df = undefined) {
      return (
        (!Array.isArray(path)
          ? path
              .replace(/\[/g, ".")
              .replace(/\]/g, "")
              .split(".")
          : path
        ).reduce((o, k) => (o || {})[k], value) || df
      );
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
