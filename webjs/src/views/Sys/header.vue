<template>
	<el-row type='flex' justify='space-between' align='middle' tag='header'>
		<el-col class='header-left'>
			<img src="../../assets/img/logo.png" class="logo" alt="LOGO" /><h1 class="title">天气订阅平台</h1>
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
		width: 190px;
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
}
</style>

<script>
export default {
  
}
</script>