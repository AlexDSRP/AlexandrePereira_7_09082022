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
        likePost(index, like, userId) {
            if (like === 1) {
                this.posts[index].usersLiked.push(userId);
                this.posts[index].likes += like;
                this.posts[index].isLiked = true;
            } else {
                this.posts[index].usersLiked.filter((user) => {
                    if (user === userId) {
                        const userIndex =
                            this.posts[index].usersLiked.indexOf(user);
                        this.posts[index].usersLiked.splice(userIndex, 1);
                        this.posts[index].likes += like;
                        this.posts[index].isLiked = false;
                    }
                });
            }
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
            const userId = localStorage.getItem("userId");
            fetch("http://localhost:3000/api/publication", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    const newData = [];
                    data.forEach((post) => {
                        post = {
                            ...post,
                            isLiked: post.usersLiked.includes(userId),
                        };
                        newData.push(post);
                    });
                    this.posts = newData;

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
