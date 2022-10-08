<script>
import Header2 from "../components/Header2.vue";
import DetailPost from "../components/DetailPost.vue";
export default {
    components: {
        Header2,
        DetailPost,
    },
};
</script>
<template>
    <body>
        <header>
            <Header2 />
        </header>
        <section id="container1">
            <DetailPost />
        </section>
    </body>
</template>
<style></style>
