<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-3xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-center mb-8">Mock Test</h1>

      <div v-if="loading" class="text-center py-12">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"
        ></div>
        <p class="mt-4 text-gray-600">Loading questions...</p>
      </div>

      <div v-else-if="questions.length > 0" class="space-y-6">
        <div
          v-for="(question, index) in questions"
          :key="question.id"
          class="bg-white p-6 rounded-lg shadow-md"
        >
          <p class="text-lg font-semibold mb-4">
            <span class="text-indigo-600">Q{{ index + 1 }}:</span>
            {{ question.question_text }}
          </p>
          <div class="space-y-2">
            <label
              v-for="option in question.options"
              :key="option.id"
              class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
            >
              <input
                type="radio"
                :name="'question-' + question.id"
                :value="option.id"
                v-model="answers[question.id]"
                class="h-4 w-4 text-indigo-600"
              />
              <span class="ml-3">{{ option.option_text }}</span>
            </label>
          </div>
        </div>

        <button
          @click="submitTest"
          :disabled="submitting"
          class="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {{ submitting ? "Submitting..." : "Submit Test" }}
        </button>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-lg shadow-md">
        <p class="text-gray-600">No questions available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { supabase } from "../supabase/supabase.js";
import { useRouter } from "vue-router";

const questions = ref([]);
const answers = ref({});
const loading = ref(true);
const submitting = ref(false);
const router = useRouter();

const fetchQuestions = async () => {
  const { data, error } = await supabase
    .from("questions")
    .select("*, options(*)")
    .order("id");

  if (error) {
    console.error("Error fetching questions:", error);
  } else {
    questions.value = data;
  }
  loading.value = false;
};

const submitTest = async () => {
  submitting.value = true;
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const answersToSave = Object.entries(answers.value).map(
    ([questionId, optionId]) => ({
      user_id: user.id,
      question_id: parseInt(questionId),
      selected_option_id: optionId,
    }),
  );

  const { error } = await supabase.from("user_answers").insert(answersToSave);

  if (error) {
    console.error("Error saving answers:", error);
  } else {
    router.push("/result");
  }
  submitting.value = false;
};

onMounted(fetchQuestions);
</script>

<style scoped>
.mock-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}
.question {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
}
label {
  display: block;
  padding: 5px;
  cursor: pointer;
}
button {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 20px;
}
button:disabled {
  background: #ccc;
}
</style>
