
<script lang="ts">

    import { page } from "$app/stores";
    import TopNavbar from "../../../components/TopNavbar.svelte";
    import { onMount } from "svelte";
    // @ts-ignore
    import { v4 as uuidv4 } from 'uuid'; 
    import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

    // import Recaptcha from "svelte-recaptcha-v2";

    import { getGuildById, getUserGuilds } from "../../../helpers/DiscordOAuth";
    import { finishVerification, getVerificationSettings } from "../../../helpers/VerificationSettings";

    import { user } from "../../../stores";

    const captchaKey: string = "6LdwaicaAAAAAEPLgrF7Ip8SiGOJ678r91D1a5HB";
    let guildID: any = $page.params['id'];
    let guild: object | any;

    let verificationSettings: object | any;
    let successfulVerification: boolean = false;
    let ipAddress: string | null | undefined;
    let cookie: string | null | undefined;
    let fingerprint: string | null | undefined;



    async function verifyUser(token: any) {
        
        // complex way to say, if it's not none lol
        if (!(!token)) {
            successfulVerification = true;
        }

        await finishVerification(
            guildID,
            $user.user.user_metadata.provider_id,
            ipAddress,
            cookie,
            fingerprint
        );

    }

    function setCookie(name: string, value: string, daysToLive: number) {
        // Encode value in order to escape semicolons, commas, and whitespace
        var cookie = name + "=" + encodeURIComponent(value);
        
        if(typeof daysToLive === "number") {
            /* Sets the max-age attribute so that the cookie expires
            after the specified number of days */
            cookie += "; max-age=" + (daysToLive*24*60*60);
            
            document.cookie = cookie;
        }
    }

    function getCookie(name: string) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
        
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
            
            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
        
        // Return null if not found
        return null;
    }

    onMount(async() => {
        
        // @ts-ignore
        window.verifyUser = verifyUser;

        // Initialize an agent at application startup.
        const fpPromise = FingerprintJS.load({
            apiKey: "FaeSCHk2vWZjSJGUaq3w"
        });

        fpPromise
        .then(fp => fp.get())
        .then(result => {
            setCookie("fingerprint", result.visitorId, 50505050505050505)
        });
        
        const cookieFingerprintValue = getCookie("coupon_code");
        const fingerPrintValue = getCookie("fingerprint");
        ipAddress = getCookie("hashed_ip_address");
        fingerprint = fingerPrintValue;
        
        if (!cookieFingerprintValue) {
            const code: any = uuidv4();
            setCookie(
                "coupon_code",
                code,
                50405050505050505050
            );

            cookie = code;
        } else {
            cookie = cookieFingerprintValue;
        }

        setTimeout(async () => {

            if (!$user.guilds) {
                const guilds: any = await getUserGuilds(
                    $user.provider_token || $user.access_token
                );
                $user.guilds = guilds;
            }

            guild = await getGuildById(
                guildID,
                $user.guilds
            );

            if (guild) {

                verificationSettings = await getVerificationSettings(guild.id);

                // @ts-expect-error
                window.grecaptcha.ready(() => {// @ts-expect-error
                    grecaptcha.render('captcha-box', { sitekey: captchaKey })
                });
            }

        }, .5);

    });

</script>

<svelte:head>
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</svelte:head>

<TopNavbar />

{#if guild} 


{#if verificationSettings}

    {#if verificationSettings.data.length > 0}

        <!-- <p>{ JSON.stringify(verificationSettings.data[0]) }</p> -->

        {#if !successfulVerification }
            <div class="container">

                <img src="https://cdn.discordapp.com/attachments/1008570864641519740/1044857113647792228/unknown.png" alt="shield">
                <h1>Hey there, <strong>{ $user.user.user_metadata.full_name}</strong>!</h1>
                <p>This server requires their members to complete a web-verification process.</p>

                <div id="captcha-box" data-callback="verifyUser"></div>
            </div>
        
        {:else}

            <div class="container">

                <img src="https://cdn.discordapp.com/attachments/1008570864641519740/1044857668868775956/unknown.png" alt="check mark">
                <h1>Congratulations, <strong>{ $user.user.user_metadata.full_name}</strong>!</h1>
                <p>You have been successfully verified, thank you for your time.</p>
                <!-- <div id="captcha-box" data-callback="verifyUser"></div> -->
            </div>

        {/if}

    {:else}

        <div class="container">

            <h1>Oops... verification not configured</h1>
            <p>Verification for this guild has not been configured.</p>

        </div>
        
    {/if}
{/if}


{:else}
    <div class="container">

        <h1>Oops... guild not found</h1>
        <p>Looks like you're not a member of this guild!</p>

    </div>
{/if}

<style>

    .container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container h1 {
        color: white;
        margin-bottom: 10px;
    }

    .container p {
        margin-left: auto;
        margin-right: auto;
        color: rgba(255, 255, 255, 0.4);
        font-size: 17px;
    }

    .container img {
        height: 100px;
        width: 100px;
        margin-bottom: 20px;
    }

    .container div {
        margin-top: 35px;
    }

</style>