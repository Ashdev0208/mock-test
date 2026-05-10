<template>
  <nav
    class="bg-slate-900/80 backdrop-blur border-b border-slate-800 sticky top-0 z-40"
  >
    <div class="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
      <!-- Left: Logo or Title -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 hover:opacity-80 transition"
      >
        <div
          class="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"
        >
          <i class="fas fa-book text-white text-sm"></i>
        </div>
        <span class="font-bold text-white hidden sm:inline">TOPIK Mock</span>
      </RouterLink>

      <!-- Right: Language Selector -->
      <div class="flex items-center gap-4">
        <div class="relative" ref="langDropdown">
          <button
            @click="toggleLangMenu"
            class="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-700 hover:bg-slate-800 transition text-slate-200 text-sm font-medium"
          >
            <i class="fas fa-globe text-indigo-400"></i>
            <span>{{ currentLangLabel }}</span>
            <i
              class="fas fa-chevron-down text-xs transition"
              :class="{ 'rotate-180': isLangMenuOpen }"
            ></i>
          </button>

          <!-- Language Dropdown Menu -->
          <div
            v-if="isLangMenuOpen"
            class="absolute right-0 mt-2 w-40 bg-slate-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden z-50"
          >
            <button
              v-for="option in locales"
              :key="option.code"
              @click="selectLanguage(option.code)"
              class="w-full px-4 py-2 text-left text-sm hover:bg-slate-800 transition flex items-center gap-2"
              :class="
                lang.locale === option.code
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300'
              "
            >
              <i
                :class="
                  lang.locale === option.code
                    ? 'fas fa-check text-green-400'
                    : 'fas fa-circle-o opacity-0'
                "
              ></i>
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import { useLangStore } from "../stores/lang.js";

const lang = useLangStore();
const isLangMenuOpen = ref(false);
const locales = computed(() => lang.availableLocales);
const currentLangLabel = computed(() => {
  const current = locales.value.find((l) => l.code === lang.locale);
  return current?.label || "Language";
});

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value;
};

const selectLanguage = (code) => {
  lang.setLocale(code);
  isLangMenuOpen.value = false;
};

// Close menu when clicking outside
const handleClickOutside = (e) => {
  const dropdown = document.querySelector("[data-lang-dropdown]");
  if (dropdown && !dropdown.contains(e.target)) {
    isLangMenuOpen.value = false;
  }
};

if (typeof window !== "undefined") {
  document.addEventListener("click", handleClickOutside);
}
</script>

<style scoped></style>
