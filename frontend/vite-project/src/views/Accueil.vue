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
    <header>
        <Header2 />
    </header>
    <section id="container1">
        <CreatePubli />
        <!--<Publication />-->
    </section>
</template>
<style></style>
