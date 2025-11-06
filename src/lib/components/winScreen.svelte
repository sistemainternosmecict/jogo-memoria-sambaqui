<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	const {
		resetCallback,
		totalSeconds
	}: { resetCallback: MouseEventHandler<any>; totalSeconds: number } = $props();
	const totalTimeMessage = `${Math.floor(totalSeconds / 60)} minuto(s) ${(totalSeconds % 60).toFixed(2)} segundo(s)`;
</script>

<main class="fixed p-5 inset-0 z-2 flex items-center justify-center bg-black/50">
	<div
		class="flex min-h-1/4 min-w-1/4 flex-col items-center border-4 justify-evenly rounded-2xl bg-[#3b571c] p-3"
	>
		<h1 class="text-5xl font-bold">
			VOCÊ CONSEGUIU!!!
		</h1>
    <p>{totalTimeMessage}</p>
		<button onclick={resetCallback} class="rounded-2xl mt-5 bg-green-950 p-3 font-bold">
			Jogar de novo!
		</button>
	</div>
</main>
