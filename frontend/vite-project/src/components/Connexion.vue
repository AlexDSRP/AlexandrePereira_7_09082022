<script></script>

<template>
    <form class="bloc1co" method="post">
        <label for="Connexion">
            <input type="submit" class="inputbouton" value="CONNEXION" />
        </label>
        <label for="Adresse mail">
            <input type="email" class="input" placeholder="Adresse mail" />
        </label>
        <label for="Mot de passe">
            <input type="password" class="input" placeholder="Mot de passe" />
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
