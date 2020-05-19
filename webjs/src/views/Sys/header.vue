<template>
	<el-row type='flex' justify='space-between' align='middle' tag='header'>
		<el-col :span='4' class='header-left'>
			<img src="../../assets/img/logo.png" class="logo" alt="LOGO" /><h1 class="title">天气数据报表系统</h1>
		</el-col>
		<el-col :span='8' class='header-right'>
			<el-tooltip class="item" effect="dark" placement="bottom-start">
				<span>{{this.Userinfo.city}}欢迎你！</span>
				<div slot="content">该城市为各页面默认展示城市<br/>会员用户可在相关页面更改城市</div>
			</el-tooltip>
			<span class="user" v-popover:popover5 v-if="Userinfo.ID">Hi,{{this.Userinfo.ID}}</span>
			<span class="user" v-else><router-link to="/Login">登录</router-link>获取更多功能哦！</span>
			<el-popover
				trigger="hover"
				ref="popover5"
				placement="top"
				width="160"
				v-model="outWinVisible">
				<p>确定要退出登录吗？</p>
				<div style="text-align: right; margin: 0">
					<el-button size="mini" type="text" @click="visible2 = false">取消</el-button>
					<el-button type="primary" size="mini" @click="toLogout">确定</el-button>
				</div>
			</el-popover>
		</el-col>
	</el-row>
</template>

<style lang="scss" scoped>
header{
	position: absolute;
	top: 0;
	height: 70px;
	width: 100%;
	padding: 0 10px;
	background-color: #66CC66;
	.header-left{
		height: 50px;
		padding: 10px;
		background-color: #fff;
		border-radius: 10px;
		.logo{
			height: 100%;
		}
		.title{
			display: inline-block;
			height: 100%;
			line-height: 30px;
			margin-left: 10px;
			color: #66CC66;
			font-size: 20px;
			font-weight: normal;
		}
	}
	.header-right{
		.user{
			margin-left: 10px;
		}
	}
}
</style>

<script>
import { mapMutations,mapGetters } from 'vuex'
export default {
	data(){
		return{
			outWinVisible:false,
		}
	},
	methods:{
		toLogout(){
			this.visible2 = false;
			this.rewriteUserinfo({});
			this.$router.push('/Login')
		},
		...mapMutations([
			'rewriteUserinfo'
		])
	},
	computed:{
		...mapGetters([
			'Userinfo'
		])
	},
	mounted(){
	}
}
</script>