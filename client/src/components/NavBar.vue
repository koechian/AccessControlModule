<script setup>
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuLabel from './ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from './ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
import {
  PhSignOut,
  PhBlueprint,
  PhUsers,
  PhIdentificationCard,
} from '@phosphor-icons/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
const router = useRouter();

function switchToCrm() {
  router.push('/crmlogin');
}

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
  <nav
    class="sticky top-1 bg-white w-full h-1/5 p-3 px-10 flex justify-between"
  >
    <div class="flex gap-3 items-center">
      <svg
        role="img"
        class="mr-4 w-14"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.291.068A1.29 1.29 0 0 0 0 1.36v3.352a1.29 1.29 0 0 0 1.291 1.291h3.354a1.29 1.29 0 0 0 1.289-1.291V1.359A1.29 1.29 0 0 0 4.644.07Zm9.033 0a1.29 1.29 0 0 0-1.29 1.291v3.352a1.29 1.29 0 0 0 1.29 1.291H22.71A1.29 1.29 0 0 0 24 4.711V1.359A1.29 1.29 0 0 0 22.709.07ZM1.291 9.033A1.29 1.29 0 0 0 0 10.323v3.353a1.29 1.29 0 0 0 1.291 1.29h21.418A1.29 1.29 0 0 0 24 13.677v-3.354a1.29 1.29 0 0 0-1.291-1.289Zm0 8.965A1.29 1.29 0 0 0 0 19.289v3.352a1.29 1.29 0 0 0 1.291 1.29h12.385a1.29 1.29 0 0 0 1.29-1.29v-3.352a1.29 1.29 0 0 0-1.29-1.291zm18.064 0a1.29 1.29 0 0 0-1.289 1.291v3.352a1.29 1.29 0 0 0 1.29 1.29h3.353A1.29 1.29 0 0 0 24 22.642v-3.352a1.29 1.29 0 0 0-1.291-1.291z"
        />
      </svg>

      <span class="text-xl font-medium">Sahihi Interior Builders</span>
    </div>
    <div class="mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            :src="`https://ui-avatars.com/api/?name=${username}&rounded=true&background=2C333A&color=D7E8BA`"
            alt="User PFP"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel class="hover:cursor-pointer">
            <div @click="switchToCrm" class="flex gap-3 font-medium">
              <PhIdentificationCard :size="18" />
              Switch to CRM
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel
            v-if="(auth.role == 'Admin') | 'Project Manager'"
            class="hover:cursor-pointer"
          >
            <div
              @click="$emit('toggleTable', 'users')"
              class="flex gap-3 font-medium"
            >
              <PhUsers :size="18" />
              Employees
            </div>
          </DropdownMenuLabel>
          <DropdownMenuLabel
            v-if="(auth.role == 'Admin') | 'Project Manager'"
            class="hover:cursor-pointer"
          >
            <div
              @click="$emit('toggleTable', 'projects')"
              class="flex gap-3 font-medium"
            >
              <PhBlueprint :size="18" />
              Projects
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator
            v-if="(auth.role == 'Admin') | 'Project Manager'"
          />
          <DropdownMenuLabel>
            <button
              class="font-medium text-red-400 hover:text-red-800 hover:cursor-pointer"
              @click="handleLogout"
            >
              <div class="flex gap-1">
                <PhSignOut :size="20" />
                Logout
              </div>
            </button>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
