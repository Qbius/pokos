<script>
    import {first, secnd, l_scores, m_scores} from './sections.js';

    export let label;
    export let total_index;
    export let premiums;

    let first_score_raw = first.map(_ => '');
    let secnd_score_raw = secnd.map(_ => '');

    $: first_score = first_score_raw.map(n => n ? n : 0);
    $: secnd_score = secnd_score_raw.map(n => n ? n : 0);
    $: first_raw = first_score.reduce((a, b) => a + Math.round(b), 0);
    $: first_bonus = (premiums ? Math.sign(first_raw) * 50 : 0);
    $: secnd_bonus = ((premiums && secnd_score.every(s => s > 0)) ? 100 : 0);
    $: first_total = first_raw + first_bonus;
    $: ((label === 'L') ? l_scores : m_scores).update(scr => {
        console.log(secnd_score.every(s => s > 0))
        if (scr)
            scr[total_index] = first_total + secnd_score.reduce((a, b) => a + b, 0) + secnd_bonus;
        return scr
    });
    $: total = ((label === 'L') ? $l_scores : $m_scores)[total_index];
    $: olcolor = (first_bonus > 0) ? 'green' : (first_bonus < 0) ? 'red' : 'transparent';
    $: oxcolor = (secnd_bonus > 0) ? 'purple' : 'transparent';
</script>

<div id="component" style="margin-left: {(label === 'L') ? '5' : '2'}px;">
    {#if premiums}
    <div style="width: var(--scorecell-width); height: 156px; position: absolute; z-index: 2; left: 0; top: 0px; background-color: {olcolor}; opacity: 0.3; pointer-events: none;"/>
    <div style="width: var(--scorecell-width); height: 234px; position: absolute; z-index: 2; left: 0; top: 156px; background-color: {oxcolor}; opacity: 0.3; pointer-events: none;"/>
    {/if}
    {#each first as _section, index}
    <input class="cell-input" type="number" bind:value={first_score_raw[index]}>
    {/each}
    {#each secnd as _section, index}
    <input class="cell-input" type="number" bind:value={secnd_score_raw[index]}>
    {/each}
    <span class="cell-total">{total}</span>
</div>

<style>
    #component {
        position:relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 1px;
    }

    .cell-input {
        width: var(--scorecell-width);
        margin-top: var(--scorecell-vrtmrg);
        margin-bottom: var(--scorecell-vrtmrg);
        text-align: center;
        background-color: var(--foreground-color);
        height: var(--scorecell-height);
    }

    .cell-total {
        height: var(--totalcell-height);
        margin-top: var(--totalcell-mrgtop);
        margin-bottom: var(--totalcell-mrgbot);
        font-weight: 1000;
        color: var(--foreground-color);
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }


    input[type=number] {
        -moz-appearance: textfield;
    }
</style>