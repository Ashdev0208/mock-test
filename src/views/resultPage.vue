<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased">
    <header class="max-w-7xl mx-auto px-8 py-10">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">Test Results</h1>
        <p class="text-slate-400 mt-2 font-medium">
          Review your performance and answers
        </p>
      </div>
    </header>

    <div v-if="loading" class="max-w-7xl mx-auto px-8">
      <div class="flex items-center justify-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <p class="ml-4 text-slate-400">Loading results...</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-8 pb-20">
      <!-- Score Card -->
      <div
        class="relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl mb-8"
      >
        <div
          class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"
        ></div>

        <div class="relative z-10 text-center">
          <div class="mb-6">
            <p
              class="text-slate-400 text-sm font-bold uppercase tracking-widest mb-2"
            >
              Your Score
            </p>
            <p class="text-6xl font-extrabold text-white">
              {{ score }} / {{ totalQuestions }}
            </p>
          </div>

          <div class="mb-6">
            <p
              class="text-5xl font-bold"
              :class="
                percentage >= 70
                  ? 'text-green-400'
                  : percentage >= 50
                    ? 'text-yellow-400'
                    : 'text-red-400'
              "
            >
              {{ percentage }}%
            </p>
            <p class="text-slate-400 mt-2">
              {{
                percentage >= 70
                  ? "Excellent work!"
                  : percentage >= 50
                    ? "Good job!"
                    : "Keep practicing!"
              }}
            </p>
          </div>

          <div class="flex justify-center gap-8 text-sm">
            <div class="text-center">
              <p class="text-slate-500 font-bold uppercase tracking-widest">
                Correct
              </p>
              <p class="text-2xl font-bold text-green-400">{{ score }}</p>
            </div>
            <div class="text-center">
              <p class="text-slate-500 font-bold uppercase tracking-widest">
                Incorrect
              </p>
              <p class="text-2xl font-bold text-red-400">
                {{ totalQuestions - score }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-slate-500 font-bold uppercase tracking-widest">
                Accuracy
              </p>
              <p class="text-2xl font-bold text-indigo-400">
                {{ percentage }}%
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Test Summary -->
      <div
        class="bg-slate-900/50 border border-slate-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div class="p-6 border-b border-slate-800">
          <h3 class="text-xl font-bold text-white">Test Summary</h3>
          <p class="text-slate-400 text-sm mt-1">
            {{ latestAttempt?.tests?.title || "Recent Test" }} completed on
            {{
              latestAttempt
                ? new Date(latestAttempt.completed_at).toLocaleDateString()
                : ""
            }}
          </p>
        </div>

        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div
                class="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fa-solid fa-check-circle text-green-400 text-xl"></i>
              </div>
              <p
                class="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1"
              >
                Correct Answers
              </p>
              <p class="text-2xl font-bold text-green-400">{{ score }}</p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fa-solid fa-times-circle text-red-400 text-xl"></i>
              </div>
              <p
                class="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1"
              >
                Incorrect Answers
              </p>
              <p class="text-2xl font-bold text-red-400">
                {{ totalQuestions - score }}
              </p>
            </div>

            <div class="text-center">
              <div
                class="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <i class="fa-solid fa-chart-line text-indigo-400 text-xl"></i>
              </div>
              <p
                class="text-slate-500 font-bold uppercase tracking-widest text-xs mb-1"
              >
                Accuracy Rate
              </p>
              <p class="text-2xl font-bold text-indigo-400">
                {{ percentage }}%
              </p>
            </div>
          </div>

          <div class="mt-6 p-4 bg-slate-800/50 rounded-xl">
            <p class="text-slate-300 text-center">
              <span class="font-semibold">Performance:</span>
              <span
                :class="
                  percentage >= 70
                    ? 'text-green-400'
                    : percentage >= 50
                      ? 'text-yellow-400'
                      : 'text-red-400'
                "
              >
                {{
                  percentage >= 70
                    ? "Excellent!"
                    : percentage >= 50
                      ? "Good job!"
                      : "Keep practicing!"
                }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-4 mt-8">
        <button
          @click="retakeTest"
          class="flex-1 py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
        >
          <i class="fa-solid fa-redo text-sm"></i>
          Take Another Test
        </button>

        <button
          @click="goToDashboard"
          class="flex-1 py-4 px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-home text-sm"></i>
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../supabase/supabase.js";
import { useRouter } from "vue-router";

const results = ref([]);
const loading = ref(true);
const router = useRouter();
const latestAttempt = ref(null);

const score = computed(() => latestAttempt.value?.score || 0);
const totalQuestions = computed(
  () => latestAttempt.value?.total_questions || 0,
);
const percentage = computed(() =>
  totalQuestions.value > 0
    ? Math.round((score.value / totalQuestions.value) * 100)
    : 0,
);

const fetchResults = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    // Get the latest test attempt
    const { data: attemptData, error: attemptError } = await supabase
      .from("test_attempts")
      .select(
        `
        *
      `,
      )
      .eq("user_id", user.id)
      .order("completed_at", { ascending: false })
      .limit(1)
      .single();

    if (attemptError) throw attemptError;
    console.log("Latest attempt:", attemptData);
    latestAttempt.value = attemptData;

    // Since we don't store individual answers, we'll show a summary
    results.value = [attemptData];
  } catch (error) {
    console.error("Error fetching results:", error);
  } finally {
    loading.value = false;
  }
};

const retakeTest = () => {
  router.push("/dashboard");
};

const goToDashboard = () => {
  router.push("/dashboard");
};

onMounted(fetchResults);
</script>

<style scoped>
/* Dark theme styles are inline in template */
</style>
