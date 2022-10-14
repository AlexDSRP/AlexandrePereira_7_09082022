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
            window.scrollTo({ top: 0 });
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
                    this.$emit("updatePost", id, dataForm.get("commentaire"));
                    if (res.status !== 200) {
                        alert(
                            "Vous n'avez pas la permission de modifier cette publication."
                        );
                    }
                })
                .catch((error) => console.error(error));
        },
        suppPublication(e) {
            console.log("test");
            const element = e.target;
            const post = element.closest("#container2");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");
            const userId = post
                .querySelector(".infoPublic")
                .getAttribute("userId");

            const formData = {
                userId: userId,
            };

            fetch(`http://localhost:3000/api/publication/${postId}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(formData),
            })
                .then((res) => {
                    if (res.status != 200) {
                        alert(
                            "Vous n'avez pas la permission de supprimer cette publication"
                        );
                    } else {
                        const index = this.posts.findIndex(
                            (post) => post._id === postId
                        );

                        this.$emit("deletePost", index);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        closeModif() {
            this.isopen = false;
        },
        likes(e) {
            const userId = localStorage.getItem("userId");
            const element = e.target;
            const post = element.closest("#container2");
            const postId = post
                .querySelector(".infoPublic")
                .getAttribute("postId");

            const index = this.posts.findIndex((post) => post._id === postId);

            const arrayLike = JSON.parse(
                JSON.stringify(this.posts[index].usersLiked)
            );

            arrayLike.includes(userId) ? (this.like = -1) : (this.like = 1);

            console.log(this.like);

            const dataForm = {
                like: this.like,
                userId: userId,
            };
            fetch(`http://localhost:3000/api/publication/like/${postId}`, {
                method: "Post",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(dataForm),
            })
                .then((response) => {
                    return response.json();
                })
                .then(() => {
                    this.$emit("likePost", index, this.like, userId);
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>
<template>
    <form :class="isopen ? 'commModif' : 'texte'" method="PUT">
        <div class="inputModif">
            <input type="text" v-model="comment" />
            <input type="submit" @click="envoyer" />
            <p class="closeModif" @click="closeModif">X</p>
        </div>
    </form>
    <div class="postContainer">
        <section v-for="data in posts" id="container2" :key="data._id">
            <div class="infoPublic" :postId="data._id" :userId="data.userId">
                <h1 :usersLiked="usersLiked" class="nameinfo">
                    {{ data.name + " " + data.firstName }}
                </h1>
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
                    v-if="data.isLiked === false"
                    icon="fa-regular fa-heart"
                    class="noLike"
                    @click="likes"
                />
                <font-awesome-icon
                    v-if="data.isLiked === true"
                    icon="fa-regular fa-heart"
                    class="like"
                    @click="likes"
                />
                <p>{{ data.likes }}</p>
            </div>
        </section>
    </div>
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
    font-size: 1.5rem;
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
    color: white;
}
.supprimer {
    background-color: #4e5166;
    margin-left: 10px;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    color: white;
}
.like {
    color: red;
    margin-top: 4px;
    font-size: 1.5em;
    cursor: pointer;
    background-color: rgba(255, 215, 215, 0);
    border: none;
}
.commModif {
    display: flex;
    justify-content: center;
    width: 100%;
}
.inputModif {
    display: flex;
    justify-content: center;
    position: relative;
    background-color: rgba(255, 215, 215, 0.6);
    margin-top: 20px;
    margin-bottom: 0;
    padding: 20px;
    width: 30%;
}
.closeModif {
    position: absolute;
    cursor: pointer;
    font-family: "Lato", sans-serif;
    font-size: 20px;
    top: 2px;
    right: 2px;
}
.noLike {
    font-size: 1.5rem;
    margin-top: 3px;
    cursor: pointer;
}
</style>
