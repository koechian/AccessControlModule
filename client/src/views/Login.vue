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
        <svg
          role="img"
          className="w-1 h-1 mr-4"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.291.068A1.29 1.29 0 0 0 0 1.36v3.352a1.29 1.29 0 0 0 1.291 1.291h3.354a1.29 1.29 0 0 0 1.289-1.291V1.359A1.29 1.29 0 0 0 4.644.07Zm9.033 0a1.29 1.29 0 0 0-1.29 1.291v3.352a1.29 1.29 0 0 0 1.29 1.291H22.71A1.29 1.29 0 0 0 24 4.711V1.359A1.29 1.29 0 0 0 22.709.07ZM1.291 9.033A1.29 1.29 0 0 0 0 10.323v3.353a1.29 1.29 0 0 0 1.291 1.29h21.418A1.29 1.29 0 0 0 24 13.677v-3.354a1.29 1.29 0 0 0-1.291-1.289Zm0 8.965A1.29 1.29 0 0 0 0 19.289v3.352a1.29 1.29 0 0 0 1.291 1.29h12.385a1.29 1.29 0 0 0 1.29-1.29v-3.352a1.29 1.29 0 0 0-1.29-1.291zm18.064 0a1.29 1.29 0 0 0-1.289 1.291v3.352a1.29 1.29 0 0 0 1.29 1.29h3.353A1.29 1.29 0 0 0 24 22.642v-3.352a1.29 1.29 0 0 0-1.291-1.291z"
          />
        </svg>

        <h2>Sahihi Interior Builders</h2>
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
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
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
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();

// Check if a user is Logged in on load

onMounted(() => {
  try {
    const auth = JSON.parse(sessionStorage.getItem('auth'));

    if (auth?.accessToken) {
      router.push('/dashboard');
    }
  } catch (error) {
    console.log(error);
  }
});

const username = ref('');
const password = ref('');

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:3000/auth/login', {
      username: username.value,
      password: password.value,
    });

    if (response.status == 201) {
      toast.success('Logged in sucesfully');
      sessionStorage.setItem('auth', JSON.stringify(response.data));
      router.push('/dashboard');
    } else {
      toast.error('Error Logging In');
    }
  } catch (error) {
    console.log(error);
    toast.error('Login Failed');
  }
};
</script>
