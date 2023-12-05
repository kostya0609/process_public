<template>
	<el-table
		:data="history"
		style="width: 100%"
	>
		<el-table-column
			prop="created_at"
			label="Дата"
			width="250"
		>
			<template #default="scope">
				{{ formatDate(scope.row.created_at, formatOptions) }}
			</template>
		</el-table-column>
		<el-table-column
			prop="event"
			label="Событие"
		>
			<template #default="scope">
				<div>
					{{ scope.row.event }}
				</div>
				<div v-if="scope.row.comment">
					Комментарий: {{ scope.row.comment }}
				</div>
			</template>
		</el-table-column>
		<el-table-column
			prop="user"
			label="Участник"
		>
			<template #default="scope">
				<UserLink
					:id="scope.row.user.id"
					:fio="scope.row.user.full_name"
					:photo="scope.row.user.photo"
				/>
			</template>
		</el-table-column>
	</el-table>
</template>
<script setup>
import { formatDate } from '@/utils';
import UserLink from '@/components/UserLink';

defineProps({
	history: Array,
});

/**
 * @type {Intl.DateTimeFormatOptions}
 */
const formatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	second: 'numeric',
};
</script>