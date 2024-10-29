<script setup>
import {
  PhBell,
  PhSignOut,
  PhChats,
  PhGear,
  PhHouse,
  PhPaperPlaneTilt,
  PhUsers,
  PhBroadcast,
} from '@phosphor-icons/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
const router = useRouter();

async function handleLogout(event) {
  event.preventDefault();

  try {
    // Delete Session Information
    sessionStorage.clear();

    // Send logout Request to server
    const response = await axios.post(
      'http://localhost:3000/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    // Navigate to Login Page
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <div class="flex flex-col justify-between h-[90vh] border-r px-1">
    <div class="flex place-items-center gap-4">
      <svg
        class="w-16"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>ABB RobotStudio</title>
        <path
          d="M23.999 12.465a9.601 9.601 0 01-19.203 0h1.07a8.53 8.53 0 108.533-8.53v-1.07A9.6 9.6 0 0124 12.463zm-9.6-3.2a3.2 3.2 0 103.2 3.2 3.2 3.2 0 00-3.2-3.2zm-2 0l-.6-6.672-2.462 1.92-1.46-1.44a4.67 4.67 0 00-5.62-.37l-2.02 1.3a.54.54 0 00-.15.74.54.54 0 00.74.15l2-1.31a3.64 3.64 0 014.29.22l1.37 1.38-2.29 1.821z"
        />
      </svg>

      <span class="font-medium font-xl">Acme CRM</span>
    </div>
    <div>
      <div
        @click="$emit('switchTab', 'customers')"
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhUsers size="24" />
        Customers
      </div>
      <div
        @click="$emit('switchTab', 'leads')"
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhPaperPlaneTilt size="24" />
        Leads
      </div>
      <div
        @click="$emit('switchTab', 'interactions')"
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhBroadcast size="24" />
        Interactions
      </div>
    </div>
    <div>
      <div
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhBell />
        Notifications
      </div>
      <div
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhGear />
        Settings
      </div>
      <div
        class="flex place-items-center font-medium font-lg gap-3 p-3 hover:bg-purple-200 rounded-lg hover:cursor-pointer transition"
      >
        <PhChats />
        Support
      </div>
    </div>
    <div>
      <div
        class="flex w-full p-3 border rounded-lg gap-2 font-medium place-items-center"
      >
        <img
          :src="`https://ui-avatars.com/api/?name=${username}&rounded=true&background=2C333A&color=D7E8BA`"
          alt="User PFP"
          class="w-9"
        />
        <span>{{ username }}</span>

        <button
          class="font-medium hover:text-red-800 hover:cursor-pointer justify-self-start"
          @click="handleLogout"
        >
          <div class="flex gap-1">
            <PhSignOut :size="20" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
