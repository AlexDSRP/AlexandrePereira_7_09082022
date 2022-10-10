<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Header from "../components/Header.vue";
import Connexion from "../components/Connexion.vue";
import Inscription from "../components/Inscription.vue";
export default {
    components: {
        Header,
        Connexion,
        Inscription,
    },
};
</script>

<template>
    <body>
        <div class="identification">
            <header>
                <Header />
            </header>
            <section id="container1">
                <Connexion />
                <Inscription />
            </section>
        </div>
    </body>
</template>

<style>
body {
    background-image: url(images/fondProjet7.jpeg);
    height: 100vh;
    width: 100%;
}
.identification {
    background-color: rgba(234, 51, 35, 0.7);
    height: 100vh;
}
#container1 {
    display: flex;
    justify-content: space-around;
}
</style>
