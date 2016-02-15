# opensubtitles-js
**[Opensubtitles.org](http://opensubtitles.org) API wrapper for Node.js**

<img src="http://static.opensubtitles.org/gfx/logo.gif" />

## Example usage

#### Setup
    npm install opensubtitles-js
    
#### Login
```js
var Opensubtitles = require('opensubtitles-js');

var subs = new Opensubtitles({
    user: 'username',
    password: 'password',
    language: 'en',
    userAgent: 'OSTestUserAgent'
})

subs.login()
    .then(function(token) {
        console.log(token)
    }).fail(function(error) {
        console.log(error)
    })
```

Example output:
```js
tokenid1234567890
```

#### Search Episodes
```js
var Opensubtitles = require('opensubtitles-js');

var subs = new Opensubtitles()

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
```

Example output:
```js
Object {
    pt: {
        url: 'http://dl.opensubtitles.org/en/download/filead/src-api/subs_name.srt',
        lang: 'pt',
        downloads: '56',
        score: 0
    },
    nl: {
        url: 'http://dl.opensubtitles.org/en/download/filead/src-api/subs_name.srt',
        lang: 'nl',
        downloads: '1598',
        score: 100
    },
    es: {
        url: 'http://dl.opensubtitles.org/en/download/filead/src-api/subs_name.srt',
        lang: 'es',
        downloads: '1576',
        score: 100
    }
}
```

#### All Methods

*NOTE: Example outputs for these methods can be found at [Opensubtitles' documentation](http://trac.opensubtitles.org/projects/opensubtitles/wiki/XMLRPC)*

- LogIn(username, password, language, useragent)
- LogOut(token)
- SearchSubtitles(token, queries)
- SearchToMail(token, langs, movies)
- CheckSubHash(token, subsHash)
- CheckMovieHash(token, moviesHash)
- CheckMovieHash2(token, moviesHash)
- InsertMovieHash(token, moviesInfo)
- TryUploadSubtitles(token, sub)
- UploadSubtitles(token, sub)
- DetectLanguage(token, texts)
- DownloadSubtitles(token, subid)
- ReportWrongMovieHash(token, IDSubMovieFile)
- ReportWrongImdbMovie(token, movie)
- GetSubLanguages(language)
- GetAvailableTranslations(token, program)
- GetTranslation(token, iso639, format, program)
- SearchMovieOnIMDB(token, query)
- GetIMDBMovieDetails(token, imdbid)
- InsertMovie(token, movie)
- SubtitlesVote(token, vote)
- GetComments(token, subids)
- AddComment(token, comments)
- AddRequest(token, request)
- AutoUpdate(programName)
- NoOperation(token)

### License

This code is a fork from [here](https://github.com/vankasteelj/opensubtitles-api) done by [vankasteelj](https://github.com/vankasteelj)

So, this code is registered under GPLv3

Author of this fork is [alxhotel](http://github.com/alxhotel).
