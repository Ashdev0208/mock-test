<template>
  <div class="min-h-screen bg-[#0F172A] text-white font-sans antialiased pb-20">
    <header class="max-w-7xl mx-auto px-8 py-10 flex justify-between items-center">
      <div>
        <h1 class="text-4xl font-extrabold tracking-tight">Admin Console</h1>
        <p class="text-slate-400 mt-2 font-medium">Manage challenges, broadcasts, and student performance.</p>
      </div>
      <div class="flex gap-4">
        <button class="bg-indigo-600 hover:bg-indigo-500 px-6 py-2.5 rounded-xl font-bold transition shadow-lg shadow-indigo-600/20">
          <i class="fa-solid fa-plus mr-2"></i> Create Mock
        </button>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-8 space-y-10">
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6 shadow-xl">
          <div class="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 text-2xl">
            <i class="fa-solid fa-users"></i>
          </div>
          <div>
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Students</p>
            <p class="text-3xl font-bold mt-1">2,482</p>
          </div>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6 shadow-xl">
          <div class="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 text-2xl">
            <i class="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Avg</p>
            <p class="text-3xl font-bold mt-1">78%</p>
          </div>
        </div>

        <div class="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] flex items-center gap-6 shadow-xl">
          <div class="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-400 text-2xl">
            <i class="fa-solid fa-trophy"></i>
          </div>
          <div>
            <p class="text-slate-500 text-xs font-bold uppercase tracking-widest">Live Challenges</p>
            <p class="text-3xl font-bold mt-1">4</p>
          </div>
        </div>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div class="absolute top-0 right-0 p-8 opacity-10">
          <i class="fa-solid fa-tower-broadcast text-6xl"></i>
        </div>
        
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
            <i class="fa-solid fa-paper-plane text-sm"></i>
          </div>
          <h2 class="text-xl font-bold">System Broadcast</h2>
        </div>

        <div class="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Type a message to all active students..." 
            class="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
          />
          <button class="bg-indigo-600 hover:bg-indigo-500 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition group">
            <span>Update Live</span>
            <i class="fa-solid fa-circle-check group-hover:scale-110 transition"></i>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div class="lg:col-span-7 space-y-6">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-xl font-bold">Current Mock Sprints</h3>
          </div>
          
          <div v-for="i in 2" :key="i" class="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl flex justify-between items-center hover:bg-slate-900 transition group">
            <div class="flex items-center gap-5">
              <div class="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center text-slate-500 border border-slate-800">
                <i class="fa-solid fa-book-open"></i>
              </div>
              <div>
                <h4 class="font-bold text-lg">TOPIK II Vocabulary Sprint</h4>
                <div class="flex items-center gap-3 mt-1 text-xs font-bold uppercase tracking-wider">
                  <span class="text-slate-500"><i class="fa-regular fa-clock mr-1"></i> 20m</span>
                  <span class="text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">Live</span>
                </div>
              </div>
            </div>
            <button class="bg-slate-950 border border-slate-800 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:border-indigo-600 transition">
              Edit Sprint
            </button>
          </div>
        </div>

        <div class="lg:col-span-5">
          <h3 class="text-xl font-bold mb-6">Student Directory</h3>
          <div class="bg-slate-900/50 border border-slate-800 rounded-[2rem] overflow-hidden shadow-xl">
            <table class="w-full text-left">
              <thead class="bg-slate-950/50 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] border-b border-slate-800">
                <tr>
                  <th class="px-6 py-4">Student</th>
                  <th class="px-6 py-4 text-center">Accuracy</th>
                  <th class="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/50">
                <tr v-for="user in ['Shodiyor', 'Muhammadrizo']" :key="user" class="hover:bg-slate-800/30 transition">
                  <td class="px-6 py-5">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                        {{ user.substring(0, 2).toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-bold text-sm">{{ user }}</p>
                        <p class="text-[10px] text-slate-500">Student ID: #1204</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-5 text-center font-bold text-emerald-400">92%</td>
                  <td class="px-6 py-5 text-right">
                    <span class="text-orange-500 text-[10px] font-bold uppercase bg-orange-500/10 px-2 py-1 rounded">3D Streak</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>