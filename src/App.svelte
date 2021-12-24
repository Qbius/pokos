<script>
	import Column from './Column.svelte';
	import {l_scores, m_scores} from './sections.js';
</script>

<main>
	<div id="content">
		<div id="columns">		
			{#each [...Array(6).keys()] as i}
			<Column
			label={(i % 2 === 0) ? 'L' : 'M'}
			prev={(i > 1) ? ((i % 2 === 0) ? l_scores : m_scores)[Math.floor((i - 2) / 2)] : 0}
			total_index={Math.floor(i / 2)}
			premiums={i > 1}
			/>
			{/each}
		</div>
		<div id="scores">
			<div class="fscoring-col">
				<span>L</span>
				<span class="fscoring-span">
					{$l_scores.reduce((a, b) => a + Math.round(b), 0)}
				</span>
			</div>
			<div class="fscoring-col">
				<span>M</span>
				<span class="fscoring-span">
					{$m_scores.reduce((a, b) => a + Math.round(b), 0)}
				</span>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		background-color: var(--background-color);
	}

	#content {
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	#columns {
		display: flex;
	}

	#scores {
		font-size: 32px;
		color: var(--foreground-color);
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.fscoring-col {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.fscoring-span {
		font-weight: 1000;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>