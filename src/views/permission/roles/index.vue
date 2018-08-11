<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入内容" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="roleDialog=true">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete">{{$t('table.delete')}}</el-button>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column :label="$t('permission.roleName')" prop="roleName">
        </el-table-column>
        <el-table-column :label="$t('permission.ruleName')" prop="ruleName">
        </el-table-column>
        <el-table-column :label="$t('permission.description')" prop="description">
        </el-table-column>
        <el-table-column :label="$t('permission.options')">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="showDialog"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="$t('permission.user')" :visible.sync="roleDialog" width="50%">
      <el-form :rules="rules" ref="ruleForm" :model="roleForm" label-width="80px" style='width: 400px; margin-left:10px;'>
        <el-form-item prop="roleName" :label="$t('permission.roleName')">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="ruleName" :label="$t('permission.ruleName')">
          <el-input v-model="roleForm.ruleName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('permission.description')">
          <el-input type="textarea" :rows="2" v-model="roleForm.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('permission.data')">
          <el-input type="textarea" :rows="2" v-model="roleForm.data"></el-input>
        </el-form-item>
        <el-form-item :label="$t('permission.permission')">
          <el-tree :data="data2" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps">
          </el-tree>
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
export default {
  name: "roles",
  data() {
    return {
      roleDialog: false,
      tableData: [
        {
          roleName: "角色1",
          ruleName: "规则1",
          description: "这是角色1的权限"
        },
        {
          roleName: "角色2",
          ruleName: "规则2",
          description: "这是角色2的权限"
        },
        {
          roleName: "角色3",
          ruleName: "规则3",
          description: "这是角色3的权限"
        }
      ],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      roleForm: {
        roleName: "",
        ruleName: "",
        description: "",
        data: ""
      },
      rules: {
        roleName: [
          {
            required: true,
            message: this.$t("permission.rules.enterName"),
            trigger: "blur"
          },
          {
            min: 2,
            max: 10,
            message: this.$t("permission.rules.nameSize"),
            trigger: "blur"
          }
        ],
        ruleName: [
          {
            required: true,
            message: this.$t("permission.rules.enterName"),
            trigger: "blur"
          }
        ]
      },
      // 权限选择
      data2: [
        {
          id: 1,
          label: "用户",
          children: [
            {
              id: 4,
              label: "二级 1-1"
            },
            {
              id: 5,
              label: "二级 1-1"
            },
            {
              id: 6,
              label: "二级 1-1"
            },
            {
              id: 7,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 2,
          label: "管理员",
          children: [
            {
              id: 8,
              label: "二级 1-1"
            },
            {
              id: 9,
              label: "二级 1-1"
            },
            {
              id: 10,
              label: "二级 1-1"
            },
            {
              id: 11,
              label: "二级 1-1"
            }
          ]
        },
        {
          id: 3,
          label: "CURD",
          children: [
            {
              id: 12,
              label: "二级 3-1"
            },
            {
              id: 13,
              label: "二级 3-2"
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
  computed: {
    total: function() {
      return this.tableData.length;
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 每页个数发生改变时触发
    handleSizeChange: function() {},
    // 当前页数发生改变时触发
    handleCurrentChange: function() {},
    // 提交表单
    submitForm: function() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    // 弹窗
    showDialog: function() {
      this.roleDialog = true;
      setTimeout(() => {
        this.$refs.tree.setCheckedNodes([
          {
            id: 4,
            label: "二级 1-1"
          },
          {
            id: 5,
            label: "二级 1-1"
          },
          {
            id: 6,
            label: "二级 1-1"
          },
          {
            id: 7,
            label: "二级 1-1"
          },
          {
            id: 10,
            label: "二级 1-1"
          },
          {
            id: 11,
            label: "二级 1-1"
          }
        ]);
      }, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
