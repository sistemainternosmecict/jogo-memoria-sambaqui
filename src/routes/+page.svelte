<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import type { PageProps } from './$types';
	import { shuffle } from '$lib/utils';
	import WinScreen from '$lib/components/winScreen.svelte';
	const { data }: PageProps = $props();
	const { options } = data;
	const CARDS_SIZE = 8;

	type Card = {
		name: string;
		icon: string;
		flipped: boolean;
		matchFound: boolean;
	};

	let cardFlipped: Card | undefined = $state();
	let gameStart = $state(Date.now());

	function clicked(card: Card) {
		if (card.matchFound || locked || cardFlipped === card) {
			return;
		}
		if (!cardFlipped) {
			card.flipped = !card.flipped;
			cardFlipped = card;
			return;
		}

		if (isCardEqual(cardFlipped, card)) {
			cardFlipped.matchFound = true;
			card.matchFound = true;
			cardFlipped = undefined;
		} else {
			locked = true;
			card.flipped = false;
			setTimeout(() => {
				cardFlipped!.flipped = true;
				card.flipped = true;
				cardFlipped = undefined;
				locked = false;
			}, 1000);
		}
	}

	function isCardEqual(left: Card, right: Card) {
		return left.name === right.name && left.icon == right.icon;
	}

	function setup(size: number) {
		const newCards: Card[] = [];
		let totalPairs = 0;
		for (let { name, path } of shuffle(options)) {
			newCards.push({
				icon: path,
				name,
				flipped: true,
				matchFound: false
			});
			newCards.push({
				icon: path,
				name,
				flipped: true,
				matchFound: false
			});
			if (++totalPairs == size) {
				break;
			}
		}

		gameStart = Date.now();
		return shuffle(newCards);
	}

	function reset() {
		cards.forEach((card) => {
			card.matchFound = false;
			card.flipped = true;
		});
		setTimeout(() => {
			cards = setup(CARDS_SIZE);
		}, 1000);
	}

	let cards: Card[] = $state(setup(CARDS_SIZE));
	const cardsLeft = $derived(cards.filter((card) => !card.matchFound).length);
	let locked = false;
</script>

<div class="content flex min-h-screen flex-col bg-[#bd722e] text-white">
	<section
		class="z-1 m-3 flex flex-wrap items-center justify-center rounded-2xl bg-[#0b6170] p-5 shadow-xl"
	>
		<h1 class="rounded-tl-2xl rounded-tr-2xl text-center text-5xl font-bold text-shadow-lg">
			Jogo da Memória
		</h1>
		<div class="m-auto flex max-w-full flex-wrap justify-center">
			<img class="h-20 object-contain pr-4" src="/LOGO_FLIS.svg" alt="logo" />
			<img class="h-20 object-contain" src="/logo_edu_smda.svg" alt="logo" />
		</div>
	</section>

	<div class="card-container m-3 mt-auto mb-auto">
		{#each cards as { icon, name, flipped, matchFound }, idx}
			{@const card = cards[idx]}
			<Card
				mouseClick={() => clicked(card)}
				iconSrc={icon}
				{name}
				flipped={!matchFound && flipped}
			/>
		{/each}
	</div>

	{#if cardsLeft === 0}
		<WinScreen totalSeconds={(Date.now() - gameStart) / 1000} resetCallback={reset}></WinScreen>
	{/if}
</div>

<style>
	.card-container {
		display: grid;
		gap: 1rem;

		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
	}
</style>
