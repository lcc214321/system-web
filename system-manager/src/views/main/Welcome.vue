<template>
	<div class="main-div">
		<h1 class="title">欢迎光临{{ $config.sysName }}</h1>
		<img class="welcome-img" src="../../assets/img/welcome.png">
	</div>
</template>

<style scoped>
.main-div {
	text-align: center;
}

.title {
	padding-top: 140px;
	font-size: 30px;
	color: gray;
}

.welcome-img {
	width: 527px;
	height: 164px;
	padding-top: 20px;
}
</style>
