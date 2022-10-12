<script>
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
    <div class="body">
        <div class="identification">
            <header>
                <Header />
            </header>
            <section id="container1">
                <Connexion />
                <Inscription />
            </section>
        </div>
    </div>
</template>

<style>
.body {
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
