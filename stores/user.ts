import { defineStore } from "pinia";
import { useRuntimeConfig } from "#app";
import { FetchError } from "ofetch";

interface UserData {
	name: string;
	email: string;
}

export const useMyUserStore = defineStore({
	id: "myUserStore",
	state: () => ({ 
		user: [] as UserData[],
		loading: false as boolean
	}),
	actions: {
		// async fetchUser(userId: number) {
		// },
		async createUser(userData: UserData, password: string) {
			const { passport } = useRuntimeConfig().public;
			const { showAlert } = useAlert();
		
			if (!passport) {
				console.error("Passport config is undefined. Check the environment variables.");
				return;
			}
		
			this.loading = true;

			try {
				const data = await $fetch(`${passport.baseUrl}/api/users`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: { ...userData, password }
				})
					.catch((err: FetchError) => {
						throw `${err.status}: [${err.statusText}] ${err.response?._data?.message || "Unknown error."}`;
					});

				Object.assign(this.user, data);

				showAlert("Success! Logging you in...", "success", 3000);

				console.log(this.user);

				setTimeout(async () => {
					const { signIn } = useAuth();
					await signIn("credentials", { username: userData.name, password });
				}, 3000);
			}
			catch(e) {
				if (typeof e === "string") {
					showAlert(e, "error");
				} else {
					showAlert("An unexpected error occurred. Contact support.", "error");
					console.error(e);
				}
			}
			finally {
				this.loading = false;
			}
		},
		// async updateUser(userId: number, userData: UserData) {
		// },
		// async deleteUser(userId: number) {
		// }
	}
});