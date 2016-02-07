var Opensubtitles = require("../index.js")

subs = new Opensubtitles({
	user: '',
    password: '',
    language: 'en',
    userAgent: 'OSTestUserAgent'
})

var query = {
    imdbid: "tt1844624",
    season: "2",
    episode: "3",
    filename: "American.Horror.Story.S02E03.720p.HDTV.X264-DIMENSION"
}

subs.searchEpisode(query)
    .then(function(result) {
        console.log(result)
    }).fail(function(error) {
        console.log(error)
    })
