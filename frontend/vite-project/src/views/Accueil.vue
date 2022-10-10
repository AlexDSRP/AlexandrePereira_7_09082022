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
    <div class="body1">
        <header>
            <Header2 />
        </header>
        <section id="container">
            <CreatePubli />
            <Publication />
        </section>
    </div>
</template>
<style>
.body1 {
    background-color: rgba(47, 48, 60, 0.9);
}
</style>
