<template>
	<div class="page-margins">
		<v-row>
			<v-col>
				<div class="title-text mb-4 d-flex align-center justify-space-between">
					<span>Users</span>
					<div class="button-group">
						<v-btn :loading="loading" class="refresh-btn mr-2" variant="tonal" @click="loadUsers">Refresh</v-btn>
						<v-btn class="logout-btn" variant="tonal" @click="logout">Logout</v-btn>
					</div>
				</div>
				<v-card class="users-card" elevation="2">
					<v-card-text>
						<v-data-table
                            color="color-secondary"
							:headers="headers"
							:items="users"
							:loading="loading"
							item-key="id"
							:items-per-page="10"
							:sort-by="[{ key: 'id', order: 'desc' }]"
						>
							<template #item.role="{ item }">
								<v-select
									v-model="item.role"
									:items="roleOptions"
									item-title="title"
									item-value="value"
									density="compact"
									hide-details
									variant="outlined"
									:loading="updatingRole[item.id]"
									@update:model-value="updateUserRole(item, $event)"
									class="role-select"
								>
									{{ selectedItem.title }}
								</v-select>
							</template>
							<template #item.actions="{ item }">
								<v-btn 
									icon="mdi-delete" 
									class="delete-btn" 
									size="small" 
									@click="promptDelete(item)"
								></v-btn>
							</template>
							<template #loading>
								<v-skeleton-loader type="table-row" :loading="true" :elevation="0" />
							</template>
							<template #no-data>
								<div class="text-center py-6">No users found.</div>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-dialog v-model="confirmDialog" max-width="420">
			<v-card>
				<v-card-title class="text-h6">Confirm Deletion</v-card-title>
				<v-card-text>
					<div v-if="selectedUser">
						Are you sure you want to delete <strong>{{ selectedUser.firstName }} {{ selectedUser.lastName }}</strong> (ID {{ selectedUser.id }})?
					</div>
				</v-card-text>
				<v-card-actions class="justify-end">
					<v-btn variant="text" @click="confirmDialog = false">Cancel</v-btn>
					<v-btn color="error" :loading="deleting" @click="deleteUser">Delete</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import apiClient from "../../services/services.js";
import authServices from "../../services/authServices.js";
import store from "../../store/store.js";
import { useRouter } from "vue-router";

const router = useRouter();

const users = ref([]);
const loading = ref(false);
const deleting = ref(false);
const error = ref("");
const updatingRole = ref({});

const confirmDialog = ref(false);
const selectedUser = ref(null);

const roleOptions = [
	{ title: "Admin", value: "admin" },
	{ title: "Coach", value: "coach" },
	{ title: "Athlete", value: "athlete" }
];

const headers = [
	{ title: "ID", key: "id", sortable: true },
	{ title: "First Name", key: "firstName", sortable: true },
	{ title: "Last Name", key: "lastName", sortable: true },
	{ title: "Email", key: "email", sortable: true },
	{ title: "Role", key: "role" },
	{ title: "Actions", key: "actions", sortable: false },
];

function mapUser(u) {
	// console.log("Mapping user:", u);
	const role = u.role ? u.role.charAt(0).toUpperCase() + u.role.slice(1).toLowerCase() : "N/A";
	
	// Format timestamps
	const formatDate = (dateString) => {
		if (!dateString) return "N/A";
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		});
	};
	
	const mappedUser = { 
		...u, 
		role,
		createdAt: formatDate(u.createdAt),
		updatedAt: formatDate(u.updatedAt)
	};
	
	// console.log("Mapped to:", mappedUser);
	return mappedUser;
}

async function loadUsers() {
	loading.value = true;
	error.value = "";
	try {
		const response = await apiClient.get("users");
		
		// The API client's transformResponse already parses JSON, so response should be the direct data
		let userData = response.data;
		
		users.value = userData.map(mapUser);
		
		if (users.value.length === 0) {
			console.warn("No users to display. Check API response and mapping.");
		}
	} catch (e) {
		console.error("Error loading users:", e);
		console.error("Error details:", e.response?.data || e.message);
		error.value = `Failed to load users: ${e?.response?.data?.message || e?.message || e}`;
	} finally {
		loading.value = false;
	}
}

function promptDelete(user) {
	selectedUser.value = user;
	confirmDialog.value = true;
}

async function deleteUser() {
	if (!selectedUser.value) return;
	deleting.value = true;
	try {
		await apiClient.delete(`users/${selectedUser.value.id}`);
		confirmDialog.value = false;
		selectedUser.value = null;
		await loadUsers();
	} catch (e) {
		error.value = `Failed to delete user: ${e?.message || e}`;
	} finally {
		deleting.value = false;
	}
}

async function updateUserRole(user, newRole) {
	if (!user || !newRole) return;
	
	// Set loading state for this specific user
	updatingRole.value[user.id] = true;
	
	try {
		// Update the backend
		await apiClient.put(`users/${user.id}`, { role: newRole });
		
		// Update local user object
		const userIndex = users.value.findIndex(u => u.id === user.id);
		if (userIndex !== -1) {
			users.value[userIndex].role = newRole.charAt(0).toUpperCase() + newRole.slice(1).toLowerCase();
		}
		
		// console.log(`Updated user ${user.id} role to ${newRole}`);
	} catch (e) {
		console.error('Error updating user role:', e);
		error.value = `Failed to update role: ${e?.response?.data?.message || e?.message || e}`;
		
		// Revert the change on error by reloading users
		await loadUsers();
	} finally {
		// Clear loading state
		updatingRole.value[user.id] = false;
	}
}

async function logout() {
	try {
		const user = store.getUser();
		if (user && user.token) {
			await authServices.logoutUser({ credential: user.token });
		}
		// console.log("Successfully logged out.");
		store.clearUser();
		router.push({ name: "login" });
	} catch (err) {
		console.error("Error during logout:", err);
		// Still clear user and redirect even if logout call fails
		store.clearUser();
		router.push({ name: "login" });
	}
}

onMounted(loadUsers);
</script>

<style scoped>
.page-margins { padding: 40px; }
.title-text { 
	font-size: 30px; 
	font-weight: 600; 
	color: var(--color-text);
}
.users-card { 
	border-radius: 20px; 
	background-color: var(--color-primary); 
}
.v-data-table { 
	font-size: 0.9rem; 
	color: var(--color-text);
}
.role-select { 
	min-width: 120px; 
	max-width: 150px; 
}
.button-group { 
	display: flex; 
	gap: 8px; 
	align-items: center; 
}
.refresh-btn {
	background-color: var(--btn-secondary) !important;
	color: var(--btn-secondary-text) !important;
}
.logout-btn {
	background-color: #ff5252 !important;
	color: var(--btn-primary-text) !important;
}
.delete-btn {
	color: #ff5252 !important;
}
.role-chip.admin {
	color: var(--btn-primary-text) !important;
}
.role-chip.coach {
	color: var(--btn-primary-text) !important;
}
.role-chip.athlete {
	color: var(--btn-primary-text) !important;
}
</style>

