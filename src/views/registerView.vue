<template>
  <div class="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center px-6 py-12">
    <div class="mb-8 text-center">
      <div class="bg-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
        <i class="fa-solid fa-user-plus text-white text-xl"></i>
      </div>
      <h1 class="text-3xl font-extrabold text-white tracking-tight">Create your account</h1>
      <p class="text-slate-400 mt-2">Join thousands of students mastering TOPIK.</p>
    </div>

    <div class="w-full max-w-md bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl">
      <div class="warning" v-if="warning[0]">
        <div :class="`flex items-center gap-3 px-4 py-3 mb-6 rounded-xl border ${warning[2]}`">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span class="text-sm font-medium">{{ warning[1] }}</span>
        </div>
      </div>
      <form class="space-y-5">
        
        <div>
          <label class="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
              <i class="fa-solid fa-user text-xs"></i>
            </span>
            <input type="text" v-model="fullName" placeholder="Shodiyor AshDev" class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition placeholder:text-slate-700" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
              <i class="fa-solid fa-envelope text-xs"></i>
            </span>
            <input type="email" v-model="email" placeholder="name@example.com" class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition placeholder:text-slate-700" />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-slate-300 mb-2">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500">
              <i class="fa-solid fa-lock text-xs"></i>
            </span>
            <input type="password" v-model="password" placeholder="••••••••" class="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition placeholder:text-slate-700" />
          </div>
        </div>


        <button 
    @click.prevent="handleRegister" 
    :disabled="loading"
    class="w-full cursor-pointer bg-indigo-600 mt-5 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition"
  >
    {{ loading ? 'Creating account...' : 'Create Account' }}
  </button>
      </form>

      <div class="relative my-8">
        <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-slate-800"></div></div>
        <div class="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold"><span class="bg-[#161d31] px-4 text-slate-500">Quick Sign Up</span></div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <button class="flex cursor-pointer items-center justify-center gap-3 bg-slate-950 border border-slate-800 py-3 rounded-xl text-white text-sm font-bold hover:bg-slate-800 transition">
          <i class="fa-brands fa-google text-red-500"></i> Google
        </button>
        <button class="flex cursor-pointer items-center justify-center gap-3 bg-slate-950 border border-slate-800 py-3 rounded-xl text-white text-sm font-bold hover:bg-slate-800 transition">
          <i class="fa-brands fa-github"></i> GitHub
        </button>
      </div>
    </div>

    <p class="mt-8 text-slate-500 font-medium">
      Already have an account? 
      <router-link to="/login" class="text-indigo-400 font-bold hover:text-indigo-300 transition ml-1">
        Sign in here
      </router-link>
    </p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase/supabase.js'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form data
const email = ref('')
const password = ref('')
const fullName = ref('')

const warning = ref([false, '', ''])
const loading = ref(false)

const handleRegister = async () => {
  // Validation
  if (!email.value || !password.value || !fullName.value) {
    warning.value = [
      true,
      'Please fill in all fields.',
      'bg-yellow-600/20 border-yellow-500/30 text-yellow-400'
    ]
    return
  }

  try {
    loading.value = true

    // 🔐 Signup
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: fullName.value,
          role: 'student'
        }
      }
    })

    if (error) throw error

    // ⚠️ Email confirmation case
    // (most common behavior → user is NOT immediately available)
    if (!data.session) {
      warning.value = [
        true,
        '📩 Check your email to confirm your account before logging in.',
        'bg-yellow-600/20 border-yellow-500/30 text-yellow-400'
      ]

      resetForm()
      return
    }

    // ✅ If auto-login is enabled (rare case)
    warning.value = [
      true,
      'Account created successfully!',
      'bg-green-600/20 border-green-500/30 text-green-400'
    ]

    router.push('/dashboard')

    resetForm()

  } catch (err) {
    console.error('Auth Error:', err.message)

    warning.value = [
      true,
      err.message,
      'bg-red-600/20 border-red-500/30 text-red-400'
    ]
  } finally {
    loading.value = false
  }
}

// 🧼 Clean reset function
const resetForm = () => {
  email.value = ''
  password.value = ''
  fullName.value = ''
}
</script>