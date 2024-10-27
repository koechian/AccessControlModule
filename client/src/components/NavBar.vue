<script setup lang="ts">
import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuLabel from './ui/dropdown-menu/DropdownMenuLabel.vue';
import DropdownMenuSeparator from './ui/dropdown-menu/DropdownMenuSeparator.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';
</script>

<template>
  <nav
    class="w-full h-2/5 outline-dashed outline-1 p-3 px-10 flex justify-between"
  >
    <div>
      <!-- <svg
        role="img"
        className="mr-4"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.291.068A1.29 1.29 0 0 0 0 1.36v3.352a1.29 1.29 0 0 0 1.291 1.291h3.354a1.29 1.29 0 0 0 1.289-1.291V1.359A1.29 1.29 0 0 0 4.644.07Zm9.033 0a1.29 1.29 0 0 0-1.29 1.291v3.352a1.29 1.29 0 0 0 1.29 1.291H22.71A1.29 1.29 0 0 0 24 4.711V1.359A1.29 1.29 0 0 0 22.709.07ZM1.291 9.033A1.29 1.29 0 0 0 0 10.323v3.353a1.29 1.29 0 0 0 1.291 1.29h21.418A1.29 1.29 0 0 0 24 13.677v-3.354a1.29 1.29 0 0 0-1.291-1.289Zm0 8.965A1.29 1.29 0 0 0 0 19.289v3.352a1.29 1.29 0 0 0 1.291 1.29h12.385a1.29 1.29 0 0 0 1.29-1.29v-3.352a1.29 1.29 0 0 0-1.29-1.291zm18.064 0a1.29 1.29 0 0 0-1.289 1.291v3.352a1.29 1.29 0 0 0 1.29 1.29h3.353A1.29 1.29 0 0 0 24 22.642v-3.352a1.29 1.29 0 0 0-1.291-1.291z"
        />
      </svg> -->

      <span class="text-xl">Sahihi Interior Builders</span>
    </div>
    <div class="mr-10">
      <DropdownMenu>
        <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel> My Profile </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel> Users </DropdownMenuLabel>
          <DropdownMenuLabel> Projects </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>
            <span class="font-bold text-red-400">Logout</span>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </nav>
</template>
