const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://docs.hypi.app",
		"gaTrackingId": null
	},
	"header": {
		"logo": "https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/favicon.png",
		"logoLink": "https://docs.hypi.app?utm_source=docs&utm_medium=header&utm_campaign=logo",
		"title": "Hypi Documentation",
		"githubUrl": "https://github.com/hypi-universe/docs",
		"helpUrl": "",
		"tweetText": "",
		"links": [
      { "text": "Hypi", "link": "https://hypi.io?utm_source=docs&utm_medium=header&utm_campaign=hypi"},
      { "text": "Register", "link": "https://hypi.app/register?utm_source=docs&utm_medium=header&utm_campaign=register"},
      { "text": "Login", "link": "https://hypi.app/login?utm_source=docs&utm_medium=header&utm_campaign=login"}
		],
		"search": {
			"enabled": false,
			"indexName": "",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
    	"/tutorials",
      "/reference"
		],
		"links": [
			{ "text": "Hypi", "link": "https://hypi.io?utm_source=docs&utm_medium=sidebar&utm_campaign=hypi"},
		],
		"frontline": false,
		"ignoreIndex": true,
	},
	"siteMetadata": {
		"title": "Hypi Documentation",
		"description": "Hypi platform documentation. Learn to build scalable data driven applications at lightening speed",
		"ogImage": null,
		"docsLocation": "https://github.com/hypi-universe/docs/tree/master/content",
		"favicon": "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg"
	},
};

module.exports = config;
