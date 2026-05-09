<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased">
    <header class="max-w-7xl mx-auto px-8 py-10">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">TOPIK Test</h1>

        <p class="text-slate-400 mt-2 font-medium">
          {{ testTitle || "Practice Test" }}
        </p>
      </div>
    </header>

    <!-- Loading -->
    <div v-if="loading" class="max-w-7xl mx-auto px-8">
      <div class="flex items-center justify-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>

        <p class="ml-4 text-slate-400">Loading questions...</p>
      </div>
    </div>

    <!-- Questions -->
    <div v-else-if="questions.length > 0" class="max-w-7xl mx-auto px-8 pb-20">
      <div class="space-y-8">
        <div
          v-for="(question, questionIndex) in questions"
          :key="question.id"
          class="relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-lg shadow-slate-800/10"
        >
          <div
            class="absolute -top-12 -right-12 w-32 h-32 bg-indigo-600/10 blur-[50px] rounded-full"
          ></div>

          <div class="relative z-10">
            <!-- Question -->
            <p class="text-xl font-bold mb-6 text-white">
              <span class="text-indigo-400"> Q{{ questionIndex + 1 }}: </span>

              {{ question.question_text }}
            </p>

            <!-- Passage -->
            <div v-if="question.passage" class="mb-6">
              <span class="text-indigo-400 block font-bold text-lg mb-2">
                Passage:
              </span>

              <p class="text-slate-300 leading-relaxed">
                {{ question.passage }}
              </p>
            </div>

            <!-- Options -->
            <div
              class="space-y-3"
              v-for="(option, optionIndex) in question.options"
              :key="optionIndex"
            >
              <label
                class="flex items-center p-4 border border-slate-700 rounded-xl cursor-pointer hover:bg-slate-800/50 hover:border-slate-600 transition-all"
              >
                <input
                  type="radio"
                  :name="'question-' + question.id"
                  :value="optionIndex"
                  v-model="answers[question.id]"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />

                <span class="ml-4 text-slate-300">
                  {{ option }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <button
          @click.prevent="submitTest"
          :disabled="submitting"
          class="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 disabled:bg-slate-600 shadow-lg shadow-indigo-600/20"
        >
          <span v-if="submitting"> Submitting... </span>

          <span v-else> Submit Test </span>

          <i class="fa-solid fa-paper-plane text-sm"></i>
        </button>
      </div>
    </div>

    <!-- No Questions -->
    <div v-else class="max-w-7xl mx-auto px-8 pb-20">
      <div class="text-center py-20">
        <div
          class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 shadow-inner mx-auto"
        >
          <i class="fa-regular fa-question text-slate-500 text-2xl"></i>
        </div>

        <h2 class="text-3xl font-bold mb-4 text-white">
          No questions available
        </h2>

        <p class="text-slate-400 max-w-sm mx-auto leading-relaxed">
          This test doesn't have any questions yet.
        </p>

        <button
          @click="router.push('/dashboard')"
          class="mt-6 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase/supabase.js";
import { useRouter, useRoute } from "vue-router";

const questions = ref([]);
const questionAnswers = ref({});
const answers = ref({});
const loading = ref(true);
const submitting = ref(false);
const testTitle = ref("");

const router = useRouter();
const route = useRoute();

const fetchQuestions = async () => {
  const testId = route.params.id;

  if (!testId) {
    router.push("/dashboard");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .eq("id", testId)
      .single();

    if (error) throw error;

    testTitle.value = data.title || "Practice Test";
    questions.value = data.data || [];
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Failed to load test.");
  } finally {
    loading.value = false;
  }
};

const submitTest = async () => {
  submitting.value = true;

  try {
    const testId = route.params.id;

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    let correctAnswers = 0;
    let answeredQuestions = 0;

    // Calculate score
    for (const question of questions.value) {
      const selectedAnswer = answers.value[question.id];
      if (selectedAnswer !== undefined && selectedAnswer !== null) {
        answeredQuestions++;
        if (selectedAnswer + 1 === question.correct_answer_index) {
          correctAnswers++;
        }
      }
    }

    // Prevent empty submissions
    if (answeredQuestions === 0) {
      alert("Please answer at least one question.");

      submitting.value = false;
      return;
    }

    // Save test attempt
    const { error: attemptError } = await supabase
      .from("test_attempts")
      .insert({
        user_id: user.id,
        test_id: testId,
        score: correctAnswers,
        total_questions: questions.value.length,
      });

    if (attemptError) throw attemptError;

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("points, streak_count")
      .eq("id", user.id)
      .single();

    if (profileError) throw profileError;

    const newStreak = (profileData.streak_count || 0) + 1;

    // Update profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        streak_count: newStreak,
      })
      .eq("id", user.id);

    if (updateError) throw updateError;

    // Save local result
    localStorage.setItem(
      "testResult",
      JSON.stringify({
        score: correctAnswers,
        total: questions.value.length,
        percentage: Math.round((correctAnswers / questions.value.length) * 100),
      }),
    );

    // Navigate
    router.push("/result");
  } catch (error) {
    console.error("Error submitting test:", error);

    alert(error.message || "Error submitting test.");
  } finally {
    submitting.value = false;
  }
};

onMounted(() => {
  fetchQuestions();
});
</script>

<style scoped>
/* Optional custom styles */
</style>
