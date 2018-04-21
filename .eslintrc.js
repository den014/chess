module.exports = {
	"env": {
		"browser": true,
		"es6": true,
		"node": true,
		"commonjs": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaFeatures": {
			"experimentalObjectRestSpread": true,
			"jsx": true
		},
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"indent": [2, "tab", {"SwitchCase": 1}],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		],
		"max-len": [
			"error",
			120
		],
		"react/jsx-uses-react": "error",
		"react/jsx-uses-vars": "error"
	},
	"settings": {
		"react": {
			"createClass": "createReactClass",
			"pragma": "React",
			"version": "15.0",
			"flowVersion": "0.53"
		},
		"propWrapperFunctions": [ "forbidExtraProps" ]
	}
};
