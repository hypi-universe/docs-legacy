const config = {
	"gatsby": {
		"pathPrefix": "/",
		"siteUrl": "https://docs.hypi.app",
		"gaTrackingId": "UA-120274358-2"
	},
	"header": {
		"logo": "",
		"logoLink": "https://docs.hypi.app?utm_source=docs&utm_medium=header&utm_campaign=logo",
		"title": "Docs",
		"githubUrl": "https://github.com/hypi-universe/docs",
		"helpUrl": "",
		"tweetText": "",
		"links": [
      { "text": "hypi.io", "link": "https://hypi.io?utm_source=docs&utm_medium=header&utm_campaign=hypi"},
      { "text": "Register", "link": "https://hypi.app/auth/register?utm_source=docs&utm_medium=header&utm_campaign=register"},
      { "text": "Login", "link": "https://hypi.app/auth/login?utm_source=docs&utm_medium=header&utm_campaign=login"}
		],
		"search": {
			"enabled": false,
			"indexName": "docs",
			"algoliaAppId": process.env.GATSBY_ALGOLIA_APP_ID,
			"algoliaSearchKey": process.env.GATSBY_ALGOLIA_SEARCH_KEY,
			"algoliaAdminKey": process.env.ALGOLIA_ADMIN_KEY
		}
	},
	"sidebar": {
		"forcedNavOrder": [
			"/introduction",
      "/products",
      "/products/axiom",
      "/products/api-gateway",
    	"/tutorials",
    	"/reference",
      // "/recipes",
      "FAQ"
		],
    "exclude": [
      "/",
      "/404",
      "/recipes",
      "/recipes/build-todo-app",
      "/recipes/create-account",
      "/recipes/login"
    ],
		"links": [
			{ "text": "Hypi", "link": "https://hypi.io?utm_source=docs&utm_medium=sidebar&utm_campaign=hypi"},
		],
		"frontline": false,
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
