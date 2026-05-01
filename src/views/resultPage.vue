<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Your Results</h1>

      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Loading results...</p>
      </div>

      <div v-else>
        <div class="bg-white p-8 rounded-lg shadow-md text-center mb-8">
          <h2 class="text-2xl font-semibold mb-2">
            Score: {{ score }} / {{ totalQuestions }}
          </h2>
          <p
            class="text-5xl font-bold"
            :class="percentage >= 70 ? 'text-green-600' : 'text-red-600'"
          >
            {{ percentage }}%
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <h3 class="text-xl font-semibold p-6 border-b">
            Review Your Answers
          </h3>
          <div
            v-for="(result, index) in results"
            :key="result.question_id"
            class="p-6 border-b last:border-b-0"
          >
            <p class="font-medium mb-2">
              <span class="text-indigo-600">Q{{ index + 1 }}:</span>
              {{ result.question_text }}
            </p>
            <p class="ml-4">
              Your answer:
              <span
                :class="
                  result.is_correct
                    ? 'text-green-600 font-semibold'
                    : 'text-red-600 font-semibold'
                "
              >
                {{ result.selected_option_text }}
              </span>
            </p>
            <p v-if="!result.is_correct" class="ml-4 text-green-600">
              Correct answer: {{ result.correct_option_text }}
            </p>
          </div>
        </div>

        <button
          @click="retakeTest"
          class="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Retake Test
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

const score = computed(() => results.value.filter((r) => r.is_correct).length);
const totalQuestions = computed(() => results.value.length);
const percentage = computed(() =>
  totalQuestions.value > 0
    ? Math.round((score.value / totalQuestions.value) * 100)
    : 0,
);

const fetchResults = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_answers")
    .select(
      `
      question_id,
      is_correct,
      questions!inner(question_text, correct_option_id),
      selected_options!inner(option_text)
    `,
    )
    .eq("user_id", user.id)
    .order("question_id");

  if (error) {
    console.error("Error fetching results:", error);
  } else {
    results.value = data.map((r) => ({
      question_id: r.question_id,
      question_text: r.questions.question_text,
      selected_option_text: r.selected_options.option_text,
      correct_option_id: r.questions.correct_option_id,
      is_correct: r.is_correct,
    }));
  }
  loading.value = false;
};

const retakeTest = () => {
  router.push("/mock");
};

onMounted(fetchResults);
</script>

<style scoped>
.result-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
.score-card {
  text-align: center;
  padding: 30px;
  background: #f5f5f5;
  border-radius: 10px;
  margin-bottom: 20px;
}
.percentage {
  font-size: 2em;
  color: #42b983;
}
.answer-item {
  padding: 15px;
  border-bottom: 1px solid #ddd;
}
.correct {
  color: green;
}
.wrong {
  color: red;
}
button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
</style>
