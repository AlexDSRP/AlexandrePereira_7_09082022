<script>
import { includeBooleanAttr } from "@vue/shared";

export default {
    name: "createPost",

    data: function () {
        return {
            commentaire: "",
            image: null,
        };
    },
    methods: {
        imageForm(event) {
            this.image = event.target.files[0];
            console.log(this.image);
        },

        createPost(event) {
            event.preventDefault();
            const dataForm = new FormData();
            dataForm.append("commentaire", this.commentaire);
            dataForm.append("image", this.image);
            console.log(dataForm);

            fetch("http://localhost:3000/api/publication", {
                method: "Post",
                credentials: "include",
                body: dataForm,
            })
                .then((response) => {
                    response.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>
<template>
    <form class="creerPubli" @submit="createPost" method="post">
        <div class="bloc1">
            <label for="commentaires">
                <input
                    type="text"
                    name="commentaires"
                    v-model="commentaire"
                    class="commentaire"
                    placeholder="Commentaires..."
                />
            </label>
        </div>
        <div class="imgbutton">
            <label for="comment" class="imagebut">
                <font-awesome-icon
                    icon="fa-regular fa-image"
                    class="iconeimg"
                />
                <input
                    type="file"
                    @change="imageForm"
                    name="inserezimage"
                    class="commentaire"
                    id="comment"
                />
                <div class="text">Images</div>
            </label>
            <label for="bouton" class="imagebut">
                <font-awesome-icon
                    icon="fa-regular fa-paper-plane"
                    class="iconeimg"
                />
                <input
                    type="submit"
                    id="bouton"
                    value="Ajoutez une publication"
                />
                <div class="text">Envoyer</div>
            </label>
        </div>
    </form>
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
.creerPubli {
    display: flex;
    flex-direction: column;
    background-color: rgba(255, 215, 215, 0.6);
    align-items: center;
    border-radius: 20px;
    margin-left: 18%;
    margin-right: 18%;
}

.bloc1 {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-top: 20px;
}
.commentaire {
    background-color: #4e5166;
    border: none;
    border-radius: 15px;
    margin-bottom: 13px;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    font-family: "Lato", sans-serif;
    box-shadow: 3px 2px 7px #4e5166;
}
#comment {
    display: none;
}
.imagebut {
    cursor: pointer;
    display: flex;
    background-color: #4e5166;
    border-radius: 10px;
    box-shadow: 3px 2px 7px #4e5166;
    align-items: center;
    flex-direction: row;
    margin-right: 20px;
    margin-bottom: 20px;
}
.iconeimg {
    font-size: 25px;
    margin: 5% 10% 5% 10%;
}
#bouton {
    display: none;
}
.imgbutton {
    display: flex;
}
.text {
    font-family: "Lato", sans-serif;
    margin-right: 30px;
}
</style>
