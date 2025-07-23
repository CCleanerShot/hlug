<script lang="ts">
	import '../app.css';
	import type { Snippet } from 'svelte';
	import type { PageProps } from './$types';
	
	let { children, data }: PageProps & {children: Snippet<[]>} = $props();
	const {description, title} = data
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description}>

</svelte:head>
{@render children()}
<div class="absolute border-2 bottom-1 left-1/2 transition-all -translate-x-1/2" id="table-of-contents">
	<a href="/list">Guest List</a>
	<a href="/meetups">Meetups</a>
</div>

<style>
	a {
		font-weight: bold;
		padding: 0.2rem;
	}

	a:hover {
		background-color: black;
		color: white;
	}
</style>