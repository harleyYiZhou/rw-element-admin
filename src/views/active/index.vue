<template>
    <div class="email">
        <div class="logo"></div>
        <el-steps :active="active" finish-status="success">
            <el-step title="创建账号"></el-step>
            <el-step title="激活账号"></el-step>
            <el-step title="激活成功"></el-step>
        </el-steps>
        <div class="body">
            <el-card v-if="active===1" class="box-card">
                <h2>邮箱激活</h2>
                <el-form label-width="80px" :model="userForm">
                    <el-form-item label="账号">
                        <el-tag>{{basicMsg.account}}</el-tag>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-tag>{{basicMsg.email}}</el-tag>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-radio v-model="userForm.sex" label="男">男</el-radio>
                        <el-radio v-model="userForm.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input placeholder="请输入手机号码" v-model="userForm.telPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="固定电话">
                        <el-input placeholder="请输入固定电话" v-model="userForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input placeholder="请输入地址" v-model="userForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input type="password" placeholder="请输入密码" v-model="userForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input type="password" placeholder="请再次输入密码" v-model="userForm.comfirmPassword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">立即激活</el-button>
                        <el-button>重置</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <div v-if="active===3" class="actived">
                <i class="el-icon-circle-check-outline" style="font-size: 250px;color: green;"></i>
                <h2>激活成功</h2>
                <div>
                    <el-button type="primary" @click="login">返回登陆</el-button>
                </div>
            </div>
        </div>
        <div class="footer1">
            <div>广东荣文能源集团有限公司</div>
            <div>0769-88888888</div>
            <div>广东省东莞市松山湖松湖烟雨</div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        sex: "",
        telPhone: "",
        phone: "",
        address: "",
        password: "",
        comfirmPassword: ""
      },
      basicMsg: {
        account: "harley",
        email: "harley@guzzu.com"
      },
      active: 1,
    };
  },
  methods: {
      onSubmit:function(){
          this.active=3;
      },
      login: function(){
          this.$router.push({path: '/login'})
      }
  }
};
</script>


<style lang="scss">
.email {
  padding: 10px 5%;
  .el-steps {
    width: 80%;
    margin: 20px auto;
  }
  .logo {
    background: url("http://www.rongwenest.com/images/logo.png") no-repeat;
    background-size: 175px 60px;
    height: 80px;
  }
  .body {
    .el-card {
      width: 85%;
      margin: 0 auto;
      .el-form {
        margin-left: 30px;
        width: 40%;
        box-sizing: border-box;
        .el-form-item {
          box-sizing: border-box;
          .el-form-item__label {
            padding-right: 20px;
          }
        }
      }
    }
    .actived{
        margin-top: 40px;
        text-align: center;
    }
  }
  .footer1 {
    position: absolute;
    bottom: 0px;
    width: 90%;
    text-align: right;
    margin-top: 30px;
    div {
      font-size: 14px;
      color: #666;
    }
  }
}
</style>

