<script>
import Header2 from "../components/Header2.vue";
import CreatePubli from "../components/CreatePubli.vue";
import Publication from "../components/Publication.vue";
export default {
    components: {
        Header2,
        CreatePubli,
        Publication,
    },
};
</script>
<template>
    <body>
        <header>
            <Header2 />
        </header>
        <section id="container1">
            <CreatePubli />
            <Publication />
        </section>
    </body>
</template>
<style>
body {
    background-color: rgba(47, 48, 60, 0.8);
}
</style>
