<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased pb-20">
    <Navbar />

    <header class="max-w-7xl mx-auto px-8 py-10 flex flex-col lg:flex-row justify-between items-start gap-6">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">Admin Console</h1>
        <p class="text-slate-400 mt-2 font-medium">
          Upload mocks, manage premium access, and control user accounts.
        </p>
      </div>

      <div class="flex flex-col gap-3 w-full lg:w-auto">
        <button
          @click="resetForm()"
          class="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold transition shadow-lg shadow-indigo-600/20"
        >
          <i class="fa-solid fa-plus mr-2"></i> New Mock
        </button>
        <button
          @click="fetchAdminData"
          class="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold transition border border-slate-700"
        >
          <i class="fa-solid fa-arrows-rotate mr-2"></i> Refresh Data
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 space-y-10">
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] shadow-xl">
          <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Total Mock Tests</p>
          <p class="text-4xl font-bold">{{ stats.totalMocks }}</p>
          <p class="text-slate-400 mt-3 text-sm">Free and premium mocks available.</p>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] shadow-xl">
          <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Premium Users</p>
          <p class="text-4xl font-bold">{{ stats.premiumUsers }}</p>
          <p class="text-slate-400 mt-3 text-sm">Users with paid premium access.</p>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] shadow-xl">
          <p class="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Total Users</p>
          <p class="text-4xl font-bold">{{ stats.totalUsers }}</p>
          <p class="text-slate-400 mt-3 text-sm">Registered accounts in the system.</p>
        </div>
      </div>

      <section class="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div class="xl:col-span-2 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-bold">Mock Upload</h2>
              <p class="text-slate-400 text-sm mt-1">Create free or premium mock tests and publish them live.</p>
            </div>
            <span class="text-xs uppercase tracking-[0.3em] text-slate-500">{{ form.isEditing ? 'Editing' : 'Create' }}</span>
          </div>

          <form @submit.prevent="saveMock" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-slate-300 text-sm font-semibold mb-2">Title</label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Mock title"
                  class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>

              <div>
                <label class="block text-slate-300 text-sm font-semibold mb-2">Category</label>
                <input
                  v-model="form.category"
                  type="text"
                  placeholder="e.g. Reading, Listening"
                  class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-slate-300 text-sm font-semibold mb-2">Duration (minutes)</label>
                <input
                  v-model.number="form.duration"
                  type="number"
                  min="1"
                  placeholder="30"
                  class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  required
                />
              </div>
              <div class="md:col-span-2">
                <label class="block text-slate-300 text-sm font-semibold mb-2">Premium</label>
                <div class="flex items-center gap-4">
                  <button
                    type="button"
                    :class="form.is_premium ? 'bg-emerald-500 text-slate-950' : 'bg-slate-950 text-slate-300 border border-slate-800'"
                    class="px-5 py-3 rounded-2xl font-semibold transition"
                    @click="form.is_premium = true"
                  >
                    Premium
                  </button>
                  <button
                    type="button"
                    :class="!form.is_premium ? 'bg-indigo-600 text-white' : 'bg-slate-950 text-slate-300 border border-slate-800'"
                    class="px-5 py-3 rounded-2xl font-semibold transition"
                    @click="form.is_premium = false"
                  >
                    Free
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-slate-300 text-sm font-semibold mb-2">Questions JSON</label>
              <textarea
                v-model="form.rawData"
                rows="10"
                placeholder='[ { "question_text": "...", "options": ["A","B"], "correct_answer_index": 1 } ]'
                class="w-full bg-slate-950 border border-slate-800 rounded-3xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 font-mono"
                required
              ></textarea>
              <p class="text-slate-500 text-xs mt-2">Paste a JSON array of question objects. Use <code class="bg-slate-900 px-1 rounded">audio_url</code> for listening questions.</p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div>
                <p class="text-slate-400 text-sm">Saved mocks can be edited or removed below.</p>
              </div>
              <div class="flex gap-3">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-6 py-3 rounded-2xl border border-slate-700 hover:bg-slate-800 transition"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  class="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 transition font-semibold"
                  :disabled="saving"
                >
                  {{ saving ? 'Saving...' : form.isEditing ? 'Update Mock' : 'Publish Mock' }}
                </button>
              </div>
            </div>
          </form>

          <div v-if="statusMessage" class="mt-6 rounded-2xl p-4 bg-slate-950 border border-slate-800 text-sm text-slate-200">
            {{ statusMessage }}
          </div>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
          <h2 class="text-2xl font-bold mb-4">User Management</h2>
          <div class="max-h-[520px] overflow-y-auto">
            <table class="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3">User</th>
                  <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-center">Premium</th>
                  <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-center">Role</th>
                  <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in users"
                  :key="user.id"
                  class="bg-slate-950/80 border border-slate-800 rounded-3xl hover:bg-slate-900 transition"
                >
                  <td class="px-4 py-4">
                    <div class="flex flex-col gap-1">
                      <span class="font-semibold">{{ user.display_name || 'Unknown' }}</span>
                      <span class="text-slate-500 text-xs">{{ user.email || 'no-email' }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <button
                      @click="togglePremium(user)"
                      class="px-3 py-1 rounded-full text-xs font-semibold transition"
                      :class="user.premium ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'"
                    >
                      {{ user.premium ? 'Yes' : 'No' }}
                    </button>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <select
                      v-model="user.role"
                      @change="updateUserRole(user)"
                      class="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td class="px-4 py-4 text-right flex justify-end gap-2">
                    <button
                      @click="deleteUser(user)"
                      class="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold">Mock Library</h2>
            <p class="text-slate-400 text-sm mt-1">Free mocks and premium mocks managed from one place.</p>
          </div>
          <span class="text-slate-500 text-xs uppercase tracking-[0.3em]">{{ tests.length }} items</span>
        </div>

        <div class="max-h-[520px] overflow-y-auto">
          <table class="min-w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr>
                <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3">Title</th>
                <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-center">Category</th>
                <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-center">Premium</th>
                <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-center">Duration</th>
                <th class="text-slate-400 text-[11px] uppercase tracking-[0.3em] py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="mock in tests"
                :key="mock.id"
                class="bg-slate-950/70 border border-slate-800 rounded-3xl hover:bg-slate-900 transition"
              >
                <td class="px-4 py-4 font-semibold">{{ mock.title }}</td>
                <td class="px-4 py-4 text-center text-slate-400">{{ mock.category || 'General' }}</td>
                <td class="px-4 py-4 text-center">
                  <span
                    :class="mock.is_premium ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'"
                    class="inline-flex px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {{ mock.is_premium ? 'Premium' : 'Free' }}
                  </span>
                </td>
                <td class="px-4 py-4 text-center text-slate-400">{{ mock.duration_minutes || 0 }}m</td>
                <td class="px-4 py-4 text-right flex justify-end gap-2">
                  <button
                    @click="editMock(mock)"
                    class="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteMock(mock)"
                    class="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import Navbar from '../components/navbar.vue';
import { supabase } from '@/supabase/supabase.js';

const stats = ref({
  totalMocks: 0,
  premiumUsers: 0,
  totalUsers: 0,
});
const tests = ref([]);
const users = ref([]);
const loading = ref(false);
const saving = ref(false);
const statusMessage = ref('');
const form = reactive({
  id: null,
  title: '',
  category: '',
  duration: 30,
  is_premium: false,
  rawData: '',
  isEditing: false,
});

const fetchAdminData = async () => {
  loading.value = true;
  statusMessage.value = '';

  try {
    const [testsResponse, usersResponse] = await Promise.all([
      supabase.from('tests').select('*').order('created_at', { ascending: false }),
      supabase.from('profiles').select('id,display_name,email,role,premium,created_at,streak_count,accuracy,total_mocks').order('created_at', { ascending: false }),
    ]);

    if (testsResponse.error) throw testsResponse.error;
    if (usersResponse.error) throw usersResponse.error;

    tests.value = testsResponse.data || [];
    users.value = usersResponse.data || [];

    stats.value.totalMocks = tests.value.length;
    stats.value.totalUsers = users.value.length;
    stats.value.premiumUsers = users.value.filter((user) => user.premium).length;
  } catch (error) {
    console.error('Admin fetch failed:', error);
    statusMessage.value = 'Unable to load admin data. Check your connection.';
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.id = null;
  form.title = '';
  form.category = '';
  form.duration = 30;
  form.is_premium = false;
  form.rawData = '';
  form.isEditing = false;
  statusMessage.value = '';
};

const saveMock = async () => {
  saving.value = true;
  statusMessage.value = '';

  try {
    const parsedData = JSON.parse(form.rawData);
    if (!Array.isArray(parsedData)) {
      throw new Error('Questions JSON must be an array.');
    }

    const payload = {
      title: form.title,
      category: form.category,
      duration_minutes: form.duration,
      is_premium: form.is_premium,
      data: parsedData,
    };

    if (form.isEditing && form.id) {
      const { error } = await supabase.from('tests').update(payload).eq('id', form.id);
      if (error) throw error;
      statusMessage.value = 'Mock updated successfully.';
    } else {
      const { error } = await supabase.from('tests').insert(payload);
      if (error) throw error;
      statusMessage.value = 'Mock uploaded successfully.';
    }

    await fetchAdminData();
    resetForm();
  } catch (error) {
    console.error('Mock upload failed:', error);
    statusMessage.value = error.message || 'Mock upload failed.';
  } finally {
    saving.value = false;
  }
};

const editMock = (mock) => {
  form.id = mock.id;
  form.title = mock.title || '';
  form.category = mock.category || '';
  form.duration = mock.duration_minutes || 30;
  form.is_premium = !!mock.is_premium;
  form.rawData = JSON.stringify(mock.data || [], null, 2);
  form.isEditing = true;
  statusMessage.value = 'Editing existing mock. Save to update.';
};

const deleteMock = async (mock) => {
  if (!confirm(`Delete mock '${mock.title}'? This cannot be undone.`)) {
    return;
  }

  try {
    const { error } = await supabase.from('tests').delete().eq('id', mock.id);
    if (error) throw error;
    statusMessage.value = 'Mock deleted successfully.';
    await fetchAdminData();
  } catch (error) {
    console.error('Mock delete failed:', error);
    statusMessage.value = error.message || 'Failed to delete mock.';
  }
};

const togglePremium = async (user) => {
  try {
    const { error } = await supabase.from('profiles').update({ premium: !user.premium }).eq('id', user.id);
    if (error) throw error;
    user.premium = !user.premium;
    stats.value.premiumUsers = users.value.filter((item) => item.premium).length;
    statusMessage.value = `Premium status updated for ${user.display_name || user.email}.`;
  } catch (error) {
    console.error('Premium toggle failed:', error);
    statusMessage.value = error.message || 'Unable to update premium status.';
  }
};

const updateUserRole = async (user) => {
  try {
    const { error } = await supabase.from('profiles').update({ role: user.role }).eq('id', user.id);
    if (error) throw error;
    statusMessage.value = `${user.display_name || user.email} is now ${user.role}.`;
  } catch (error) {
    console.error('Role update failed:', error);
    statusMessage.value = error.message || 'Unable to update user role.';
  }
};

const deleteUser = async (user) => {
  if (!confirm(`Delete user ${user.display_name || user.email}?`)) {
    return;
  }

  try {
    const { error } = await supabase.from('profiles').delete().eq('id', user.id);
    if (error) throw error;
    users.value = users.value.filter((item) => item.id !== user.id);
    stats.value.totalUsers = users.value.length;
    stats.value.premiumUsers = users.value.filter((item) => item.premium).length;
    statusMessage.value = `User ${user.display_name || user.email} deleted.`;
  } catch (error) {
    console.error('User delete failed:', error);
    statusMessage.value = error.message || 'Unable to delete user.';
  }
};

onMounted(fetchAdminData);
</script>
