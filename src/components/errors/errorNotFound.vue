<template>
    <div class="container">
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>4<span></span>4</h1>
                </div>
                <h2>¡Ups! Página no encontrada</h2>
                <p>
                    Lo sentimos, pero la página que está buscando no existe, se ha eliminado. nombre cambiado o no está disponible temporalmente
                </p>
                <router-link :to="{name: 'home'}">
                    Volver a la página de inicio
                </router-link>
            </div>
        </div>
    </div>
</template>