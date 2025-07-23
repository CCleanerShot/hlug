<script lang="ts">
	import type { PageProps } from './$types';
	import google from '$lib/images/google.png';

	let { data }: PageProps = $props();
	const { description, oauth_google, title } = data;

</script>

<div class="flex justify-center p-2">
	<a class="border-2 rounded-md p-1 flex gap-8 items-center justify-between" href={oauth_google}>
		<img src={google} alt="google icon" width="20" />
		<span>Sign Up With Google</span>
	</a>
</div>
