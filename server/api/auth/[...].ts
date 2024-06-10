import { NuxtAuthHandler } from "#auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedinProvider from "next-auth/providers/linkedin";
import GithubProvider from "next-auth/providers/github";

const { passport, google, facebook, linkedin, github } = useRuntimeConfig().public;

export default NuxtAuthHandler({
	pages: {
		signIn: "/login",
	},
	providers: [
		{
			id: "laravelpassport", //ID is only used for the callback URL
			name: "Passport", // name is used for the login button
			type: "oauth", // connexion type
			version: "2.0",// oauth version
			authorization: {
				url: `${passport.baseUrl}/oauth/authorize`, // this is the route created by passport by default to get the autorization code
				params: {
					scope: "*", // this is the wildcard for all scopes in laravel passport, you can specify scopes separated by a space
				}
			},
			token: {
				url: `${passport.baseUrl}/oauth/token`, // this is the default route created by passport to get and renew the tokens
			},
			clientId: passport.clientId, // the client Id
			clientSecret: passport.clientSecret,// the client secret
			userinfo: {
				url: `${passport.baseUrl}/api/v1/me`,// this is a custom route that must return the current user that must be created in laravel
			},
			profile: (profile: { id: any; username: any; email: any; image: any; }) => {
				// map the session fields with you laravel fields
				// profile is the user coming from the laravel app
				// update the return with your own fields names
				return {
					id: profile.id,
					name: profile.username,
					email: profile.email,
					image: profile.image,
				};
			},
			idToken: false,
		},
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		GoogleProvider.default({
			clientId: google.id,
			clientSecret: google.secret
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		FacebookProvider.default({
			clientId: facebook.id,
			clientSecret: facebook.secret
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		LinkedinProvider.default({
			clientId: linkedin.id,
			clientSecret: linkedin.secret
		}),
		// @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
		GithubProvider.default({
			clientId: github.id,
			clientSecret: github.secret
		}),
	]
});