<template>
  <VContainer
    class="d-flex align-center justify-center flex-column"
  >
    <VSnackbar
      v-model="alert"
      variant="text"
      location="right top"
      contained
    >
      <VAlert
        :type="alertType"
        :text="alertMessage"
        variant="tonal"
        closable
        @click:close="alert = false"
      />
      <VProgressLinear
        color="red"
        indeterminate
      />
    </VSnackbar>

    <VCard
      class="mx-auto"
      width="400"
    >
      <VCardTitle class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}&nbsp;</span>
        <VBadge
          color="primary"
          :content="step"
          inline
        />
      </VCardTitle>

      <VForm @submit.prevent="userStore.createUser({name: username, email: email}, password)">
        <VWindow v-model="step">
          <VWindowItem :value="1">
            <VCardText>
              <VTextField
                v-model="email"
                :rules="[rules.required]"
                label="Email"
                placeholder="john@google.com"
                :prepend-inner-icon="icons.MaterialSymbolsMail"
              />
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
                  Already have an account? &nbsp;
                  <NuxtLink to="/login">
                    Log in
                  </NuxtLink>
                </small>
                <VSpacer />
              </div>
            </VCardText>
          </VWindowItem>

          <VWindowItem :value="2">
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
              <VTextField
                v-model="confirmPassword"
                :rules="[rules.required, rules.samePassword]"
                label="Confirm Password"
                type="password"
                :prepend-inner-icon="icons.MaterialSymbolsKey"
              />
              <span class="text-caption text-grey-darken-1">
                Please enter a password for your account
              </span>
            </VCardText>
          </VWindowItem>

          <VWindowItem :value="3">
            <div class="pa-4 text-center">
              <VIcon
                class="mb-4"
                height="128"
                icon="TwemojiEnvelopeWithArrow"
              />
              <h3 class="text-h6 font-weight-light mb-2">
                Welcome, {{ username }}.
              </h3>
              <p>
                Thanks for signing up!
              </p>
              <br>
              <p class="text-caption text-grey">
                An email has been sent to you. <br>
                Click on the link to confirm your email and proceed to login.
              </p>
            </div>
          </VWindowItem>
        </VWindow>

        <VDivider />

        <VCardActions v-if="step < 3">
          <VBtn
            v-if="step > 1"
            variant="text"
            @click.stop="step--"
          >
            Back
          </VBtn>
          <VSpacer />
          <VBtn
            v-if="step < 2"
            color="primary"
            variant="flat"
            @click.stop="step++"
          >
            Next
          </VBtn>
          <VBtn
            v-else
            color="primary"
            variant="flat"
            type="submit"
          >
            Finish
            &nbsp;
            <VProgressCircular
              v-show="loading"
              color="white"
              size="x-small"
              indeterminate
            />
          </VBtn>
        </VCardActions>
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

const { signIn } = useAuth();

const userStore = useMyUserStore();
const { alert, alertMessage, alertType, loading } = storeToRefs(userStore);

const step = ref(1);

const email = ref("");
const username = ref("");
const confirmPassword = ref("");

const { rules, password } = useFormRules();

const currentTitle = computed(() => {
	switch (step.value) {
	case 1: return "Sign-up";
	case 2: return "Create a password";
	default: return "Email confirmation";
	}
});
</script>