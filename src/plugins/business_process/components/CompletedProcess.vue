<template>
	<div>
		<el-result
			icon="success"
			title="Процесс завершен!"
		>
			<template #extra>
				<el-descriptions
					direction="vertical"
					border
					class="descriptions"
				>
					<el-descriptions-item label="Запущен">
						{{ formatDate(completedProcess.executed_at, dateFormatOptions) }}
					</el-descriptions-item>
					<el-descriptions-item label="Завершен">
						{{ formatDate(completedProcess.finished_at, dateFormatOptions) }}
					</el-descriptions-item>
				</el-descriptions>
			</template>
		</el-result>
	</div>
</template>
<script setup>
import { formatDate } from '@/plugins/business_process/utils';

const props = defineProps({
	completedProcess: Object,
});

/**
 * @type {Intl.DateTimeFormatOptions}
 */
const dateFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};
</script>
<style scoped lang="scss">
::v-deep(.descriptions .el-descriptions__extra) {
	display: none;
}

::v-deep(.descriptions .el-descriptions__header) {
	justify-content: center;
}

::v-deep(.descriptions .el-descriptions__cell) {
	text-align: center;
}
</style>