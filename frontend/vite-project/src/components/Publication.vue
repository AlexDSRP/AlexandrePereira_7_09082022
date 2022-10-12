<script>
import dayjs from "dayjs";

export default {
    name: "Publication",
    data: function () {
        return {
            id: [],
            dayjs,
            isopen: false,
            comment: "",
            like: "",
        };
    },
    props: ["posts"],
    methods: {
        modifPublication(e) {
            this.isopen = !this.isopen;
            const element = e.target;
            const post = element.closest("#container2");
            const comm = post.querySelector(".comm");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");
            const userId = post
                .querySelector(".infoPublic")
                .getAttribute("userId");
            localStorage.setItem("postId", postId);
            localStorage.setItem("userId", userId);

            console.log(post, comm, postId);
        },
        envoyer(e) {
            e.preventDefault();
            console.log(localStorage.getItem("token"));
            const id = localStorage.getItem("postId");
            const userId = localStorage.getItem("userId");
            const dataForm = new FormData();
            dataForm.append("userId", userId);
            dataForm.append("commentaire", this.comment);
            console.log(id);

            fetch(`http://localhost:3000/api/publication/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: dataForm,
            })
                .then((res) => {
                    if (res.status !== 200) {
                        alert(
                            "Vous n'avez pas la permission de modifier cette publication."
                        );
                    } else {
                        this.$emit("addPost", res.json());
                    }
                })
                .catch((error) => console.error(error));
        },
        suppPublication(e) {
            const element = e.target;
            const post = element.closest("#container2");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");
            const userId = post
                .querySelector(".infoPublic")
                .getAttribute("userId");

            const formData = new FormData();
            formData.append("userId", userId);
            console.log(formData.get("userId"));

            fetch(`http://localhost:3000/api/publication/${postId}`, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: formData,
            })
                .then((res) => {
                    if (res.status != 200) {
                        alert(
                            "Vous n'avez pas la permission de supprimer cette publication"
                        );
                    } else {
                        this.posts.splice(
                            this.posts.findIndex((post) => post._id === id),
                            1
                        );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        likes(e) {
            e.target.class === "like"
                ? (e.target.class = "noLiked")
                : (e.target.class = "like");
            console.log(e.target.class);
            this.like = e.target.class === "like" ? 1 : 0;
            const element = e.target;
            const post = element.closest("#container2");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");

            localStorage.setItem("postId", postId);
            const id = localStorage.getItem("postId");
            const dataForm = new FormData();
            dataForm.append("likes", this.like);

            fetch(`http://localhost:3000/api/publication/like/${id}`, {
                method: "Post",
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: dataForm,
            })
                .then((response) => {
                    return response.json();
                })

                .catch((error) => console.log(error));
            console.log(dataForm.get("likes"));
        },
    },
};
</script>
<template>
    <form :class="isopen ? 'comm' : 'texte'" method="PUT">
        <input type="text" v-model="comment" />
        <input type="submit" @click="envoyer" />
    </form>

    <section v-for="data in posts" id="container2" :key="data._id">
        <div class="infoPublic" :postId="data._id" :userId="data.userId">
            <h1>{{ data.name + " " + data.firstName }}</h1>
            <p class="date">
                {{ dayjs(data.date).format("DD-MM-YYYY hh:mm") }}
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
            <font-awesome-icon
                icon="fa-regular fa-heart"
                class="noLike"
                @click="likes"
            />
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
