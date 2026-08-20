<template>
  <div
    class="relative flex min-h-[calc(100svh-74px)] w-full items-center justify-center overflow-hidden bg-[#15223b] px-6 py-16 text-center text-[#fbf7ee]"
    role="status"
    aria-live="polite"
  >
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(100%_150%_at_82%_20%,rgba(50,74,120,0.42),transparent_58%)]"
      aria-hidden="true"
    />
    <div class="relative mx-auto max-w-[36em]">
      <p class="font-serif-latin mb-3.5 text-[20px] italic tracking-[0.04em] text-[#fbf7ee]">
        Merci beaucoup.
      </p>
      <h1
        class="font-display mb-5 text-[clamp(28px,4.4vw,46px)] leading-[1.5] tracking-[0.08em] text-[#fbf7ee]"
      >
        お問い合わせを受け付けました。
      </h1>
      <p class="mb-10 text-[15px] leading-8 text-[#fbf7ee]/90">
        送信いただきありがとうございます。内容を確認のうえ、日本語スタッフよりメールにてご連絡いたします。
      </p>
      <NuxtLink
        to="/"
        class="inline-flex items-center justify-center border border-[#a9854c] bg-[#a9854c] px-8 py-3.5 text-[13px] font-medium tracking-[0.14em] text-[#15223b] underline decoration-[#15223b]/70 underline-offset-[5px] transition duration-300 hover:border-[#c5a368] hover:bg-[#c5a368]"
      >
        HMI PARIS トップへ戻る
      </NuxtLink>
    </div>
  </div>
</template>
