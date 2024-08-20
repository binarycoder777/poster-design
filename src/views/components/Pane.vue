

<script setup lang="ts">
import { ElCalendar } from 'element-plus'
import { Calendar, Search } from '@element-plus/icons-vue'
import InvitationList from './InvitationList.vue';
</script>

<template>
  <div id="pane" >
    <div id="webcrumbs">
      <div class="w-[1300px] shadow rounded-lg bg-neutral-50">
        <div class="bg-cover bg-center p-8 rounded-t-lg" style="background-image: url('../../../public/backend.png')">
          <div class="flex justify-between items-center">
            <h1 class="text-white font-title text-3xl">今天你随礼 | 收礼了吗？</h1>
            <div class="space-x-4">
              <button class="text-white border border-white rounded-md px-4 py-2">去随礼</button>
              <button class="text-white border border-white rounded-md px-4 py-2">去送礼</button>
            </div>
          </div>
        </div>
      </div>
      <div class="event">
            <div class="echarts">
              <img src="../../../public/demo1.jpg" alt="">
            </div>
            <div class="calendar">
              <ElCalendar>
              <template #date-cell="{ data }">
                <p :class="data.isSelected ? 'is-selected' : ''">
                  {{ data.day.split('-').slice(1).join('-') }}
                  {{ data.isSelected ? '✔️' : '' }}
                </p>
              </template>
            </ElCalendar>
            </div>
      </div>
      <div class="search-invitation">
      <InvitationList></InvitationList>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);

@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);

@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);


.echarts {
  margin-top: 40px;
}

#pane {
  min-height: 100vh; /* 确保页面最小高度为视口高度 */
}

#webcrumbs {
  overflow: auto; /* 确保内容超出时显示滚动条 */
}

/*! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com*/
.event {
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  gap: 30px;
  /* overflow: auto; 处理溢出 */
}

.calendar {
  max-width: 50%;
  height: 100%;
}


[type='search'] {
  -webkit-appearance: textfield;
  outline-offset: -2px;
}
::-webkit-search-decoration {
  -webkit-appearance: none;
}
::-webkit-file-upload-button {
  -webkit-appearance: button;
  font: inherit;
}


input::placeholder,
textarea::placeholder {
  color: #9ca3af;
  opacity: 1;
}
[role='button'],
button {
  cursor: pointer;
}
:disabled {
  cursor: default;
}

:after,
:before {
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-scroll-snap-strictness: proximity;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
}

.flex {
  display: flex;
  overflow: auto; /* 处理溢出 */

}
#webcrumbs :is(.w-full) {
  width: 100%;
}

#webcrumbs :is(.items-center) {
  align-items: center;
}
#webcrumbs :is(.justify-between) {
  justify-content: space-between;
}
#webcrumbs :is(.justify-around) {
  justify-content: space-around;
}
#webcrumbs :is(.space-x-4 > :not([hidden]) ~ :not([hidden])) {
  --tw-space-x-reverse: 0;
  margin-left: calc(16px * (1 - var(--tw-space-x-reverse)));
  margin-right: calc(16px * var(--tw-space-x-reverse));
}
#webcrumbs :is(.rounded-full) {
  border-radius: 9999px;
}
#webcrumbs :is(.rounded-lg) {
  border-radius: 24px;
}
#webcrumbs :is(.rounded-md) {
  border-radius: 18px;
}
#webcrumbs :is(.rounded-t-lg) {
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
}
#webcrumbs :is(.border) {
  border-width: 1px;
}
:is(.bg-cover) {
  background-size: cover;
}
#webcrumbs :is(.bg-center) {
  background-position: 50%;
}
#webcrumbs :is(.p-3) {
  padding: 12px;
}
#webcrumbs :is(.p-8) {
  padding: 32px;
}
#webcrumbs :is(.px-4) {
  padding-left: 16px;
  padding-right: 16px;
}
#webcrumbs :is(.py-2) {
  padding-bottom: 8px;
  padding-top: 8px;
}
#webcrumbs :is(.py-3) {
  padding-bottom: 12px;
  padding-top: 12px;
}
#webcrumbs :is(.pl-10) {
  padding-left: 40px;
}
#webcrumbs :is(.pr-4) {
  padding-right: 16px;
}
#webcrumbs :is(.font-title) {
  font-family: Lato, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
}
#webcrumbs :is(.text-3xl) {
  font-size: 30px;
  line-height: 36px;
}
#webcrumbs :is(.text-5xl) {
  font-size: 48px;
  line-height: 16px;
}
#webcrumbs :is(.text-gray-500) {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
#webcrumbs :is(.text-neutral-50) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
#webcrumbs :is(.text-white) {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
#webcrumbs :is(.shadow) {
  --tw-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
#webcrumbs :is(.shadow-sm) {
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
#webcrumbs {
  font-family: Open Sans !important;
  font-size: 16px !important;
  line-height: 24px !important;
}
#webcrumbs :is(.bg-neutral-50) {
  color: rgba(0, 0, 0, 0.9) !important;
}
#webcrumbs :is(.focus\:ring-0:focus) {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
</style>