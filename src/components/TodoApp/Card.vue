<template>
  <div
    class="w-full flex flex-col rounded-lg shadow-md bg-white h-[500px] md:h-[650px]"
  >
    <div class="flex-grow">
      <div
        class="border-b flex justify-between items-center border-gray-[rgba(231, 231, 231, 1)] px-5 pt-[23px] pb-4"
      >
        <slot name="header"></slot>
      </div>

      <div
        class="flex flex-col gap-3 px-5 py-3 h-[300px] md:h-[450px] overflow-y-auto"
      >
        <slot name="body"></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
