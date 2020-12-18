export const catchError = {
   	catch: (err) => {
        this.$bus.emit("notifications:push", {
            type: 'dark',
            title: 'Noticia!',
            message: 'Se perfil fue actualizado correctamente!'
        })
    }
}
