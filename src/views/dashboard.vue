<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased">
    <header class="max-w-7xl mx-auto px-8 py-10 flex justify-between items-end">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <p class="text-slate-400 mt-2 font-medium">
          Welcome back, {{ profile?.full_name || "Student" }}. Ready for today's
          challenge?
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

    <div v-if="error" class="max-w-7xl mx-auto px-8 mb-8">
      <div
        class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200"
      >
        <p class="font-semibold">Unable to load dashboard data</p>
        <p class="mt-1 text-sm">{{ error }}</p>
      </div>
    </div>

    <main
      class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20"
    >
      <div class="lg:col-span-8 space-y-8">
        <div
          class="relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-12 text-center shadow-2xl"
        >
          <div
            class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"
          ></div>

          <div class="relative z-10 flex flex-col items-center">
            <div
              class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 shadow-inner"
            >
              <i class="fa-regular fa-clock text-slate-500 text-2xl"></i>
            </div>
            <h2 class="text-3xl font-bold mb-4">
              Next challenge coming soon...
            </h2>
            <p class="text-slate-400 max-w-sm mx-auto leading-relaxed">
              Admin is currently preparing your next vocab sprint. Check back
              later today!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"
          >
            <p
              class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
              Total Mocks
            </p>
            <p class="text-2xl font-bold">{{ stats.totalMocks }}</p>
          </div>
          <div
            class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center"
          >
            <p
              class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2"
            >
              Total Vocab
            </p>
            <p class="text-2xl font-bold">{{ stats.totalVocab }}</p>
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
            My Performance
          </h3>

          <div class="space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2">
                <span class="text-3xl font-bold">{{ stats.avgAccuracy }}%</span>
                <span class="text-slate-500 text-xs font-bold uppercase"
                  >Avg. Accuracy</span
                >
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
                  Day Streak
                </p>
              </div>
              <div
                class="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg border border-orange-500/20"
              >
                <i class="fa-solid fa-fire-flame-curved text-sm"></i>
                <span class="text-xs font-bold uppercase">Active</span>
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
              >Global Broadcast</span
            >
          </div>
          <p class="text-lg font-bold leading-snug italic">
            "Keep up the great work! New TOPIK level II vocab cards are out
            now."
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
              <span class="text-slate-300 font-bold group-hover:text-white"
                >Rankings</span
              >
              <i
                class="fa-solid fa-chevron-right text-[10px] text-slate-600"
              ></i>
            </a>
            <a
              href="#"
              class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition"
            >
              <span class="text-slate-300 font-bold group-hover:text-white"
                >Archive</span
              >
              <i
                class="fa-solid fa-chevron-right text-[10px] text-slate-600"
              ></i>
            </a>
            <a
              href="#"
              class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition"
            >
              <span class="text-slate-300 font-bold group-hover:text-white"
                >Support</span
              >
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
            <i class="fa-solid fa-right-from-bracket"></i> Logout
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

const router = useRouter();
const profile = ref(null);
const stats = ref({
  totalMocks: 0,
  totalVocab: 0,
  avgAccuracy: 0,
  streak: 0,
});
const loading = ref(false);
const error = ref(null);

const getUserData = async () => {
  loading.value = true;
  error.value = null;

  try {
    const { data: userResponse, error: userError } =
      await supabase.auth.getUser();
    if (userError) throw userError;

    const user = userResponse.user;
    if (!user) throw new Error("Not authenticated. Please log in again.");

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, role, total_mocks, total_vocab, accuracy, streak")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) throw profileError;

    profile.value = profileData || {
      full_name: user.email?.split("@")[0] || "Student",
      role: "student",
    };

    stats.value.totalMocks = profileData?.total_mocks ?? 0;
    stats.value.totalVocab = profileData?.total_vocab ?? 0;
    stats.value.avgAccuracy = profileData?.accuracy ?? 0;
    stats.value.streak = profileData?.streak ?? 0;

    const questionResult = await supabase
      .from("questions")
      .select("id", { count: "exact", head: true });

    if (!questionResult.error && typeof questionResult.count === "number") {
      stats.value.totalMocks = questionResult.count;
    }

    const optionResult = await supabase
      .from("options")
      .select("id", { count: "exact", head: true });

    if (!optionResult.error && typeof optionResult.count === "number") {
      stats.value.totalVocab = optionResult.count;
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

onMounted(getUserData);
</script>
