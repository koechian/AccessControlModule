<template>
  <Toaster />
  <section>
    <div
      className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <a
        href="#"
        className="flex items-center gap-3  mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
      >
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>ABB RobotStudio</title>
          <path
            d="M23.999 12.465a9.601 9.601 0 01-19.203 0h1.07a8.53 8.53 0 108.533-8.53v-1.07A9.6 9.6 0 0124 12.463zm-9.6-3.2a3.2 3.2 0 103.2 3.2 3.2 3.2 0 00-3.2-3.2zm-2 0l-.6-6.672-2.462 1.92-1.46-1.44a4.67 4.67 0 00-5.62-.37l-2.02 1.3a.54.54 0 00-.15.74.54.54 0 00.74.15l2-1.31a3.64 3.64 0 014.29.22l1.37 1.38-2.29 1.821z"
          />
        </svg>

        <h2>Acme CRM Platform</h2>
      </a>
      <div
        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Sign in to your account
          </h1>
          <form @submit.prevent="submitForm" className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your username
              </label>
              <input
                v-model="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your Username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex items-center justify-end">
              <button
                @click.prevent="navigateToRBAC"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                RBAC Module Login
              </button>
            </div>
            <button
              className="w-full rounded-lg bg-[#18181A] text-white p-3 hover:bg-slate-600 transition"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Toaster, toast } from 'vue-sonner';
import { useRouter } from 'vue-router';

const router = useRouter();

// Check if a user is Logged in on load

onMounted(() => {
  try {
    const auth = JSON.parse(sessionStorage.getItem('auth'));

    if (auth?.accessToken) {
      router.push('/crmdashboard');
    }
  } catch (error) {
    console.log(error);
  }
});

const username = ref('');
const password = ref('');

function navigateToRBAC() {
  router.push('/');
}

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value,
    });

    if (response.status == 201) {
      toast.success('Logged in sucesfully');
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      router.push('/crmdashboard');
    } else {
      toast.error('Error Logging In');
    }
  } catch (error) {
    console.log(error);
    toast.error('Login Failed');
  }
};
</script>
