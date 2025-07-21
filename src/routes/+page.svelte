<script lang="ts">
	import { onMount } from "svelte";
	import { initGoogle } from "$lib/google-maps";

    onMount(async () => {
        await initGoogle();
        const google = ((globalThis as any).google as any)
        const { Map } = await google.maps.importLibrary('maps');
        const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
        const { Place, SearchNearbyRankPreference } = await google.maps.importLibrary('places');

        // Center of Houston, TX
        const position = new google.maps.LatLng(29.7601, -95.3701);

        const test = new Map(document.getElementById("map"), {center: position, mapId: "map-iframe", zoom: 11});
    })
        
</script>

<div>
    <div id="sidebar"></div>
    <div id="map"></div>
</div>

<style>
    #map {
        height: 100vh;
        width: 100vw;
    }
</style>