<script>
	import Column from './Column.svelte';
	import Scorer from './Scorer.svelte';
	import {first, secnd} from './sections.js';
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
			total_index={Math.floor(i / 2)}
			premiums={i > 1}
			/>
			{/each}
		</div>
		<div id="scores">
			<Scorer label="L"/>
			<Scorer label="M"/>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		padding-top: 10px;
	}

	#content {
		display: flex;
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
		color: var(--foreground-color);
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 5px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>