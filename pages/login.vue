<template>
  <VContainer class="d-flex align-center">
    <VCard
      class="mx-auto"
      width="350"
    >
      <VCardTitle class="text-h6 font-weight-regular justify-space-between">
        <span>Login</span>
      </VCardTitle>

      <VForm
        validate-on="submit lazy"
        @submit.prevent="Login"
      >
        <VCardText>
          <VTextField
            v-model="username"
            :rules="[rules.required]"
            label="User name"
            :prepend-inner-icon="icons.MaterialSymbolsPerson"
          />
          <VTextField
            v-model="password"
            :rules="[rules.required]"
            label="Password"
            type="password"
            :prepend-inner-icon="icons.MaterialSymbolsKey"
          />

          <VRow no-gutters>
            <VSpacer />
            <VBtn
              :loading="loading"
              color="primary"
              variant="flat"
              type="submit"
            >
              Login
            </VBtn>
            <VSpacer />
          </VRow>
          <br>
          <VRow no-gutters>
            <VCol class="pt-2">
              <VDivider />
            </VCol>
            <VCol
              cols="auto"
              class="text-center text-grey"
            >
              <p class="text-caption">
                OR
              </p>
            </VCol>
            <VCol class="pt-2">
              <VDivider />
            </VCol>
          </VRow>
          <br>
          <VRow>
            <VSpacer />
            <VBtn @click="signIn('google')">
              <VIcon :icon="icons.LogosGoogleIcon" />
            </VBtn>
            <VSpacer />
            <VBtn @click="signIn('facebook')">
              <VIcon :icon="icons.DeviconFacebook" />
            </VBtn>
            <VSpacer />
            <VBtn @click="signIn('linkedin')">
              <VIcon :icon="icons.DeviconLinkedin" />
            </VBtn>
            <VSpacer />
            <VBtn @click="signIn('github')">
              <VIcon :icon="icons.IconParkGithub" />
            </VBtn>
            <VSpacer />
          </VRow>
          <br>
          <div class="d-flex flex-row">
            <VSpacer />
            <small>
              Don't have an account? &nbsp;
              <NuxtLink to="/register">
                Register Here
              </NuxtLink>
            </small>
            <VSpacer />
          </div>
        </VCardText>
      </VForm>
    </VCard>
  </VContainer>
</template>

<script lang="ts" setup>
definePageMeta({
	auth: {
		unauthenticatedOnly: true,
		navigateAuthenticatedTo: "/",
	}
});

const icons = useIcons();
const rules = useFormRules();
const { signIn } = useAuth();

const username = ref("");
const password = ref("");
const loading = ref(false);

async function Login (event: any) {
	loading.value = true;
	const results = await event;
	loading.value = false;

	if(results?.valid == true) {
		signIn("Passport", { username: username.value, password: password.value });
	}
}
</script>

<style>

</style>
