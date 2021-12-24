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
    $: first_total = first_raw + (premiums ? Math.sign(first_raw) * 50 : 0);
    $: ((label === 'L') ? l_scores : m_scores).update(scr => {
        console.log(secnd_score.every(s => s > 0))
        if (scr)
            scr[total_index] = first_total + secnd_score.reduce((a, b) => a + b, 0) + ((premiums && secnd_score.every(s => s > 0)) ? 100 : 0);
        return scr
    });
    $: total = ((label === 'L') ? $l_scores : $m_scores)[total_index];
</script>

<div id="component">
    <span>{label}</span>
    {#each first as _section, index}
    <input class="cell-input" type="number" bind:value={first_score_raw[index]}>
    {/each}
    <span class="cell-total">{first_total}</span>
    {#each secnd as _section, index}
    <input class="cell-input" type="number" bind:value={secnd_score_raw[index]}>
    {/each}
    <span class="cell-total">{total}</span>
</div>

<style>
    #component {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cell-input {
        width: 50px;
        margin-top: 1px;
        margin-bottom: 1px;
        margin-left: 5px;
        margin-right: 5px;
        text-align: center;
        background-color: var(--foreground-color);
    }

    .cell-total {
        margin-top: 5px;
        margin-bottom: 20px;
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