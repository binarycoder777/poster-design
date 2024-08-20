<script setup lang="ts">

import { Calendar, Search } from '@element-plus/icons-vue'
</script>

<template>
  <div id="webcrumbs"> 
	<div className="w-[1300px] bg-neutral-50 p-6 rounded-lg shadow-lg">
    <div class="search-class">
	    <h1 className="font-title text-lg mb-5">最新请帖</h1>
      <el-input
      style="width: 90%;height: 50px;"
      placeholder="查询最近收到或发出的请帖"
      :prefix-icon="Search"/>
    </div>
    	    <div className="grid grid-cols-5 gap-4">
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/1" alt="Design 1" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>嘿，少年! 拿起手机打开书本搜索</div>
	            <div className="text-sm text-gray-500">42 x 594 图形</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/2" alt="Design 2" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>未命名的设计</div>
	            <div className="text-sm text-gray-500">Logo</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/3" alt="Design 3" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>未命名的设计</div>
	            <div className="text-sm text-gray-500">海报</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/4" alt="Design 4" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>红色商务聚会手机邀请函</div>
	            <div className="text-sm text-gray-500">手机邀请函</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/5" alt="Design 5" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>红色国风年会手机邀请函</div>
	            <div className="text-sm text-gray-500">手机邀请函</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/6" alt="Design 6" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>休罗纪恐龙可爱手绘插画元素集</div>
	            <div className="text-sm text-gray-500">插画素材集合</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/7" alt="Design 7" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>黑底五星恐龙生日聚会请柬</div>
	            <div className="text-sm text-gray-500">邀请函（黑底）</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/8" alt="Design 8" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>休罗纪恐龙写实手绘插画元素</div>
	            <div className="text-sm text-gray-500">插画素材集合</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/9" alt="Design 9" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>卡通可爱风通用演示文稿</div>
	            <div className="text-sm text-gray-500">演示文稿</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/10" alt="Design 10" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>黄色卡通啤酒酒吧LOGO</div>
	            <div className="text-sm text-gray-500">Logo</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/11" alt="Design 11" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>蓝绿色简图项目介绍名片（8.5 x 5.5厘米）</div>
	            <div className="text-sm text-gray-500">名片</div>
	        </div>
	        <div>
	            <img src="https://tools-api.webcrumbs.org/image-placeholder/180/180/design/12" alt="Design 12" className="w-[180px] h-[180px] object-cover rounded-md mb-2" />
	            <div>蓝绿色简图项目介绍名片</div>
	            <div className="text-sm text-gray-500">电子名片</div>
	        </div>
	    </div>
	</div> 
</div>
</template>

<style scoped>

@import url(https://fonts.googleapis.com/css2?family=Lato&display=swap);

@import url(https://fonts.googleapis.com/css2?family=Open+Sans&display=swap);

/*! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com*/
*,
:after,
:before {
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
}
:after,
:before {
  --tw-content: "";
}
:host,
html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  font-family:
    Open Sans,
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
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

html, body {
  height: 100%;
  overflow: auto; /* 或 overflow: scroll; */
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
  font-family:
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    Liberation Mono,
    Courier New,
    monospace;
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
input:where([type="button"]),
input:where([type="reset"]),
input:where([type="submit"]) {
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
[type="search"] {
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
[role="button"],
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
#webcrumbs :is(.mb-2) {
  margin-bottom: 8px;
}
#webcrumbs :is(.mb-5) {
  margin-bottom: 20px;
}
#webcrumbs :is(.grid) {
  display: grid;
}
#webcrumbs :is(.h-\[180px\]) {
  height: 180px;
}
#webcrumbs :is(.w-\[1300px\]) {
  width: 100%;
}
#webcrumbs :is(.w-\[180px\]) {
  width: 180px;
}
#webcrumbs :is(.grid-cols-5) {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
#webcrumbs :is(.gap-4) {
  gap: 16px;
}
#webcrumbs :is(.rounded-lg) {
  border-radius: 24px;
}
#webcrumbs :is(.rounded-md) {
  border-radius: 18px;
}
#webcrumbs :is(.bg-neutral-50) {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
#webcrumbs :is(.object-cover) {
  object-fit: cover;
}
#webcrumbs :is(.p-6) {
  padding: 24px;
}
#webcrumbs :is(.font-title) {
  font-family:
    Lato,
    ui-sans-serif,
    system-ui,
    sans-serif,
    Apple Color Emoji,
    Segoe UI Emoji,
    Segoe UI Symbol,
    Noto Color Emoji;
}
#webcrumbs :is(.text-lg) {
  font-size: 18px;
  line-height: 28px;
}
#webcrumbs :is(.text-sm) {
  font-size: 14px;
  line-height: 20px;
}
#webcrumbs :is(.text-gray-500) {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
#webcrumbs :is(.shadow-lg) {
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
    0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
#webcrumbs {
  font-family: Open Sans !important;
  font-size: 16px !important;
  line-height: 24px !important;
}
#webcrumbs :is(.bg-neutral-50) {
  color: rgba(0, 0, 0, 0.9) !important;
}

#webcrumbs {
  max-width: 100%;
}

.search-class {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

</style>