/* global require, module */

var xmlrpc = require('xmlrpc'),
	Q = require('q')

var OpenSubtitlesAPI = module.exports = function() {
	this.client = xmlrpc.createClient({
		host: 'api.opensubtitles.org',
		port: 80,
		path: '/xml-rpc'
	})
}

OpenSubtitlesAPI.prototype.call = function (method, args) {
	var self = this
	
	return Q.Promise(function (resolve, reject) {
		self.client.methodCall(method, args, function (err, res) {
			if (err || !res) {
				var errorMessage = err ? err.message : new Error('no token returned')
				return reject(errorMessage)
			}
			return resolve(res)
		})
	})
}

/* methods */

OpenSubtitlesAPI.prototype.LogIn = function(username, password, language, useragent) {
	return this.call('LogIn', [
		username,
		password,
		language,
		useragent
	])
}
OpenSubtitlesAPI.prototype.LogOut = function(token) {
	return this.call('LogOut', [
		token,
	])
}
OpenSubtitlesAPI.prototype.SearchSubtitles = function(token, queries) {
	return this.call('SearchSubtitles', [
		token,
		queries
	])
}
OpenSubtitlesAPI.prototype.SearchToMail = function(token, langs, movies) {
	return this.call('SearchToMail', [
		token,
		langs,
		movies
	])
}
OpenSubtitlesAPI.prototype.CheckSubHash = function(token, subsHash) {
	return this.call('CheckSubHash', [
		token,
		subsHash
	])
}
OpenSubtitlesAPI.prototype.CheckMovieHash = function(token, moviesHash) {
	return this.call('CheckMovieHash', [
		token,
		moviesHash
	])
}
OpenSubtitlesAPI.prototype.CheckMovieHash2 = function(token, moviesHash) {
	return this.call('CheckMovieHash2', [
		token,
		moviesHash
	])
}
OpenSubtitlesAPI.prototype.InsertMovieHash = function(token, moviesInfo) {
	return this.call('InsertMovieHash', [
		token,
		moviesInfo
	])
}
OpenSubtitlesAPI.prototype.TryUploadSubtitles = function(token, sub) {
	return this.call('TryUploadSubtitles', [
		token,
		sub
	])
}
OpenSubtitlesAPI.prototype.UploadSubtitles = function(token, sub) {
	return this.call('UploadSubtitles', [
		token,
		sub
	])
}
OpenSubtitlesAPI.prototype.DetectLanguage = function(token, texts) {
	return this.call('DetectLanguage', [
		token,
		texts
	])
}
OpenSubtitlesAPI.prototype.DownloadSubtitles = function(token, subid) {
	return this.call('DownloadSubtitles', [
		token,
		subid
	])
}
OpenSubtitlesAPI.prototype.ReportWrongMovieHash = function(token, IDSubMovieFile) {
	return this.call('ReportWrongMovieHash', [
		token,
		IDSubMovieFile
	])
}
OpenSubtitlesAPI.prototype.ReportWrongImdbMovie = function(token, movie) {
	return this.call('ReportWrongImdbMovie', [
		token,
		movie
	])
}
OpenSubtitlesAPI.prototype.GetSubLanguages = function(language) {
	return this.call('GetSubLanguages', [
		language
	])
}
OpenSubtitlesAPI.prototype.GetAvailableTranslations = function(token, program) {
	return this.call('GetAvailableTranslations', [
		token,
		program
	])
}
OpenSubtitlesAPI.prototype.GetTranslation = function(token, iso639, format, program) {
	return this.call('GetTranslation', [
		token,
		iso639,
		format,
		program
	])
}
OpenSubtitlesAPI.prototype.SearchMoviesOnIMDB = function(token, query) {
	return this.call('SearchMoviesOnIMDB', [
		token,
		query
	])
}
OpenSubtitlesAPI.prototype.GetIMDBMovieDetails = function(token, imdbid) {
	return this.call('GetIMDBMovieDetails', [
		token,
		imdbid
	])
}
OpenSubtitlesAPI.prototype.InsertMovie = function(token, movie) {
	return this.call('InsertMovie', [
		token,
		movie
	])
}
OpenSubtitlesAPI.prototype.SubtitlesVote = function(token, vote) {
	return this.call('SubtitlesVote', [
		token,
		vote
	])
}
OpenSubtitlesAPI.prototype.GetComments = function(token, subids) {
	return this.call('GetComments', [
		token,
		subids
	])
}
OpenSubtitlesAPI.prototype.AddComment = function(token, comments) {
	return this.call('AddComment', [
		token,
		comments
	])
}
OpenSubtitlesAPI.prototype.AddRequest = function(token, request) {
	return this.call('AddRequest', [
		token,
		request
	])
}
OpenSubtitlesAPI.prototype.AutoUpdate = function(programName) {
	return this.call('AutoUpdate', [
		programName
	])
}
OpenSubtitlesAPI.prototype.NoOperation = function(token) {
	return this.call('NoOperation', [
		token
	])
}