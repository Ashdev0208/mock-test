<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased">
    <Navbar />
    <header class="max-w-7xl mx-auto px-8 py-10 flex justify-between items-end">
      <div>
        <!-- starting page -->
        <h1 class="text-4xl font-extrabold tracking-tight">
          {{ lang.t("dashboard.title") }}
        </h1>
        <p class="text-slate-400 mt-2 font-medium">
          {{
            lang.t("dashboard.welcome", {
              name: profile?.full_name || "Student",
            })
          }}
        </p>
      </div>
      <div class="hidden md:block">
        <span
          class="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-bold"
        >
          <i class="fa-solid fa-crown mr-2"></i> Premium Member
        </span>
      </div>
    </header>
    <div v-if="loading" class="max-w-7xl mx-auto px-8">
      <div class="flex items-center justify-center py-20">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
        ></div>
        <p class="ml-4 text-slate-400">
          {{ lang.t("dashboard.loading_dashboard") }}
        </p>
      </div>
    </div>
    <!-- error -->
    <div v-if="!loading && error" class="max-w-7xl mx-auto px-8 mb-8">
      <div
        class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200"
      >
        <p class="font-semibold">{{ lang.t("dashboard.unable_load") }}</p>
        <p class="mt-1 text-sm">{{ error }}</p>
      </div>
    </div>
    <!-- showing mock content -->
    <main
      v-if="!loading"
      class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20"
    >
      <div class="lg:col-span-8 space-y-8">
        <div
          class="relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl"
        >
          <!-- Decorative Glow -->
          <div
            class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"
          ></div>

          <div class="relative z-10">
            <!-- EMPTY STATE: Centered column -->
            <div
              v-if="stats.mock.length === 0"
              class="flex flex-col items-center text-center"
            >
              <div
                class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 shadow-inner"
              >
                <i class="fa-regular fa-clock text-slate-500 text-2xl"></i>
              </div>
              <h2 class="text-3xl font-bold mb-4 text-white">
                {{ lang.t("dashboard.next_challenge") }}
              </h2>
              <p class="text-slate-400 max-w-sm mx-auto leading-relaxed">
                {{ lang.t("dashboard.check_back_later") }}
              </p>
            </div>
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <div
                v-for="card in stats.mock"
                :key="card.id"
                class="relative group overflow-hidden bg-white/5 border border-white/10 hover:border-slate-500/50 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] flex flex-col justify-between"
              >
                <!-- Category & Title -->
                <div>
                  <div class="flex justify-between items-start mb-4">
                    <span
                      class="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]"
                    >
                      {{ card.category || "General" }}
                    </span>
                    <span
                      v-if="card.is_premium"
                      class="text-[10px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-bold"
                    >
                      PREMIUM
                    </span>
                  </div>
                  <h5
                    class="text-xl font-bold text-white group-hover:text-slate-300 transition-colors line-clamp-2"
                  >
                    {{ card.title }}
                  </h5>
                </div>

                <!-- Stats & Button Wrapper -->
                <div class="mt-6">
                  <div
                    class="flex items-center gap-4 mb-6 text-slate-400 text-sm"
                  >
                    <div class="flex items-center gap-1.5">
                      <i class="fa-regular fa-clock opacity-50"></i>
                      {{ card.duration_minutes }}m
                    </div>
                    <div class="flex items-center gap-1.5">
                      <i class="fa-solid fa-graduation-cap opacity-50"></i>
                      TOPIK
                    </div>
                  </div>

                  <button
                    @click="startMock(card.id)"
                    class="w-full py-3 px-4 bg-white/10 hover:bg-purple-600 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 group-active:scale-95 shadow-sm"
                  >
                    {{ lang.t("dashboard.start_practice") }}
                    <i class="fa-solid fa-play text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"
          >
            <p
              class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
              {{ lang.t("dashboard.total_mocks") }}
            </p>
            <p
              class="my-2 bg-green-600/20 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs font-bold"
            >
              {{ lang.t("common.free") }}
            </p>
            <p class="text-2xl font-bold">{{ stats.totalMocks }}</p>
          </div>
          <div
            class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"
          >
            <p
              class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
              {{ lang.t("dashboard.entered_mocks") }}
            </p>
            <div class="details my-3 flex justify-center gap-2">
              <span
                class="mt-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ lang.t("common.premium") }}
              </span>
              <span
                class="bg-green-600/20 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs font-bold"
              >
                {{ lang.t("common.free") }}
              </span>
            </div>
            <p class="text-2xl font-bold">{{ stats.attempts }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div
          class="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 shadow-xl"
        >
          <h3
            class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6"
          >
            {{ lang.t("dashboard.my_performance") }}
          </h3>

          <div class="space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2">
                <span class="text-3xl font-bold">{{ stats.avgAccuracy }}%</span>
                <span class="text-slate-500 text-xs font-bold uppercase">{{
                  lang.t("dashboard.avg_accuracy")
                }}</span>
              </div>
              <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div
                  class="w-full h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  :style="{ width: `${Math.min(stats.avgAccuracy, 100)}%` }"
                ></div>
              </div>
            </div>

            <div class="flex justify-between items-center">
              <div>
                <span class="text-3xl font-bold">{{ stats.streak }}</span>
                <p class="text-slate-500 text-xs font-bold uppercase mt-1">
                  {{ lang.t("dashboard.day_streak") }}
                </p>
              </div>
              <div
                class="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg border border-orange-500/20"
              >
                <i class="fa-solid fa-fire-flame-curved text-sm"></i>
                <span class="text-xs font-bold uppercase">{{
                  lang.t("dashboard.active")
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-indigo-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-600/20 transition hover:scale-[1.02] cursor-pointer"
        >
          <div class="flex items-center gap-2 mb-4">
            <div
              class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            ></div>
            <span
              class="text-indigo-200 text-[10px] font-bold uppercase tracking-widest"
              >{{ lang.t("dashboard.global_broadcast") }}</span
            >
          </div>
          <p class="text-lg font-bold leading-snug italic">
            {{ globalBroadcast }}
          </p>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8">
          <h3
            class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4"
          >
            Quick Links
          </h3>
          <div class="space-y-1">
            <a
              href="#"
              class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition"
            >
              <span class="text-slate-300 font-bold group-hover:text-white">{{
                lang.t("dashboard.rankings")
              }}</span>
              <i
                class="fa-solid fa-chevron-right text-[10px] text-slate-600"
              ></i>
            </a>
            <a
              href="#"
              class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition"
            >
              <span class="text-slate-300 font-bold group-hover:text-white">{{
                lang.t("dashboard.archive")
              }}</span>
              <i
                class="fa-solid fa-chevron-right text-[10px] text-slate-600"
              ></i>
            </a>
            <a
              href="#"
              class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition"
            >
              <span class="text-slate-300 font-bold group-hover:text-white">{{
                lang.t("dashboard.support")
              }}</span>
              <i
                class="fa-solid fa-chevron-right text-[10px] text-slate-600"
              ></i>
            </a>
          </div>
        </div>
        <button class="w-full" @click="handleLogout">
          <div
            class="flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/20 w-full"
          >
            <i class="fa-solid fa-right-from-bracket"></i>
            {{ lang.t("dashboard.logout") }}
          </div>
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "@/supabase/supabase.js";
import { useLangStore } from "../stores/lang.js";
import Navbar from "../components/navbar.vue";

const router = useRouter();
const lang = useLangStore();

const profile = ref({
  full_name: "",
  role: "student",
});

const stats = ref({
  totalMocks: 0,
  mock: [],
  attempts: 0,
  avgAccuracy: 0,
  streak: 0,
  weekly_tests: 0,
});
const globalBroadcast = ref(
  "Keep up the great work! New TOPIK level II vocab cards are out now.",
);

const loading = ref(false);
const error = ref(null);

const getUserData = async () => {
  loading.value = true;
  error.value = null;

  try {
    // 🔐 Get authenticated user
    const { data: userResponse, error: userError } =
      await supabase.auth.getUser();

    if (userError) throw userError;

    const user = userResponse.user;
    if (!user) throw new Error("Not authenticated. Please log in again.");

    // 📦 Get profile data
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    profile.value = {
      full_name: profileData?.display_name || "Student",
      role: profileData?.role || "student",
    };

    stats.value = {
      totalMocks: profileData?.total_mocks ?? 0,
      mock: [],
      attempts: 0,
      avgAccuracy: profileData?.accuracy ?? 0,
      streak: profileData?.streak_count ?? 0,
      weekly_tests: 0,
    };

    const { data: testsData, error: testsError } = await supabase
      .from("tests")
      .select("*");

    if (testsError) {
      console.error("Error fetching tests:", testsError);
      stats.value.mock = [];
    } else {
      stats.value.mock = testsData || [];
      if (!profileData?.total_mocks) {
        stats.value.totalMocks = stats.value.mock.length;
      }
    }

    const { data: attemptsRecords, error: attemptsError } = await supabase
      .from("test_attempts")
      .select("score,total_questions")
      .eq("user_id", user.id);

    if (attemptsError) {
      console.error("Error fetching attempt records:", attemptsError);
    } else if (attemptsRecords) {
      stats.value.attempts = attemptsRecords.length;
      const totalScore = attemptsRecords.reduce(
        (sum, attempt) => sum + (attempt.score ?? 0),
        0,
      );
      const totalQuestions = attemptsRecords.reduce(
        (sum, attempt) => sum + (attempt.total_questions ?? 0),
        0,
      );
      if (totalQuestions > 0) {
        stats.value.avgAccuracy = Math.round(
          (totalScore / totalQuestions) * 100,
        );
      }
    }

    try {
      const { data: broadcastData, error: broadcastError } = await supabase
        .from("broadcasts")
        .select("message")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (!broadcastError && broadcastData?.message) {
        globalBroadcast.value = broadcastData.message;
      }
    } catch (broadcastFetchError) {
      console.debug("Global broadcast fetch failed:", broadcastFetchError);
    }
  } catch (err) {
    error.value = err.message || "Error loading dashboard data.";
    console.error("Dashboard data error:", err);
  } finally {
    loading.value = false;
  }
};

const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

const startMock = (testId) => {
  router.push(`/mock/${testId}`);
};

onMounted(getUserData);
</script>
