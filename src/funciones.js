export const obtenerTodo = async( setPodcast ) => {
    const peticion = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    const {feed} = await peticion.json();
    setPodcast(feed);

};