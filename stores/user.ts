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
		alert: false as boolean,
		alertMessage: "" as string,
		alertType: undefined as "error" | "success" | "warning" | "info" | undefined,
		loading: false as boolean
	}),
	actions: {
		// async fetchUser(userId: number) {
		// },
		async createUser(userData: UserData, password: string) {
			const { passport } = useRuntimeConfig().public;
		
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
				this.alert = true;
				this.alertMessage = "Success! Logging you in...";
				this.alertType = "success";

				console.log(this.user);

				setTimeout(async () => {
					const { signIn } = useAuth();
					await signIn("credentials", { username: userData.name, password });
				}, 3000);
			}
			catch(e) {
				if (typeof e === "string") {
					this.alert = true;
					this.alertMessage = e;			
					this.alertType = "error";
				} else {
					this.alert = true;
					this.alertMessage = "An unexpected error occurred. Contact support.";
					this.alertType = "error";

					console.error(e);
				}
			}
			finally {
				setTimeout(() => { this.alert = false; }, 4000);
				this.loading = false;
			}
		},
		// async updateUser(userId: number, userData: UserData) {
		// },
		// async deleteUser(userId: number) {
		// }
	}
});