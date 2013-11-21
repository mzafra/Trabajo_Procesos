module.exports = {
	development: {
		db: 'mongodb://localhost/demoPassport',
		app: {
			name: 'Passport Authentication Tutorial'
		},
		twitter: {
			clientID: "-----",
			clientSecret: "----",
			callbackURL: "/auth/twitter/callback"
		},		
		facebook: {
			clientID: "------",
			clientSecret: "------",
			callbackURL: "/auth/facebook/callback"
		}
	},
  	production: {
    	db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
		app: {
			name: 'Passport Authentication Tutorial'
		},
		twitter: {
			clientID: "-----",
			clientSecret: "------",
			callbackURL: "/auth/twitter/callback"
		},
		facebook: {
			clientID: "clientID",
			clientSecret: "clientSecret",
			callbackURL: "{{production callbackURL}}"
		}
 	}
}
