/* global module */

var Q = require('q'),
	_ = require('lodash')
	OpenSubtitlesAPI = require('./methods.js')

var OpenSubtitles = module.exports = function OpenSubtitles(params) {
	//Options
	this.opts = {
		user: '',
		password: '',
		language: 'en',
		userAgent: 'OSTestUserAgent'
	}
	
	if(params) {
		this.opts.user = (typeof params.user !== "undefined") ? params.user : ''
		this.opts.password = (typeof params.password !== "undefined") ? params.password : ''
		this.opts.language = (typeof params.language !== "undefined") ? params.language : 'en'
		this.opts.userAgent = (typeof params.userAgent !== "undefined") ? params.userAgent : 'OSTestUserAgent'
	}

	//Cache
	this.cache = {
		user: null,
		token: null,
		time: null
	}

	this.api = new OpenSubtitlesAPI()
}

OpenSubtitles.prototype.login = function () {
	var self = this;

	return Q.Promise(function (resolve, reject) {
		if ((self.opts.user === self.cache.user) && (self.cache.time > Date.now())) {
			resolve(self.cache.token)
		} else {
			self.api.LogIn(self.opts.user, self.opts.password, self.opts.language, self.opts.userAgent)
				.then(function (res) {
					if (res.token) {
						//In cache for 10 min
						self.cache.time = Date.now() + 600000
						self.cache.token = res.token
						self.cache.user = self.opts.user
						return resolve(res.token)
					} else {
						return reject(res)
					}
				}).fail(function (error) {
					return reject(error)
				})
		}
	})
}

var search = function (data, self) {
	var params = {
		sublanguageid: 'all'
	}

	//Hash or imdb, then fallback to filename
	if (data.hash) {
		params.moviehash = data.hash
	} else if (data.imdbid) {
		params.imdbid = data.imdbid.replace('tt', '')
		params.season = data.season
		params.episode = data.episode
	} else {
		params.tag = data.filename
	}

	return Q.Promise(function (resolve, reject) {

		self.api.SearchSubtitles(data.token, [ params ])
			.then(function (res) {
				if (res.data === false) {
					if (data.recheck !== true && data.imdbid) {
						return reject('noResult')
					} else {
						return reject('Unable to extract subtitle')
					}
				}

				//Build our own output
				var subtitles = {}
				
				_.each(res.data, function (sub) {

					//Check
					if (sub.SubFormat !== 'srt') {
						return
					}
					
					//Check
					if (params.season && params.episode) {
						if (parseInt(sub.SeriesIMDBParent, 10) !== parseInt(params.imdbid.replace('tt', ''), 10)) {
							return
						}
						if (sub.SeriesSeason !== params.season) {
							return
						}
						if (sub.SeriesEpisode !== params.episode) {
							return
						}
					}

					var tmp = {
						url: sub.SubDownloadLink.replace('.gz', '.srt'),
						lang: sub.ISO639,
						downloads: sub.SubDownloadsCnt,
						score: 0
					}

					//Our own score system
					if (sub.MatchedBy === 'moviehash') {
						tmp.score += 100
					}
					if (sub.MatchedBy === 'tag') {
						tmp.score += 50
					}
					if (sub.UserRank === 'trusted') {
						tmp.score += 100
					}
					
					if (!subtitles[tmp.lang]) {
						subtitles[tmp.lang] = tmp
					} else {
						//If score is 0 or equal, sort by downloads
						if (tmp.score > subtitles[tmp.lang].score || (tmp.score === subtitles[tmp.lang].score && tmp.downloads > subtitles[tmp.lang].downloads)) {
							subtitles[tmp.lang] = tmp
						}
					}
				})

				return resolve(subtitles)
			}).fail(function (error) {
				return reject(error)
			})
	})
}

OpenSubtitles.prototype.searchEpisode = function (data) {
	var self = this

	return Q.Promise(function (resolve, reject) {
		self.login()
			.then(function (token) {
				data.token = token
				
				return search(data, self)
					.then(function (res) {	
						return resolve(res)
					}).fail(function (error) {						
						if (error === 'noResult') {
							//Try another search method
							return search({
								filename: data.filename,
								recheck: true,
								token: data.token
							}, self).then(function (res) {
								return resolve(res)
							}).fail(function (error) {
								return reject(error)
							})
						} else {
							return reject(error)
						}
					})
			}).fail(function (error) {
				return reject(error)
			})
	})
}