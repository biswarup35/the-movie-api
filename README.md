<h1 align="center">The Movie API</h1>
<p>This is a RESTful API for the movie database of Marvel Cinematic Universe.</p>

<h2>End Points</h2>
<h3><code>/shows</code></h3>
<p>Returns a list of all the shows in the database.</p>

```js
// Example response
{
    movies: [
        {
            title: "The Marvels (2023)",
            slug: "/m/the_marvels",
            show_id: "the_marvels",
            image: "image url",
            rating: "n/a"
        },
    ], // An array of all the movies of Marvel Cinematic Universe including upcoming movies.
    tv: [
        {
            title: "WandaVision (2021)",
            slug: "/tv/wandavision",
            show_id: "wandavision",
            image: "image url",
            rating: "88%"
        },
    ], // An array of all the TV shows of Marvel Cinematic Universe
},
```

<h3><code>/movies?show_id=iron_man_3</code></h3>
<p>
</p>

```js
// Example response
{
    poster: string, // Poster URL
    synopsis: string, // Movie Plot or description
    meta: [
       {
        label: "Rating",
        value: "PG-13 (Intense Sci-Fi Action/Violence|Brief Suggestive Content)"
        },
    ], // Meta description of the movie
    cast: [
        {
            name: "Robert Downey Jr.",
            character: "Tony Stark",
            image: "image url"
        },
    ], // Cast of the movie

}
```

<h2>Tech Stack</h2>
<p>
    This API is built with Node.js, Express.js, Axios and JSDOM. The API is hosted on Heroku. </p>
