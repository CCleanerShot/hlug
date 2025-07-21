<script lang="ts">
	import { onMount } from 'svelte';
	import { initGoogle } from '$lib/google-maps';
	import { meetups } from '$lib/locations';
	import type { Meetup } from '$lib/types';

	let currentLocation: Meetup | undefined = $state(undefined);
	let sidebarOpened: boolean = $state(true);

	onMount(async () => {
		await initGoogle();
		const google = (globalThis as any).google as any;
		const { Map } = await google.maps.importLibrary('maps');
		const { LatLngBounds } = await google.maps.importLibrary('core');
		const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

		const bounds = new LatLngBounds();
		// Center of Houston, TX
		const position = new google.maps.LatLng(29.7601, -95.3701);
		const map = new Map(document.getElementById('map'), {
			center: position,
			mapId: 'map-iframe',
			zoom: 12
		});

		meetups.forEach((meetup) => {
			const location = new google.maps.LatLng(meetup.coords.lat, meetup.coords.long);
			const markerView = new AdvancedMarkerElement({
				map: map,
				position: location,
				title: meetup.name
			});
			markerView.element.setAttribute('data-restaurant-name', meetup.name);
			console.log(markerView.element);
			markerView.addEventListener('click', (e: any) => {
				const data = e.target.getAttribute('data-restaurant-name');
				currentLocation = meetups.find((e) => e.name === data);
			});

			bounds.extend(location);
		});

		map.fitBounds(bounds);
	});

	$effect(() => {
		if (currentLocation !== undefined) {
			sidebarOpened = true;
		}
	});

	const onclick = (meetup: Meetup) => {
		currentLocation = meetup;
	};
</script>

<div>
	<div class="w-screen h-screen" id="map"></div>
	<div
		class={[
			'absolute top-0 z-10 flex flex-col',
			sidebarOpened ? 'h-screen left-0 w-[380px]' : 'left-[215px]'
		]}
		id="sidebar"
	>
		<div
			class={[
				'flex gap-1 p-3 justify-end items-center',
				sidebarOpened ? 'invert-100 bg-white' : ''
			]}
			id="sidebar-header"
		>
			<h1 class="font-bold text-2xl">Meetups</h1>
			<button
				class="bg-white text-black relative border-2 border-black rounded-full font-bold p-4 transition-all hover:invert-100"
				id="sidebar-close"
				onclick={() => (sidebarOpened = !sidebarOpened)}
			>
				<span class="absolute top-1/2 left-1/2 -translate-1/2">⇅</span>
			</button>
		</div>
		{#if sidebarOpened}
			<div class="flex-1 bg-white/80" id="sidebar-content">
				<div class="flex items-start flex-col gap-2 p-1" id="sidebar-meetups">
					{#each meetups as meetup}
						<button
							class={[
								'border-2 border-black w-full hover:bg-black hover:text-white focus:bg-black focus:text-white',
								currentLocation?.name === meetup.name ? ' bg-green-500 text-white' : ''
							]}
							onclick={() => onclick(meetup)}
						>
							{meetup.name}
						</button>
					{/each}
				</div>
				<div class="m-1 border border-black"></div>
				{#if currentLocation}
					<div class="p-1 flex flex-col *:justify-between *:w-full *:not-last:border-b *:not-last:border-dashed *:not-last:border-black *:items-center *:flex *:*:first:font-bold *:*:last:text-sm" id="sidebar-info">
						<div>
							<span>Name:</span>
							<span>{currentLocation.name}</span>
						</div>
						<div>
							<span>Address:</span>
							<span>{currentLocation.address}</span>
						</div>
						<div>
							<span>Pros:</span>
							<ul>
								{#each currentLocation.overview.pros as pro}
									<li class="text-green-600">{pro}</li>
								{/each}
							</ul>
						</div>
						<div>
							<span>Cons: </span>
							<ul>
								{#each currentLocation.overview.cons as con}
									<li class="text-red-600">{con}</li>
								{/each}
							</ul>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>