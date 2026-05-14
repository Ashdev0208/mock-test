<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { RouterView } from "vue-router";
import Footer from "./components/footer.vue";

const route = useRoute();
const pageLoading = ref(false);

const showHomeLoading = () => {
  if (route.path === "/") {
    pageLoading.value = true;
    setTimeout(() => {
      pageLoading.value = false;
    }, 300);
  } else {
    pageLoading.value = false;
  }
};

onMounted(showHomeLoading);
watch(
  () => route.path,
  () => {
    showHomeLoading();
  },
);
</script>

<template>
  <div class="min-h-screen relative">
    <div
      v-if="pageLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 px-4"
    >
      <div
        class="rounded-3xl bg-slate-900/95 px-8 py-10 text-center shadow-2xl border border-slate-700"
      >
        <div
          class="mx-auto mb-6 h-20 w-20 rounded-full border-4 border-slate-700 border-t-indigo-400 animate-spin"
        ></div>
        <p class="text-white text-lg font-semibold">Loading homepage…</p>
        <p class="mt-2 text-sm text-slate-400">
          Preparing the best experience for you.
        </p>
      </div>
    </div>

    <div v-show="!pageLoading">
      <RouterView />
      <Footer />
    </div>
  </div>
</template>

<style></style>
