<script>
//import { mapState } from "vuex";
export default {
    name: "Inscription",

    data: function () {
        return {
            prenom: "",
            nom: "",
            email: "",
            motDePasse: "",
        };
    },

    //...mapState(["status"]),
};

// je recupere les données avec un data
//ensuite je fais une methodes
</script>

<template>
    <form class="bloc2inscrpt" method="post">
        <label for="Inscription">
            <input
                type="submit"
                @submit="createAcount()"
                class="inputbouton"
                value="INSCRIPTION"
            />
        </label>
        <label for="Nom">
            <input type="text" v-model="nom" class="input" placeholder="Nom" />
        </label>
        <label for="Prenom">
            <input
                type="text"
                v-model="prenom"
                class="input"
                placeholder="Prenom"
            />
        </label>
        <label for="Adresse mail">
            <input
                type="email"
                v-model="email"
                class="input"
                placeholder="Adresse mail"
            />
        </label>
        <label for="Mot de passe">
            <input
                type="password"
                v-model="motDePasse"
                class="input"
                placeholder="Mot de passe"
            />
        </label>
    </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Lato&display=swap");
.bloc2inscrpt {
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    margin-right: 15%;
}
.input {
    background-color: #d9d9d9;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    padding: 15px;
    width: 15rem;
    font-family: "Lato", sans-serif;
    box-shadow: 3px 2px 7px #9e9c9c;
}
.inputbouton {
    background-color: #d9d9d9;
    border: none;
    border-radius: 15px;
    margin-bottom: 5%;
    padding: 15px;
    width: 10rem;
    font-family: "Lato", sans-serif;
    font-weight: bold;
    box-shadow: 3px 2px 7px #9e9c9c;
    cursor: pointer;
}
</style>
