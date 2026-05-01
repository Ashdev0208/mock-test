<template>
  <div class="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-6">
    <div class="mb-10 text-center">
      <div class="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
        <i class="fa-solid fa-bolt text-white text-xl"></i>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Sign in to your account</h1>
    </div>

    <div class="w-full max-w-md bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 shadow-2xl">
      
      <div class="warning" v-if="warning[0]">
        <div :class="`flex items-center gap-3 px-4 py-3 mb-6 rounded-xl border ${warning[2]}`">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span class="text-sm font-medium">{{ warning[1] }}</span>
        </div>
      </div>

      <form class="space-y-6">
        <div>
          <label class="block text-sm font-semibold text-slate-300 mb-2">Email address</label>
          <input v-model="email" type="email" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition" />
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-300 mb-2">Password</label>
          <input v-model="password" type="password" class="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition" />
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <input type="checkbox" class="rounded bg-slate-950 border-slate-800 text-indigo-600 focus:ring-0" />
            <span class="text-sm text-slate-400">Remember me</span>
          </div>
          <a href="#" class="text-sm font-bold text-indigo-400 hover:text-indigo-300">Forgot password?</a>
        </div>

        <button @click.prevent="handleLogin()" class="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition shadow-lg shadow-indigo-600/20">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
        <div class="relative flex justify-center text-xs uppercase"><span class="bg-slate-900 px-4 text-slate-500 font-bold tracking-widest">Or continue with</span></div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button class="flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 py-2.5 rounded-xl text-white font-bold hover:bg-slate-800 transition">
          <i class="fa-brands fa-google text-lg text-red-500"></i> Google
        </button>
        <button class="flex items-center justify-center gap-3 bg-slate-950 border border-slate-800 py-2.5 rounded-xl text-white font-bold hover:bg-slate-800 transition">
          <i class="fa-brands fa-github text-lg text-white"></i> GitHub
        </button>
      </div>
    </div>

    <p class="mt-8 text-slate-500 font-medium">
      Not a member? <router-link to="/register" class="text-indigo-400 font-bold hover:underline">Sign up here</router-link>
    </p>
  </div>
</template>

<script setup >
import { ref } from 'vue'
import { supabase } from '../supabase/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form Data
const email = ref('')
const password = ref('');
const warning = ref([false,'','']);
const loading = ref(false)
const handleLogin = async () => {
  // Debug: Check if data is actually captured
  console.log("Logging in with:", email.value, password.value);

  if (!email.value || !password.value) {
    warning.value = [true, "Please fill in all fields", "bg-yellow-600/20 border-yellow-500/30 text-yellow-400"];
    return;
  }

  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) throw error;
    
    warning.value = [true, 'Login successful! Redirecting...', 'bg-green-600/20 border-green-500/30 text-green-400'];
    router.push('/dashboard', { meta: { requiresAuth: true } });
    email.value = '';
    password.value = '';

  } catch (error) {
    console.error("Auth Error:", error.message);
    warning.value = [true, error.message, "bg-red-600/20 border-red-500/30 text-red-400"];
  } finally {
    loading.value = false;
  }
};
</script>