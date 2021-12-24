<script>
    import {l_scores, m_scores} from './sections.js';

    export let label;

    let zapascount = 0;
    $: total = ((label === 'L') ? $l_scores : $m_scores).reduce((a, b) => a + b, 0);
</script>

<div id="component">
    <span>{label}</span>
    <button class="zapas-button" on:click={() => ++zapascount}>▲</button>
    <span>{zapascount}</span>
    <button class="zapas-button" on:click={() => --zapascount} disabled={zapascount === 0} style="margin-top: 4px;">▼</button>
    <span style="font-size: 24px; font-weight: 1000;">{total}</span>
</div>

<style>
    #component {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .zapas-button {
        font-size: 10px;
        width: 40px;
    }
</style>