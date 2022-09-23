<script></script>
<template>
    <section id="container2">
        <div class="infoPublic">
            <h1>{{ nom }}Alexandre Pereira</h1>
            <div class="date">{{ date }}22 septembre à 17h00</div>
        </div>
        <div class="image">
            {{ image
            }}<img class="images" src="Images/fondProjet7.jpeg" alt="images" />
        </div>
        <div class="optionPublic">
            <div class="like">
                <font-awesome-icon icon="fa-regular fa-heart" />
            </div>
            <div class="modifSupp">
                <div class="modifier">modifier</div>
                <div class="supprimer">supprimer</div>
            </div>
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
}
.image {
    display: flex;
    justify-content: center;
    margin-top: 3%;
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
.modifSupp {
    display: flex;
}
.modifier {
    margin-right: 10%;
    background-color: #4e5166;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    box-shadow: 3px 2px 7px #4e5166;
}
.supprimer {
    background-color: #4e5166;
    padding: 5px 10px 5px 10px;
    border-radius: 5px;
    box-shadow: 3px 2px 7px #4e5166;
}
</style>
