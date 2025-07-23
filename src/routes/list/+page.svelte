<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import google from '$lib/images/google.png';
	import type { GoogleUserNoIdOrEmail } from '$lib/types';
	import { utilityClient } from '$lib/utility/utilityClient';

	let { data }: PageProps = $props();
	const { oauth_google } = data;

	let users: GoogleUserNoIdOrEmail[] = $state([]);

	onMount(async () => {
		const result = await utilityClient.fetch('GET=>/api/guest-list', {});
		const json = await result.JSON();
		users = json.data.guests;
	});
</script>

<div class="flex flex-col items-center p-2">
	{#if !data.loggedIn}
		<a class="border-2 rounded-md p-1 flex gap-8 items-center justify-between m-auto" href={oauth_google}>
			<img src={google} alt="google icon" width="20" />
			<span>Sign Up With Google</span>
		</a>
	{:else}
		<span>Hello, {data.name}!</span>
	{/if}
	<div class="flex flex-col gap-1 mb-4 items-center">
		<h1 class="under font-bold">Guest List</h1>
		<div class="border-2 p-2">
			{#each users as user}
				<div class="flex gap-2 justify-between items-center">
					<img src={user.picture} alt={`banner for ${user.name}`} width="30" />
					<span>{user.name}</span>
				</div>
			{/each}
		</div>
	</div>
</div>
