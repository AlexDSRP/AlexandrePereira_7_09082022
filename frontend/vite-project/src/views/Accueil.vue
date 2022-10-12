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
        likePost(id, like) {
            this.posts.filter((post) => {
                if (post._id === id) {
                    console.log(post._id === id);
                    post.likes += like;
                    console.log(post.usersLiked.length);
                }
            });
        },
        addPosts(newPost) {
            this.posts.push(newPost);
            this.posts.sort(function sortByDate(a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        },
        deletePost(index) {
            this.posts.splice(index, 1);
        },
        updatePost(id, commentaire) {
            this.posts.filter((post) => {
                if (post._id === id) {
                    post.commentaire = commentaire;
                }
            });
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
                    this.posts = data;
                    this.posts.sort(function sortByDate(a, b) {
                        return new Date(b.date) - new Date(a.date);
                    });
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
            <CreatePubli @addPosts="addPosts" />
            <Publication
                @deletePost="deletePost"
                :posts="posts"
                @updatePost="updatePost"
                @likePost="likePost"
            />
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
