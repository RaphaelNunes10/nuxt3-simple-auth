import { defineNuxtConfig } from "nuxt/config";
import { exec } from "child_process";
export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true
		}
	},
	components: true,
	alias: {
		cookie: "cookie"
	},
	hooks: {
		"build:before": () => {
			exec("pnpm lint-watch", (err, stdout, stderr) => {
				if (err) {
					console.error(`lint-watch error: ${stderr}`);
					throw err;
				}
				console.log(stdout);
			});

			exec("pnpm stylelint-watch", (err, stdout, stderr) => {
				if (err) {
					console.error(`stylelint-watch error: ${stderr}`);
					throw err;
				}
				console.log(stdout);
			});
		}
	},
	css: [
		"@mdi/font/css/materialdesignicons.css"
	],
	modules: [
		"@nuxt/content",
		"@nuxtjs/eslint-module",
		"@pinia/nuxt",
		"@sidebase/nuxt-auth",
		"vuetify-nuxt-module",
		["unplugin-icons/nuxt", { autoInstall: true }],
	],
	runtimeConfig: {
		public: {
			passport: {
				baseUrl: process.env.PASSPORT_BASE_URL,
				clientId: process.env.PASSPORT_CLIENT_ID,
				clientSecret: process.env.PASSPORT_CLIENT_SECRET,
			},
			google: {
				id: process.env.GOOGLE_ID,
				secret: process.env.GOOGLE_SECRET
			},
			facebook: {
				id: process.env.FACEBOOK_ID,
				secret: process.env.FACEBOOK_SECRET
			},
			linkedin: {
				id: process.env.LINKEDIN_ID,
				secret: process.env.LINKEDIN_SECRET
			},
			github: {
				id: process.env.GITHUB_ID,
				secret: process.env.GITHUB_SECRET
			},
		}
	},
	pinia: {
		storesDirs: ["./stores/**"]
	},
	auth: {
		globalAppMiddleware: {
			isEnabled: true
		}
	}
});