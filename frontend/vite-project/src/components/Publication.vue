<script>
import dayjs from "dayjs";

export default {
    name: "Publication",
    data: function () {
        return {
            posts: [],
            id: [],
            dayjs,
            isopen: false,
            comment: "",
            like: 0,
        };
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
        modifPublication(e) {
            this.isopen = !this.isopen;
            const element = e.target;
            const post = element.closest("#container2");
            const comm = post.querySelector(".comm");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");
            localStorage.setItem("postId", postId);

            console.log(post, comm, postId);
        },
        envoyer(e) {
            e.preventDefault();
            const id = localStorage.getItem("postId");
            const dataForm = new FormData();
            dataForm.append("commentaire", this.comment);
            console.log(dataForm);
            fetch(`http://localhost:3000/api/publication/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("token"),
                },
                body: dataForm,
            });
        },
        /*suppPublication() {
            const id = localStorage.getItem("postId");
            const dataForm = new FormData();
            dataForm.append("commentaire", this.commentaire);
            dataForm.append("image", this.image);
            console.log(dataForm);
            fetch(`http://localhost:3000/api/publication/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("token"),
                },
                body: dataForm,
            })
                .then(localStorage.clear())
                .then(this.$router.push("Accueil"))
                .catch((error) => {
                    error;
                });
        },*/
        likes() {
            const id = localStorage.getItem("postId");
            const dataForm = new FormData();
            dataForm.append("likes", this.like);
            console.log(like);
            fetch(`http://localhost:3000/api/publication/${id}/like`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("token"),
                },
                body: dataForm,
            });
        },
    },
};
</script>
<template>
    <form :class="isopen ? 'comm' : 'texte'">
        <input type="text" v-model="comment" />
        <input type="submit" @submit="envoyer" />
    </form>

    <section v-for="data in posts" id="container2">
        <div class="infoPublic" :postId="data._id">
            <h1>{{ data.name }}</h1>
            <p class="date">
                {{ dayjs(data.date).format("DD-MM-YYYY mm:ss") }}
            </p>
        </div>
        <div class="image">
            <div class="comm" :com="commentaire">
                {{ data.commentaire }}
            </div>
            <img class="images" :src="data.image" alt="images" />
        </div>
        <div class="detailpost">
            <div @click="modifPublication" class="modifier">modifier</div>
            <div @click="suppPublication" class="supprimer">supprimer</div>
            <button type="submit" class="like" @click="likes">
                <font-awesome-icon icon="fa-regular fa-heart" />
            </button>
        </div>
    </section>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");

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
    margin-top: 3%;
}
.comm {
    font-family: "Lato", sans-serif;
}
.texte {
    display: none;
}
.image {
    display: flex;
    margin-top: 3%;
    flex-direction: column;
    align-items: center;
    margin-bottom: 3%;
}
.detailpost {
    display: flex;
    flex-direction: row-reverse;
    margin-bottom: 3%;
}
.modifier {
    background-color: #4e5166;
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.supprimer {
    background-color: #4e5166;
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    cursor: pointer;
}
.like {
    color: rgb(47, 48, 60);
    margin-top: 4px;
    font-size: 1.5em;
    cursor: pointer;
    background-color: rgba(255, 215, 215, 0);
    border: none;
}
</style>
