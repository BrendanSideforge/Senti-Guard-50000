
<script lang="ts">

    import "../styles/TopNavbar.css";

    import { supabase } from "../supabase";
    import { user } from "../stores";

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

    console.log($user);

</script>

<div class="navbar-container">

    <div class="navbar">

        <div class="items">

            <div class="branding">
                <a href="/">Senti Guard</a>
            </div>

        </div>

        <div class="user-interaction">

            {#if Object.keys($user).length > 0} 
                
                <div class="user-info">

                    <img src={$user.user.user_metadata.picture} alt="user avatar">
                    <p>{$user.user.user_metadata.full_name}</p>

                    <button
                        on:click={async () => { await signOut() }}
                        class="logout"
                     >Logout</button>
                    
                </div>

            {:else}

                <button
                    on:click={async () => { await signInWithDiscord() }}
                    class="login"
                >Login</button>

            {/if}

        </div>

    </div>

</div>
