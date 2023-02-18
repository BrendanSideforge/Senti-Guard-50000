
<script lang="ts">
    import "../styles/app.css";
    // import {getUserGuilds } from "../helpers/DiscordOAuth";

    import { onMount } from "svelte";

    import { user } from "../stores";
    import { supabase } from "../supabase"
    import { goto } from "$app/navigation";

    onMount( async () => {

        $user = supabase.auth.session();

		supabase.auth.onAuthStateChange(
			async (_event: any, session: any) => {
				switch(_event) {
                    case "SIGNED_IN":
                        $user = session;

                        // goto("/");
                        break;
                    case "SIGNED_OUT":
                        $user = null;

                        // goto("/");
                        break;
					default:
						break;
				}
			}
		)


    })

</script>

<main>
    <slot />
</main>