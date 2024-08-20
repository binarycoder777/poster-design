

<script setup lang="ts">
import { ElCalendar } from 'element-plus'
</script>

<template>
  <div id="pane">
    <div id="webcrumbs">
      <div className="w-[1300px] shadow rounded-lg bg-neutral-50">
        <div className="bg-cover bg-center p-8 rounded-t-lg" style="background-image: url('../../../public/backend.png')">
          <div className="flex justify-between items-center">
            <h1 className="text-white font-title text-3xl">今天你想设计什么?</h1>
            <div className="space-x-4">
              <button className="text-white border border-white rounded-md px-4 py-2">本月随礼: ￥200</button>
              <button className="text-white border border-white rounded-md px-4 py-2">本月收礼: ￥300</button>
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
      <div className="w-full mt-8 relative">
        <input type="text" placeholder="搜索模版或你的设计" className="w-full py-3 pl-10 pr-4 rounded-full shadow-sm border-none focus:ring-0" />
        <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">search</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);

@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);

@import url(https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200);

/*! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com*/
.event {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-items: center;
  justify-content: center;
  gap: 30px;
}

.calendar {
  max-width: 50%;
  height: 100px;
}

.el-calendar-table .el-calendar-day{
    width: 60px !important;
    height: 40px !important;
  }

*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
:after,
:before {
  --tw-content: '';
}
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family: Open Sans, ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
  font-feature-settings: normal;
  font-variation-settings: normal;
  -moz-tab-size: 4;
  tab-size: 4;
  -webkit-tap-highlight-color: transparent;
}
body {
  line-height: inherit;
  margin: 0;
}
hr {
  border-top-width: 1px;
  color: inherit;
  height: 0;
}
abbr:where([title]) {
  text-decoration: underline dotted;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
a {
  color: inherit;
  text-decoration: inherit;
}
b,
strong {
  font-weight: bolder;
}
code,
kbd,
pre,
samp {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;
  font-feature-settings: normal;
  font-size: 1em;
  font-variation-settings: normal;
}
small {
  font-size: 80%;
}
sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}
sub {
  bottom: -0.25em;
}
sup {
  top: -0.5em;
}
table {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}
button,
input,
optgroup,
select,
textarea {
  color: inherit;
  font-family: inherit;
  font-feature-settings: inherit;
  font-size: 100%;
  font-variation-settings: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  margin: 0;
  padding: 0;
}
button,
select {
  text-transform: none;
}
button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}
:-moz-focusring {
  outline: auto;
}
:-moz-ui-invalid {
  box-shadow: none;
}
progress {
  vertical-align: baseline;
}
::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
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
summary {
  display: list-item;
}
blockquote,
dd,
dl,
figure,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
pre {
  margin: 0;
}
fieldset {
  margin: 0;
}
fieldset,
legend {
  padding: 0;
}
menu,
ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
dialog {
  padding: 0;
}
textarea {
  resize: vertical;
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
audio,
canvas,
embed,
iframe,
img,
object,
svg,
video {
  display: block;
  vertical-align: middle;
}
img,
video {
  height: auto;
  max-width: 100%;
}
[hidden] {
  display: none;
}
*,
:after,
:before {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
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
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
  --tw-contain-size: ;
  --tw-contain-layout: ;
  --tw-contain-paint: ;
  --tw-contain-style: ;
}
#webcrumbs :is(.absolute) {
  position: absolute;
}
#webcrumbs :is(.relative) {
  position: relative;
}
#webcrumbs :is(.left-4) {
  left: 16px;
}
#webcrumbs :is(.top-1\/2) {
  top: 50%;
}
#webcrumbs :is(.mb-4) {
  margin-bottom: 16px;
}
#webcrumbs :is(.mt-2) {
  margin-top: 8px;
}
#webcrumbs :is(.mt-8) {
  margin-top: 32px;
}
#webcrumbs :is(.flex) {
  display: flex;
}
#webcrumbs :is(.w-\[1300px\]) {
  width: 100%;
}
#webcrumbs :is(.w-full) {
  width: 100%;
}
#webcrumbs :is(.-translate-y-1\/2) {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
#webcrumbs :is(.transform) {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
#webcrumbs :is(.flex-col) {
  flex-direction: column;
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
#webcrumbs :is(.border-none) {
  border-style: none;
}
#webcrumbs :is(.border-white) {
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity));
}
#webcrumbs :is(.bg-blue-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-gray-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-gray-700) {
  --tw-bg-opacity: 1;
  background-color: rgb(55 65 81 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-green-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-neutral-50) {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-orange-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(249 115 22 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-pink-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(236 72 153 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-purple-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(168 85 247 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-purple-700) {
  --tw-bg-opacity: 1;
  background-color: rgb(126 34 206 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-red-500) {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity));
}
#webcrumbs :is(.bg-cover) {
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