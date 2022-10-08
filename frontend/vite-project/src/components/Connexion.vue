<script>
export default {
    name: "Connexion",

    // je recupere les données avec un data
    data: function () {
        return {
            email: "",
            motDePasse: "",
        };
    },

    computed: {},

    //ensuite je fais une methodes avec la fonction "createAccount()"
    //dans ma fonction je ferai un fetch
    methods: {
        connexionAccount(event) {
            event.preventDefault();
            //const descriptionForm = document.querySelector(".bloc1co");
            const formData = {
                email: this.email,
                password: this.motDePasse,
            };
            fetch("http://localhost:3000/api/auth/login", {
                method: "Post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
                .then((response) => {
                    if (response.status === 200) {
                        this.$router.push({ name: "Accueil" });
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => console.log(error));
        },
    },
};
</script>

<template>
    <form class="bloc1co" @submit="connexionAccount" method="post">
        <label for="Connexion">
            <input type="submit" class="inputbouton" value="CONNEXION" />
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
.bloc1co {
    display: flex;
    flex-direction: column;
    margin-top: 10%;
    border-right: 3px solid #d9d9d9;
    padding-right: 11%;
    margin-left: 15%;
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
