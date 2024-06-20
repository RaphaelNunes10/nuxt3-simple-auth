<template>
  <VApp>
    <VAppBar>
      <VAppBarNavIcon
        variant="text"
        @click.stop="drawer = !drawer"
      />
      <VToolbarTitle>Simple Auth</VToolbarTitle>
      {{ status }}
      <VBtn
        v-if="data?.user?.name"
        class="text-none px-3"
        variant="outlined"
        rounded="xl"
        size="large"
      >
        <span class="mt-2 text-center">{{ data?.user?.name?.toString() }}</span>
        <template #append>
          <VAvatar size="small">
            <VImg
              cover
              :src="data?.user?.image?.toString()"
            >
              <template #placeholder>
                <p
                  class="text-white pt-2"
                  style="height: 100%; background: salmon"
                > 
                  {{ data?.user?.name?.toString().substring(0) }}
                </p>
              </template>
            </VImg>
          </VAvatar>
        </template>
      </VBtn>
    </VAppBar>

    <VMain>
      <VLayout
        full-height
      >
        <VNavigationDrawer
          v-model="drawer"
          temporary
        >
          <VListItem
            title="My Application"
            subtitle="Vuetify"
          />
        </VNavigationDrawer>
        
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
        <slot />
      </VLayout>
      <VFooter
        app
        absolute
        color="red"
        style="width: 100%"
      >
        <VSpacer />
        <strong>RED HILT @ {{ new Date().getFullYear() }}</strong>
      </VFooter>
    </VMain>
  </VApp>
</template>

<script lang="ts" setup>
const { status, data } = useAuth();

const { alert, alertMessage, alertType } = useAlert();

const drawer = ref(false);
const group = ref(null);

watch(group, () => {
	drawer.value = false;
});
</script>

<style scoped>
  .avatar-placeholder-loader :deep(.v-skeleton-loader__avatar) {
    margin: 0 !important;
  }
</style>