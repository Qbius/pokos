import {writable} from 'svelte/store';

export let l_scores = writable([0, 0, 0]);
export let m_scores = writable([0, 0, 0]);

export const first = ['1', '2', '3', '4', '5', '6'];
export const secnd = ['P', '2P', 'MS', 'DS', 'T', 'F', 'K', 'P', 'Sz'];