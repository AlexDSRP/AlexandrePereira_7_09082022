<script>
export default {
    name: "Publication",

    data: function () {
        return {
            posts: [],
            id: [],
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
    suppPublication() {
        fetch(
            `http://localhost:3000/api/publication/${this.$route.params.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer" + localStorage.getItem("token"),
                },
            }
        )
            .then(localStorage.clear())
            .then(this.$router.push("Accueil"))
            .catch((error) => {
                error;
            });
    },
};
</script>
<template>
    <section id="container">
        <div class="image">
            <!--<img class="images" :src="data.image" alt="images" />-->
        </div>
        <div class="detailPost">
            <div @click="modifPublication" class="modifier">modifier</div>
            <div @click="suppPublication" class="supprimer">supprimer</div>
            <div @click="validPublication" class="valider">valider</div>
            <div class="post">
                <font-awesome-icon icon="fa-regular fa-heart" />
            </div>
        </div>
    </section>
</template>
<style></style>
