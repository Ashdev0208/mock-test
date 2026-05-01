import { createRouter, createWebHistory } from 'vue-router';
import { supabase } from '@/supabase/supabase'; // Your supabase client file

// Import your views
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/loginView.vue';
import RegisterView from '@/views/registerView.vue';
import MockView from '@/views/mockView.vue';
import ResultPage from '@/views/resultPage.vue';
import AdminPanel from '@/views/adminPanel.vue';
import AdminView from '@/views/adminView.vue';
import Dashboard from '@/views/dashboard.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },

  // Protected Student Routes
  {
    path: '/mock',
    name: 'mock',
    component: MockView,
    meta: { requiresAuth: true },
  },
  {
    path: '/result',
    name: 'result',
    component: ResultPage,
    meta: { requiresAuth: true },
  },
   {
    path: '/dashboard',
    name: 'dashboard',
     component: Dashboard,
    meta: { requiresAuth: true },
    
  },

  // Protected Admin Routes
  {
    path: '/admin',
    name: 'admin',
    component: AdminPanel,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      // If you want nested admin views like /admin/stats
      { path: 'overview', component: AdminView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// --- THE NAVIGATION GUARD ---
router.beforeEach(async (to, from, next) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const loggedIn = !!session;

  // 1. Check if the page requires login
  if (to.meta.requiresAuth && !loggedIn) {
    return next('/login');
  }

  // 2. Check if the page requires Admin role
  if (to.meta.requiresAdmin) {
    // We check the user's metadata or a profile table for the 'admin' role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session?.user.id)
      .single();

    if (profile?.role !== 'admin') {
      // If not admin, kick them back to the home page
      return next('/');
    }
  }

  next();
});

export default router;
