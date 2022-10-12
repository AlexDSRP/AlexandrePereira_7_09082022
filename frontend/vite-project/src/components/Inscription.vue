<script>
export default {
    name: "Inscription",

    // je recupere les données avec un data
    data: function () {
        return {
            nom: "",
            prenom: "",
            email: "",
            motDePasse: "",
        };
    },

    computed: {},

    //ensuite je fais une methodes avec la fonction "createAccount()"
    //dans ma fonction je ferai un fetch
    methods: {
        createAccount(event) {
            event.preventDefault();
            const descriptionForm = document.querySelector(".bloc2inscrpt");
            const formData = {
                name: this.nom,
                firstName: this.prenom,
                email: this.email,
                password: this.motDePasse,
            };
            fetch("http://localhost:3000/api/auth/signup", {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then(() => {
                    descriptionForm.reset();
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>

<template>
    <form class="bloc2inscrpt" @submit="createAccount" method="post">
        <label for="Inscription">
            <input type="submit" class="inputbouton" value="INSCRIPTION" />
        </label>
        <label for="Nom">
            <input
                type="text"
                v-model="nom"
                class="input"
                placeholder="Nom"
                required
            />
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
