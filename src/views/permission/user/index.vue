<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="请输入内容" v-model="listQuery.title">
      </el-input>
      <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.important">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addDialog1=true">{{$t('table.add')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-delete" @click="deleteMore">{{$t('table.delete')}}</el-button>
    </div>

    <template>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column :label="$t('permission.userName')" width="180" prop="userName">
        </el-table-column>
        <el-table-column :label="$t('permission.email')" width="180" prop="email">
        </el-table-column>
        <el-table-column :label="$t('permission.createdAt')" prop="createdAt">
        </el-table-column>
        <el-table-column :label="$t('permission.status')">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('permission.role')" prop="role">
        </el-table-column>
        <el-table-column :label="$t('permission.options')">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="editDialog=true"></el-button>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteOne"></el-button>
            <el-button type="warning" icon="el-icon-view" @click="viewDialog=true" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!-- 新增用户弹窗 -->
    <transition name="el-zoom-in-center">
      <el-dialog :title="$t('permission.add')" v-show="addDialog1" :visible.sync="addDialog1" width="50%">
        <el-form :rules="rules" ref="ruleForm" :model="userForm" label-width="80px" style='width: 400px; margin-left:10px;'>
          <el-form-item prop="userName" :label="$t('permission.userName')">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.email')" prop="email">
            <el-input placeholder="请输入内容" v-model="userForm.email">
              <!-- <el-button slot="append" icon="el-icon-message"></el-button> -->
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建账号</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <el-button type="text" class="freeCreate" @click="addDialog1=false;addDialog2=true">免激活注册</el-button>
        </el-form>
      </el-dialog>
    </transition>

    <transition name="el-zoom-in-center">
      <el-dialog :title="$t('permission.add')" v-show="addDialog2" :visible.sync="addDialog2" width="50%">
        <el-form :rules="rules" ref="ruleForm" :model="userForm" label-width="80px" style='width: 400px; margin-left:10px;'>
          <el-form-item prop="userName" :label="$t('permission.userName')">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.email')" prop="email">
            <el-input placeholder="请输入内容" v-model="userForm.email">
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.password')" prop="password">
            <el-input :type="passwordType" placeholder="请输入密码" ref="psw" v-model="userForm.password">
              <el-button slot="append" icon="el-icon-view" @click="showPwd"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item :label="$t('permission.nickName')" prop="nickName">
            <el-input placeholder="请输入昵称" v-model="userForm.nickName">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">创建账号</el-button>
            <el-button>取消</el-button>
          </el-form-item>
          <el-button type="text" class="freeCreate" @click="addDialog2=false;addDialog1=true">激活注册</el-button>
        </el-form>
      </el-dialog>
    </transition>

    <!-- 编辑用户弹窗 -->
    <el-dialog :title="$t('permission.edit')" :visible.sync="editDialog" width="50%">
      <el-form :rules="rules" ref="ruleForm" :model="userForm" label-width="80px" style='width: 400px; margin-left:10px;'>
        <el-form-item prop="userName" :label="$t('permission.userName')">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('permission.email')" prop="email">
          <el-input placeholder="请输入内容" v-model="userForm.email">
            <el-button slot="append" icon="el-icon-message"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 用户详细弹窗 -->
    <el-dialog class="userDetail" :title="$t('permission.view')" :visible.sync="viewDialog" width="50%">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>头像</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <pan-thumb :image="image"></pan-thumb>
            <!-- <image-cropper></image-cropper> -->
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>用户名</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <el-tag type="success">harley</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>昵称</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <el-tag type="warning">小甜甜</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>固话</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <el-tag type="info">0769-88888888</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>手机号码</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <el-tag type="danger">136*********</el-tag>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <div>性别</div>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div>
            <el-tag>男士</el-tag>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import panThumb from "@/components/panThumb";

export default {
  name: "user",
  data() {
    const validateEmail = (rule, value, callback) => {
      var reg = new RegExp(
        "^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"
      );
      if (!reg.test(value)) {
        callback(new Error("email不符合规范"));
      } else {
        callback();
      }
    };
    return {
      importanceOptions: [],
      calendarTypeOptions: [],
      sortOptions: [],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      tableData: [
        {
          userName: "admin",
          email: "harley@163.com",
          createdAt: "2016-05-04",
          status: "published",
          role: "superAdmin"
        },
        {
          userName: "harley",
          email: "harley@163.com",
          createdAt: "2016-05-04",
          status: "draft",
          role: "admin"
        },
        {
          userName: "calvin",
          email: "calvin@163.com",
          createdAt: "2016-05-04",
          status: "deleted",
          role: "user"
        }
      ],
      userForm: {
        userName: "",
        password: "",
        email: "",
        nickName: "",
        activate: false,
        role: []
      },
      role: [
        {
          label: "超级管理员",
          value: "1"
        },
        {
          label: "管理员",
          value: "2"
        },
        {
          label: "用户",
          value: "3"
        }
      ],
      rules: {
        userName: [
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
        password: [
          {
            required: true,
            message: this.$t("permission.rules.enterPassword"),
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: this.$t("permission.rules.passwordSize"),
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t("permission.rules.enterEmail"),
            trigger: "blur"
          },
          { required: true, trigger: "blur", validator: validateEmail }
        ],
        nickName: [
          {
            required: true,
            message: this.$t("permission.rules.enterNickName"),
            trigger: "blur"
          }
        ]
      },
      // 弹窗
      addDialog: false,
      addDialog1: false,
      addDialog2: false,
      editDialog: false,
      viewDialog: false,
      passwordType: "password",
      image: "https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191",
      multipleSelection: [] //多选框
    };
  },
  components: {
    panThumb
  },
  computed: {
    total: function() {
      return this.tableData.length;
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 显示密码
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    // 获取表单数据，并得出总数total
    getList() {
      this.total = this.tableData.length;
    },
    // 每页个数发生改变时触发
    handleSizeChange: function() {},
    // 当前页数发生改变时触发
    handleCurrentChange: function() {},
    // 提交表单校验
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //删除某一行
    deleteOne: function() {
      var that = this;
      this.$confirm(
        that.$t("messageBox.deleteOne"),
        that.$t("messageBox.tip"),
        {
          confirmButtonText: that.$t("messageBox.confirm"),
          cancelButtonText: that.$t("messageBox.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: that.$t("messageBox.success")
          });
        })
        .catch(() => {});
    },
    //删除多行
    deleteMore: function() {
      if (this.multipleSelection.length !== 0) {
        var that = this;
        this.$confirm(
          that.$t("messageBox.deleteMore"),
          that.$t("messageBox.tip"),
          {
            confirmButtonText: that.$t("messageBox.confirm"),
            cancelButtonText: that.$t("messageBox.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: that.$t("messageBox.success")
            });
          })
          .catch(() => {});
      }
    },
    handleSelectionChange: function(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  }
};
</script>

<style lang="scss" >
.el-pagination {
  text-align: right;
}
.show-pwd {
  position: absolute;
  right: 10px;
  top: 0px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  user-select: none;
}
.el-dialog__title {
  font-size: 23px;
}
.freeCreate {
  margin-left: 80px;
}
.userDetail {
  .el-row {
    padding: 5px;
    font-size: 20px;
    line-height: 50px;
    .el-tag {
      font-size: 13px;
    }
  }
}
</style>
