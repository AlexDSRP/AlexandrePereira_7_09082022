<script></script>
<template>
    <header>
        <img
            class="logoHeader"
            src="Images/icon-left-font.png"
            alt="logo de lentreprise"
        />
        <button type="" class="deco">Deconnexion</button>
    </header>
</template>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

header {
    display: flex;
    height: 140px;
    margin: auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 2%;
}
.logoHeader {
    width: 25%;
    margin-top: 2%;
}
.deco {
    border: none;
    background-color: rgba(47, 48, 60, 0);
    color: rgba(255, 215, 215, 0.6);
    font-family: "Lato", sans-serif;
    cursor: pointer;
    position: relative;
    right: 0;
}
</style>
