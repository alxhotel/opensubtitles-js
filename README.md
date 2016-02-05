# opensubtitles-js
<img src="http://static.opensubtitles.org/gfx/logo_64x64.gif" width="64" height="64" />

**Opensubtitles.org API wrapper for Node.js**

## Example usage

#### Setup
    npm install opensubtitles-js

#### Initialize
```js
var opensubtitles = require('opensubtitles-js');

var query = {
    imdbid: "tt1844624",
    season: "2",
    episode: "3",
    filename: "American.Horror.Story.S02E03.720p.HDTV.X264-DIMENSION"
};

opensubtitles.searchEpisode(query, 'TestUserAgent 1.0')
    .then(function(result) {
        console.log(result);
    }).fail(function(error) {
        console.log(error);
    });
```

### License

MIT. Copyright (c) [alxhotel](http://github.com/alxhotel).
