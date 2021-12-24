<script>
	import Column from './Column.svelte';
	import {first, secnd, l_scores, m_scores} from './sections.js';
</script>


<main>
	<div id="content">
		<div id="columns">
			<div id="rowlabels">
				<div style="height: 1px;"></div>
				{#each [...first, ...secnd] as rowlabel}
				<span
					style="
						text-align: center;
						margin-left: 5px;
						margin-right: 2px;
						height: var(--scorecell-height);
						margin-top: var(--scorecell-vrtmrg);
						margin-bottom: var(--scorecell-vrtmrg);
					"
				>{rowlabel}</span>
				{/each}
			</div>
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
	}

	#content {
		margin: auto;
		display: flex;
		flex-direction: column;
	}

	#rowlabels {
		display: flex;
		flex-direction: column;
		color: var(--foreground-color);
	}

	#columns {
		display: flex;
	}

	#scores {
		font-size: 24px;
		color: var(--foreground-color);
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 10px;
	}

	.fscoring-col {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.fscoring-span {
		margin-left: 15px;
		font-weight: 1000;
		text-align: center;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>