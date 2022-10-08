<script>
import dayjs from "dayjs";
import DetailPost from "./DetailPost.vue";

export default {
    name: "Publication",
    data: function () {
        return {
            posts: [],
            id: [],
            commentaire: "",
            dayjs,
            isopen: false,
        };
    },
    props: {
        commentaire: String,
        image: String,
    },
    //faire un fetch pour recuperer le post
    //fetch("http://localhost:3000/api/publication")
    mounted() {
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
    },
    methods: {
        pushPost() {
            this.isopen = !this.isopen;
            console.log(this.isopen);
            window.scrollTo({ top: 0 });
        },
    },
    components: { DetailPost },
};
</script>
<template>
    <div class="container">
        <DetailPost :class="isopen ? 'DetailPost' : 'DetailPostHidden'" />
        <section v-for="data in posts" v-on:click="pushPost" id="container2">
            <div class="infoPublic">
                <h1>{{ data.name }}</h1>
                <p class="date">
                    {{ dayjs(data.date).format("DD-MM-YYYY mm:ss") }}
                </p>
            </div>
            <div class="image">
                <div class="commentaires" :com="commentaire">
                    {{ data.commentaire }}
                </div>
                <img class="images" :src="data.image" alt="images" />
            </div>
        </section>
    </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

.container {
    position: relative;
}
#container2 {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(255, 215, 215, 0.6);
    border-radius: 20px;
    margin-left: 18%;
    margin-right: 18%;
    margin-top: 20px;
    font-family: "Lato", sans-serif;
}
.infoPublic {
    margin-right: 77%;
    margin-top: 12px;
}
.images {
    width: 70%;
    border-radius: 20px;

    box-shadow: 3px 2px 7px rgb(47, 48, 60);
}
.commentaires {
    font-family: "Lato", sans-serif;
}
.image {
    display: flex;
    margin-top: 3%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 4%;
}
.optionPublic {
    margin-top: 20px;
    justify-content: space-between;
    display: flex;
    margin-bottom: 2%;
}
.like {
    font-size: 1.5em;
    margin-right: 27rem;
}
.DetailPostHidden {
    display: none;
}
.DetailPost {
    width: 100vw;
    height: 100vh;
    position: sticky;
    overflow: hidden;
}
</style>
