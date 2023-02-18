
<script lang="ts">
    export let guild: object | any;
</script>

{#if guild} 

    <div class="guild">
        <a href={ `/guilds/${guild.id}` }>
            <div class="guild-contents">

                <img src={ `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.jpg` } alt="guild image">
                <p>{ guild.name }</p>

            </div>
        </a>
    </div>

{/if}

<style>

    .guild { 
        background-color: rgb(32, 34, 37);
        border-radius: 5px;
    }

    .guild a { 
        text-decoration: none;
    }

    .guild .guild-contents {
        display: flex;
        flex-direction: row;
        padding: 10px;
        align-items: center;
    }

    .guild .guild-contents img {
        border-radius: 50%;
        height: 50px;
        width: 50px;
    }

    .guild .guild-contents p {
        color: #ccc;
        font-weight: 500;
        margin-left: 10px;
        font-size: 18px;
    }

</style>
