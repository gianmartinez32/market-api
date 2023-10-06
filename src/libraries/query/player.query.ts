export const playerQuery = {
    createPlayer: 'select * from insertar_en_player($1);',
    updatePlayer:'select * from actualizar_posicion_puntuacion($1)',
    getPlayerByDocId:'select nombre,puntuacion,posicion from obtener_jugadores_ordenados() ply where ply.id = $1',
    getPlayerList:'select nombre,puntuacion,posicion from obtener_jugadores_ordenados()'

}