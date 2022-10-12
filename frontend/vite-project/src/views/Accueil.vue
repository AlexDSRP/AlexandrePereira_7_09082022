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
    data: () => {
        return {
            posts: [],
        };
    },

    methods: {
        addPosts(newPost) {
            this.posts.push(newPost);
        },
        deletePost(index) {
            this.posts.splice(index, 1);
        },
    },

    //faire un fetch pour recuperer le post
    //fetch("http://localhost:3000/api/publication")
    mounted() {
        if (localStorage.getItem("token") === null) {
            this.$router.push("identification");
        } else {
            fetch("http://localhost:3000/api/publication", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    this.posts = data;
                })
                .catch((error) => console.log(error));
        }
    },
};
</script>
<template>
    <body>
        <header>
            <Header2 />
        </header>
        <section id="container">
            <CreatePubli @createNewPosts="addPosts" />
            <Publication @deletePost="deletePost" :posts="posts" />
        </section>
    </body>
</template>
<style>
body {
    background-color: rgba(47, 48, 60, 1);
    height: 100vh;
    width: 100%;
}
</style>
