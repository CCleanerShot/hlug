<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}
<div class="absolute border-2 bottom-1 left-1/2 transition-all -translate-x-1/2" id="table-of-contents">
	<a href="/account">Account</a>
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