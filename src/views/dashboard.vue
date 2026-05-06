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
          class="bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-full text-sm font-bold">
          <i class="fa-solid fa-crown mr-2"></i> Premium Member
        </span>
      </div>
    </header>
    <!-- error -->
    <div v-if="error" class="max-w-7xl mx-auto px-8 mb-8">
      <div class="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
        <p class="font-semibold">Unable to load dashboard data</p>
        <p class="mt-1 text-sm">{{ error }}</p>
      </div>
    </div>

    <main class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-20">
      <div class="lg:col-span-8 space-y-8">
        <div
          class="relative overflow-hidden bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-12 text-center shadow-2xl">
          <div class="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] rounded-full"></div>

          <div class="relative z-10 flex flex-col items-center">
            <div class="hidden" v-if="stats.attempts > 0">
              <div
                class="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 border border-slate-800 shadow-inner">
                <i class="fa-regular fa-clock text-slate-500 text-2xl"></i>
              </div>
              <h2 class="text-3xl font-bold mb-4">
                Next challenge coming soon...
              </h2>
              <p class="text-slate-400 max-w-sm mx-auto leading-relaxed">
                Admin is currently preparing your next TOPIK mock. Check back
                later today!
              </p>
            </div>
            <div class="card" v-for="card in stats.attempts" >
              <div class="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-base shadow-xs">
                  <h5 class="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">Streamlining your design
                    process today.</h5>
             
                <p class="mb-6 text-body">In today’s fast-paced digital landscape, fostering seamless collaboration
                  among Developers and IT Operations.</p> <p href="#"
                  class="inline-flex items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                  Read more <svg class="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg> </p>
              </div>

            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center">
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
              Total Mocks
            <p
              class="my-2 bg-green-600/20 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs font-bold ">
              free</p>
            </p>
            <p class="text-2xl font-bold">{{ stats.totalMocks }}</p>
          </div>
          <div class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl text-center">
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">
              entered Mocks
            <div class="details my-3"><span
                class="mt-2 bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 px-2 py-1 rounded-full text-xs font-bold ">premium</span><span
                class="bg-green-600/20 text-green-400 border border-green-500/20 px-2 py-1 rounded-full text-xs font-bold">free</span>
            </div>
            </p>
            <p class="text-2xl font-bold">{{ stats.streak }}</p>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 space-y-6">
        <div class="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8 shadow-xl">
          <h3 class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6">
            My Performance
          </h3>

          <div class="space-y-8">
            <div>
              <div class="flex justify-between items-end mb-2">
                <span class="text-3xl font-bold">{{ stats.avgAccuracy }}%</span>
                <span class="text-slate-500 text-xs font-bold uppercase">Avg. Accuracy</span>
              </div>
              <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                <div class="w-full h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  :style="{ width: `${Math.min(stats.avgAccuracy, 100)}%` }"></div>
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
                class="flex items-center gap-2 bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg border border-orange-500/20">
                <i class="fa-solid fa-fire-flame-curved text-sm"></i>
                <span class="text-xs font-bold uppercase">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-indigo-600 rounded-[2rem] p-8 shadow-xl shadow-indigo-600/20 transition hover:scale-[1.02] cursor-pointer">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span class="text-indigo-200 text-[10px] font-bold uppercase tracking-widest">Global Broadcast</span>
          </div>
          <p class="text-lg font-bold leading-snug italic">
            "Keep up the great work! New TOPIK level II vocab cards are out
            now."
          </p>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 rounded-[2rem] p-8">
          <h3 class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
            Quick Links
          </h3>
          <div class="space-y-1">
            <a href="#" class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition">
              <span class="text-slate-300 font-bold group-hover:text-white">Rankings</span>
              <i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i>
            </a>
            <a href="#" class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition">
              <span class="text-slate-300 font-bold group-hover:text-white">Archive</span>
              <i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i>
            </a>
            <a href="#" class="flex items-center justify-between group p-3 rounded-xl hover:bg-slate-800 transition">
              <span class="text-slate-300 font-bold group-hover:text-white">Support</span>
              <i class="fa-solid fa-chevron-right text-[10px] text-slate-600"></i>
            </a>
          </div>
        </div>
        <button class="w-full" @click="handleLogout">
          <div
            class="flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-red-600/20 w-full">
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

const profile = ref({
  full_name: "",
  role: "student",
});

const stats = ref({
  totalMocks: 0,
  attempts: 0,
  avgAccuracy: 0,
  streak: 0,
  weekly_tests: 0,
});

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

    // 📦 Get profile (WITHOUT full_name ❗)
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("display_name, points, level, streak_count, is_premium")
      .eq("id", user.id)
      .maybeSingle();
    console.log(profileData);

    if (profileError) throw profileError;

    // 👤 Merge auth + profile data
    profile.value = {
      full_name: profileData?.display_name || "Student",
      role: profileData?.role || "student",
    };

    // 📊 Stats from profile
    stats.value = {
      totalMocks: profileData?.total_mocks ?? 0,
      avgAccuracy: profileData?.accuracy ?? 0,
      streak: profileData?.streak_count ?? 0,
    };

    // 📈 System-wide stats (optional override)
    const { count: questionCount, error: qError } = await supabase
      .from("tests")
      .select("id", { count: "exact", head: true });

    if (!qError && typeof questionCount === "number") {
      stats.value.totalMocks = questionCount;
    }

    const { count: attempts, error: oError } = await supabase
      .from("test_attempts")
      .select("id", { count: "exact", head: true });

    if (!oError && typeof attempts === "number") {
      stats.value.attempts = attempts;
    }
    const { count: premium_test, error: PError } = await supabase
      .from("weekly_tests")
      .select("id", { count: "exact", head: true });

    if (!PError && typeof premium_test === "number") {
      stats.value.weekly_tests = premium_test;
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
