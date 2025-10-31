<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';
	const {
		iconSrc,
		name,
		flipped,
		mouseClick
	}: {
		mouseClick: MouseEventHandler<any>;
		iconSrc: string;
		name: string;
		flipped: boolean;
	} = $props();
</script>

<button onclick={mouseClick} class="perspective">
	<div class="card-container {flipped ? 'flipped' : ''}">
		<!-- Front -->
		<figure class="card-side front flex w-full justify-stretch text-white">
			<div class="min-w-0 flex-1 overflow-hidden">
				<img src={iconSrc} alt={name} class="card-img h-full rounded-t-2xl object-cover"/>
			</div>
			<figcaption
				class="w-full text-wrap whitespace-wrap content-center rounded-b-xl  p-2 text-xl font-bold"
			>
				{name}
			</figcaption>
		</figure>

		<!-- Back -->
		<figure class="card-side back items-center justify-center bg-black text-white"></figure>
	</div>
</button>

<style>

	.perspective {
		background: none;
        border: none;
        padding: 0;
        cursor: pointer;
		transition: 0.2s linear;
		perspective: 1000px;
	}
	.perspective:hover {
        transform: scale(1.05);
        backdrop-filter: drop-shadow(4px 4px 10px red);
    }
	.card-container {
		position: relative;
		aspect-ratio: 10.65 / 16;
  
 
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.card-img{
		border: solid 2px #8C6239;
	}
	.card-container.flipped {
		transform: rotateY(180deg);
	}

	.card-side {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: .5rem;
		border-radius: .5rem;
		background-size: cover;
	}

	.card-side.front {
		transform: rotateY(0deg);
		background-color: #DCA65C;
		border: solid 3px #4B2E05;
	}

	.card-side.back {
		transform: rotateY(180deg);
		background-image: url('/card.svg');
	}
</style>
