# Nuxt 3 Simple Auth Demo (WIP)

Projeto pessoal em construção feito com Vue.js 3 e Nuxt 3, explorando os avanços da Composition API, stores beseadas em [Pinia](https://pinia.vuejs.org), autenticação padrão e oAuth utilizando [Sidebase Nuxt Auth](https://github.com/sidebase/nuxt-auth), [Vuetify](https://vuetifyjs.com) como bilbioteca de componentes para a interface visual e integração com [Supabase](https://supabase.com).

O projeto utiliza "$fetch" (mesmo "oFetch" para Nuxt) para chamadas API com gerenciamento de erros customizados, baseado no retorno da seguinte API feita com Laravel: https://github.com/RaphaelNunes10/laravel-simple-auth-api

___

Ongoing personal project made with Vue.js 3 + Nuxt 3, exploring the advancements of the Composition API as oposed to the Options API, stores based on [Pinia](https://pinia.vuejs.org), standard and oAuth authentication with [Sidebase Nuxt Auth](https://github.com/sidebase/nuxt-auth), [Vuetify](https://vuetifyjs.com) as the UI component library and [Supabase](https://supabase.com) integration.

It uses "$fetch" (same as "oFetch" for Nuxt) for API calls with custom error handling based on the standard responses and external validations from the following Laravel API project:
https://github.com/RaphaelNunes10/laravel-simple-auth-api

## Instalação || Setup

Instale as dependências:

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Variáveis de Ambiente || Environment Variables

Adicione um arquivo ".env" na raiz do projeto com o seguinte template e preencha:

Add a ".env" on the root of the project with the following template and fill it out:

```bash
# Base API

NUXT_PUBLIC_API_BASE=
NUXT_API_SECRET=

# NextAuth

NUXT_NEXTAUTH_URL=
NUXT_NEXTAUTH_SECRET=

GOOGLE_ID=
GOOGLE_SECRET=

FACEBOOK_ID=
FACEBOOK_SECRET=

LINKEDIN_ID=
LINKEDIN_SECRET=

GITHUB_ID=
GITHUB_SECRET=

# Laravel Passport

PASSPORT_BASE_URL=
PASSPORT_CLIENT_ID=
PASSPORT_CLIENT_SECRET=

# Supabase

SUPABASE_URL=
SUPABASE_KEY=
```

## Servidor de Desenvolvimento || Development Server

Inicie o servidor de desenvolvimento em `http://localhost:3000`:

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```
