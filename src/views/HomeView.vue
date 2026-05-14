<template>
  <div class="min-h-screen">
    <div
      v-if="pageLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 px-4"
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

    <div v-else class="bg-gray-900 overflow-hidden">
      <!-- header -->
      <header class="absolute inset-x-0 top-0 z-50">
        <nav
          class="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div class="flex lg:flex-1">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </a>
          </div>
          <div class="flex lg:hidden">
            <button
              type="button"
              class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
              @click="mobileMenuOpen = true"
            >
              <span><i class="fas fa-bars"></i></span>
              <Bars3Icon class="size-6" aria-hidden="true" />
            </button>
          </div>
          <div class="hidden lg:flex lg:gap-x-12">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="text-sm/6 font-semibold text-white"
              >{{ item.name }}</a
            >
          </div>
          <div class="hidden lg:flex lg:flex-1 lg:justify-end">
            <RouterLink
              to="/register"
              class="text-sm/6 font-semibold text-white"
              >{{ lang.t("auth.sign_in_button") }}
              <span aria-hidden="true">&rarr;</span></RouterLink
            >
          </div>
        </nav>
        <div
          v-if="mobileMenuOpen"
          class="fixed inset-0 z-50 bg-slate-950/90 px-6 py-8 lg:hidden"
        >
          <div class="flex items-center justify-between mb-8">
            <a href="#" class="-m-1.5 p-1.5">
              <span class="sr-only">Your Company</span>
              <img
                class="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt=""
              />
            </a>
            <button
              type="button"
              class="-m-2.5 rounded-md p-2.5 text-gray-200"
              @click="mobileMenuOpen = false"
            >
              <span><i class="fas fa-times"></i></span>
            </button>
          </div>
          <div class="space-y-4">
            <a
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="block rounded-lg px-4 py-3 text-base font-semibold text-white hover:bg-white/5"
              >{{ item.name }}</a
            >
          </div>
          <div class="mt-8">
            <RouterLink
              to="/register"
              class="block rounded-2xl bg-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-400"
              >{{ lang.t("auth.sign_in_button") }}</RouterLink
            >
          </div>
        </div>
      </header>

      <div class="relative isolate px-6 pt-14 lg:px-8">
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
        <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div class="hidden sm:mb-8 sm:flex sm:justify-center">
            <div
              class="relative rounded-full px-3 py-1 text-sm/6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20"
            >
              {{ lang.t("home.announce") }}
              <a href="#" class="font-semibold text-indigo-400"
                ><span class="absolute inset-0" aria-hidden="true"></span
                >{{ lang.t("home.read_more") }}
                <span aria-hidden="true">&rarr;</span></a
              >
            </div>
          </div>
          <div class="text-center">
            <h1
              class="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
            >
              {{ lang.t("home.hero_title") }}
            </h1>
            <p
              class="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8"
            >
              {{ lang.t("home.hero_description") }}
            </p>
            <div class="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >{{ lang.t("home.get_started") }}</a
              >
              <a href="#" class="text-sm/6 font-semibold text-white"
                >{{ lang.t("home.learn_more") }}
                <span aria-hidden="true">→</span></a
              >
            </div>
          </div>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          ></div>
        </div>
      </div>
    </div>
    <!-- count -->
    <section class="bg-slate-900 py-20 border border-slate-800 border-px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
          <div class="flex flex-col items-center">
            <span class="text-5xl font-extrabold text-slate-500 tracking-tight"
              >10k+</span
            >
            <span
              class="mt-2 text-xs font-bold text-slate-600 uppercase tracking-[0.2em]"
              >{{ lang.t("home.active_students") }}</span
            >
          </div>

          <div class="flex flex-col items-center">
            <span class="text-5xl font-extrabold text-slate-500 tracking-tight"
              >500+</span
            >
            <span
              class="mt-2 text-xs font-bold text-slate-600 uppercase tracking-[0.2em]"
              >{{ lang.t("home.mock_challenges") }}</span
            >
          </div>

          <div class="flex flex-col items-center">
            <span class="text-5xl font-extrabold text-slate-500 tracking-tight"
              >88%</span
            >
            <span
              class="mt-2 text-xs font-bold text-slate-600 uppercase tracking-[0.2em]"
              >{{ lang.t("home.avg_improvement") }}</span
            >
          </div>

          <div class="flex flex-col items-center">
            <span class="text-5xl font-extrabold text-slate-500 tracking-tight"
              >24/7</span
            >
            <span
              class="mt-2 text-xs font-bold text-slate-600 uppercase tracking-[0.2em]"
              >{{ lang.t("home.expert_support") }}</span
            >
          </div>
        </div>
      </div>
    </section>
    <!-- Features -->
    <div class="bg-slate-900 py-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="max-w-7xl mx-auto px-3">
          <div
            class="bg-slate-800/50 rounded-[3rem] p-12 border border-slate-800"
          >
            <span class="text-indigo-400">{{
              lang.t("home.deploy_faster")
            }}</span>
            <h2 class="text-white text-4xl font-bold">
              {{ lang.t("home.everything_you_need") }}
            </h2>
          </div>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl
            class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
          >
            <div
              v-for="feature in features"
              :key="feature.name"
              class="relative pl-16"
            >
              <dt class="text-base/7 font-semibold text-white">
                <div
                  class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-500"
                >
                  <i
                    :class="feature.icon"
                    class="size-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                {{ feature.name }}
              </dt>
              <dd class="mt-2 text-base/7 text-gray-400">
                {{ feature.description }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
    <!-- feature highlights -->

    <section class="bg-slate-950 py-24 px-8 overflow-hidden">
      <div
        class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      >
        <div class="space-y-8">
          <div>
            <span
              class="inline-block px-4 py-1.5 rounded-full border border-slate-700 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6"
            >
              {{ lang.t("home.real_time_feedback") }}
            </span>
            <h2 class="text-5xl font-extrabold text-white leading-tight">
              {{ lang.t("home.direct_communication") }} <br />
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
              >
                {{ lang.t("home.instructor_support") }}
              </span>
            </h2>
          </div>

          <p class="text-slate-400 text-lg leading-relaxed max-w-lg">
            {{ lang.t("home.instant_updates") }}
          </p>

          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-slate-300 font-medium">
              <svg
                class="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ lang.t("home.push_notifications") }}
            </li>
            <li class="flex items-center gap-3 text-slate-300 font-medium">
              <svg
                class="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ lang.t("home.syllabus_alerts") }}
            </li>
            <li class="flex items-center gap-3 text-slate-300 font-medium">
              <svg
                class="w-5 h-5 text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {{ lang.t("home.instructor_support") }}
            </li>
          </ul>
        </div>

        <div class="relative">
          <div
            class="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full"
          ></div>

          <div
            class="relative bg-slate-900 p-4 rounded-[2.5rem] border border-slate-800 shadow-2xl"
          >
            <div
              class="bg-indigo-600 p-10 rounded-[2rem] aspect-video flex flex-col justify-center"
            >
              <div class="flex items-center gap-2 mb-6">
                <div
                  class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
                ></div>
                <span
                  class="text-indigo-200 text-xs font-bold uppercase tracking-widest"
                  >System Broadcast</span
                >
              </div>
              <p class="text-2xl font-bold text-white leading-snug italic">
                "Admin: New SAT reading practice sets are going live this Friday
                at 6 PM. Keep your streaks active!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { useLangStore } from "../stores/lang.js";
const lang = useLangStore();
const pageLoading = ref(true);

const navigation = computed(() => [
  { name: lang.t("home.nav.product"), href: "#" },
  { name: lang.t("home.nav.features"), href: "#" },
  { name: lang.t("home.nav.marketplace"), href: "#" },
  { name: lang.t("home.nav.company"), href: "#" },
]);

const features = computed(() => [
  {
    name: lang.t("home.features.feature1.name"),
    description: lang.t("home.features.feature1.description"),
    icon: "fa-solid fa-smile",
  },
  {
    name: lang.t("home.features.feature2.name"),
    description: lang.t("home.features.feature2.description"),
    icon: "fa-solid fa-lock",
  },
  {
    name: lang.t("home.features.feature3.name"),
    description: lang.t("home.features.feature3.description"),
    icon: "fa-solid fa-inbox",
  },
  {
    name: lang.t("home.features.feature4.name"),
    description: lang.t("home.features.feature4.description"),
    icon: "fa-solid fa-fingerprint",
  },
]);

const mobileMenuOpen = ref(false);

onMounted(() => {
  setTimeout(() => {
    pageLoading.value = false;
  }, 300);
});
</script>

<style></style>
