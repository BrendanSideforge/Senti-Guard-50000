
<script lang="ts">

    import { supabase } from "../supabase";
    import { user } from "../stores"
    import TopNavbar from "../components/TopNavbar.svelte";

    async function signInWithDiscord() {

        const { user, session, error } = await supabase.auth.signIn({
            provider: "discord"
        }, {
            scopes: "identify guilds email"
        });

    }

    async function signOut() {

        const { error } = await supabase.auth.signOut();

        if (!error) {
            $user = null;
        }

    }

</script>

<TopNavbar />

<div class="guild-jumbotron">

    <h1>Welcome!</h1>
    <p>Senti Guard is the new and improved form of security on Discord.</p>
    <a href="/guilds">View your servers</a>

</div>
