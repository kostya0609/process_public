<template>
	<el-link
		:href="`https://bitrix.bsi.local/company/personal/user/${id}/`"
		:underline="false"
		class="user-link"
		type="primary"
	>
		<el-image
			:src="photo"
			:alt="fio"
			class="user-link__photo"
			loading="lazy"
			fit="cover"
			v-if="photo"
		/>
		<span
			class="user-link__fio"
			v-if="fio"
		>{{ fio }}</span>
	</el-link>
</template>
<script setup>
defineProps({
	id: {
		type: Number,
		required: true,
	},
	fio: {
		type: String,
		required: false,
		default: '',
	},
	photo: {
		type: String,
		required: false,
		default: '',
	},
});
</script>
<style scoped lang="scss">
.user-link {

	:deep(.el-link__inner) {
		gap: .5rem;
	}

	&__photo {
		--user-link-photo-size: 35px;
		width: var(--user-link-photo-size);
		height: var(--user-link-photo-size);
		border-radius: 50%;
		overflow: hidden;
	}
}
</style>