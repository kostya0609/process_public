<template>
	<pre-loader
		:loading="loading"
		class="new-bp-container"
	>
		<h4 class="new-bp-header">
			{{ process.title }} (ID {{ process.id }})
		</h4>

		<el-steps
			class="new-bp-step"
			:space="200"
			:active="statuses.findIndex(status => status.current_status.id == active_status.id)"
			simple
			finish-status="success"
		>
			<el-step
				v-for="status in statuses"
				:key="status.current_status.id"
				:title="status.current_status.title"
			/>
		</el-steps>

		<el-timeline>
			<el-timeline-item
				v-for="stage in stages"
				:key="stage.id"
				:timestamp="stage.title"
				placement="top"
			>
				<el-card class="new-bp-card-group">

					<template v-if="active_status.id == 1">
						<participants-group
							v-for="group in stage.groups"
							:key="group.id"
							:group="group"
							:process_id="process.id"
							:type="group_types.find(el => el.id == group.type_id).title"
						/>
					</template>

					<template v-else>
						<participants-solutions
							v-for="group in stage.groups"
							:key="group.id"
							:solutions_table="group.participants"
							:type="group_types.find(el => el.id == group.type_id).title"
						/>
					</template>

				</el-card>
			</el-timeline-item>
		</el-timeline>

		<el-row v-if="active_status.id != 1 && active_status.id != 2">
			<el-col
				:md="10"
				class="new-bp-decide-block"
			>
				<participants-actions
					v-if="decide_participant"
					:actionList="actionList"
					@saveSolution="saveSolution"
				/>
			</el-col>
			<el-col
				:md="14"
				align="right"
			>
				<el-button @click="cancellationProcess">
					Аннулировать процесс
				</el-button>
			</el-col>
		</el-row>

		<div
			class="new-bp-footer"
			v-if="active_status.id == 1"
		>
			<el-button
				type="primary"
				@click="runProcess"
			>
				Запустить процесс
			</el-button>
		</div>

	</pre-loader>
</template>
  
<script setup>
import { ProcessRepo, TypeRepo, ParticipantRepo } from "@/plugins/business_process/repositories";
import preLoader from "@/plugins/business_process/components/common/pre_loader";
import participantsGroup from "@/plugins/business_process/components/common/participants_group";
import participantsSolutions from "@/plugins/business_process/components/common/participants_solutions";
import participantsActions from "@/plugins/business_process/components/common/participants_actions";
import { inject, provide, reactive, ref, watchEffect } from "vue";


const props = defineProps({
	process: Object,
});

const notify = inject('_business_process_notify');
const user_id = inject('_business_process_user_id');
const setActiveProcess = inject('setActiveProcess');
const emit = inject('emit');

const loading = ref(false);

const group_types = ref([]);
const group_fill_types = ref([]);
const action_types = ref([]);

const process_id = ref(null);
const active_status = reactive({
	id: null,
	title: ''
});
const statuses = ref([]);

const stages = ref([]);
const groups = reactive({}); // ключ это ID группы а значение это массив согласовантов

const decide_participant = ref(null);
const actionList = ref([]);


const getTypes = async () => {
	try {
		loading.value = true;
		let result = await TypeRepo.list();

		if (result.success && result.data) {
			group_types.value = result.data.group_types;
			group_fill_types.value = result.data.group_fill_types;
			action_types.value = result.data.action_types;
		}

	} catch (e) {
		notify({ title: 'Ошибка при выполнении запроса на получение типов групп/действия', message: e.message, type: 'error', duration: 5000 });
	} finally {
		loading.value = false;
	}
};
await getTypes();

const getData = async () => {
	try {
		loading.value = true;

		const activeProcess = await ProcessRepo.get({
			template_id: props.process.template_id,
			document_id: props.process.document_id,
			user_id,
		});

		setActiveProcess(activeProcess);
	} catch (e) {
		notify({ title: 'Ошибка при выполнении запроса получения информации о бизнес процессе', message: e.message, type: 'error', duration: 5000 });
	} finally {
		loading.value = false;
	}

};

const getActiveStage = async () => {
	try {
		loading.value = true;
		let result = await ProcessRepo.get_active_stages({
			process_id: props.process.id,
			template_id: props.process.template_id,
			user_id,
		});

		if (result.success && result.data) {
			stages.value = result.data;

			stages.value.forEach(stage => {
				stage.groups.forEach(group => {
					groups[group.id] = group.participants;
					groups[group.id].forEach(el => { if (el.can_deletable) el.user.deleted = false });

					group.removed_participants.forEach(el => {
						el.user.deleted = true;
						groups[group.id].push(el);
					});
				});
			})
		};

	} catch (e) {
		notify({ title: 'Ошибка при выполнении запроса получения активной стадии бизнес процесса', message: e.message, type: 'error', duration: 5000 });
	} finally {
		loading.value = false;
	}
};

const can_decide_participant = async () => {
	try {
		loading.value = true;
		let result = await ParticipantRepo.getActiveParticipant({
			process_id: props.process.id,
			user_id,
		});

		decide_participant.value = result.data ? result.data.id : null;

	} catch (e) {
		notify({ title: 'Ошибка при выполнении запроса принятия решения по бизнес процессу', message: e.message, type: 'error', duration: 5000 });
		//throw e;
	} finally {
		loading.value = false;
	}
};

const runProcess = async () => {
	try {
		loading.value = true;
		let result = await ProcessRepo.run({
			process_id: props.process.id,
			user_id,
		});

		notify({ title: 'Бизнес процесс запущен ', message: '', type: 'success', duration: 1000 });
		active_status.id = result.data.status.id;
		active_status.title = result.data.status.title;

		emit('runned');

		await getData();
		await can_decide_participant();

	} catch (e) {
		notify({ title: 'Ошибка запуска бизнес процесса ', message: e.message, type: 'error', duration: 5000 });
	} finally {
		loading.value = false;
	}
};

const cancellationProcess = async () => {
	try {
		loading.value = true;
		await ProcessRepo.cancellation({
			process_id: props.process.id,
			user_id,
		});

		emit('cancellation');

		decide_participant.value = null;
		await getData();
		await getActiveStage();

	} catch (e) {
		notify({ title: 'Ошибка запуска бизнес процесса ', message: e.message, type: 'error', duration: 5000 });
	} finally {
		loading.value = false;
	}
};

const saveSolution = async (action_id, comment, upload_data) => {

	let send_files = new FormData();

	if (upload_data.files.length > 0) {
		send_files.append('participant_id', decide_participant.value);

		for (let i = 0; i < upload_data.files.length; i++) {
			send_files.append('files[' + i + ']', upload_data.files[i].raw);
		}
	}

	try {
		loading.value = true;

		if (upload_data.files.length > 0) {
			await ParticipantRepo.uploadDecideFiles(send_files);
		}

		const process = await ParticipantRepo.decide({
			process_id: props.process.id,
			participant_id: decide_participant.value,
			action_id,
			comment,
		});

		if (process.status.id === 1) {
			emit('cancellation');
		} else if (process.status.id === 2) {
			emit('completed');
		} else {
			emit('decided');
		}

		decide_participant.value = null;

		await getData();

	} catch (e) {
		notify({ title: 'Ошибка при выполнении запроса принятия решения по бизнес процессу и передачи файлов', message: e.message, type: 'error', duration: 5000 });
		throw e;
	} finally {
		loading.value = false;
	}
};

watchEffect(async () => {
	active_status.id = props.process.status.id;
	active_status.title = props.process.status.title;
	statuses.value = props.process.statuses;

	if (active_status.id != 1) {
		stages.value = props.process.stages;

		const status = props.process.statuses.find(el => el.current_status.id == active_status.id);

		if (status) {
			actionList.value = status.stage.actions;
		} else {
			throw new Error('Не удалось найти статус!');
		}
	} else {
		await getActiveStage();
	}

	if (active_status.id != 1 && active_status.id != 2) await can_decide_participant();
});


provide('groups', groups);
</script>
  
<style scoped>
.new-bp-header {
	margin-bottom: 10px;
}

.new-bp-footer {
	display: flex;
	justify-content: flex-end;
}

.new-bp-step {
	margin-bottom: 10px;
}

.new-bp-container::v-deep .new-bp-card-group .el-card__body {
	display: flex;
	flex-direction: column;
	row-gap: 20px;
}

.new-bp-decide-block {
	padding: 0 28px;
}
</style>