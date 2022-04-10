// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../components/firebase"

// -- This is a parent command --
Cypress.Commands.add('login', async () => {
	const { user } = await signInWithEmailAndPassword(
		auth,
		"systemtestuser@example.com",
		process.env.SYSTEM_TEST_USER_PASSWORD
	)
	
	uid = user.uid
})

/*
REACT_APP_GOOGLE_CLIENTID = 'your-client-id'
REACT_APP_GOOGLE_CLIENT_SECRET = 'your-client-secret'
GOOGLE_REFRESH_TOKEN = 'your-refresh-token'


const users = [
	{
		"localId": "rsuSYN3KyKbz3grMmwbZd5NKmnl2",
		"email": "tester@email.com",
		"displayName": "S G",
		"passwordHash": "UkVEQUNURUQ=",
		"emailVerified": false,
		"passwordUpdatedAt": 1649521985669,
		"providerUserInfo": [
			{
				"providerId": "password",
				"displayName": "S G",
				"federatedId": "tester@email.com",
				"email": "tester@email.com",
				"rawId": "tester@email.com"
			}
		],
		"validSince": "1649521985",
		"lastLoginAt": "1649521985669",
		"createdAt": "1649521985669",
		"lastRefreshAt": "2022-04-09T16:33:05.669Z"
	}
]

const refreshToken = "AIwUaOm9sgqVU9jFwQAQe7oiO0LrMK9gSieOUI-zsfWzrn4iOQLib4V3yt-N1Pu-kH_XaoUGzox0iht5bcc1jEu8u2zXmZebx5Rg6DJPsHCIxZr5sjGW8dZ8tp7yOWlzT6hR0I6dtwKWLM1QOOFW7QZ1vLgg21kVGO2j1bnMYwPefGNtpdaGvY9OcUCTgif2vW6NIYKia0lMRH-MN9ytbbVgUJe8MJeHZfFvEn3GSsJM2vJ0bCYiuMg",



from browser network activity
{
	"kind": "identitytoolkit#GetAccountInfoResponse",
	"users": [
		{
			"localId": "rsuSYN3KyKbz3grMmwbZd5NKmnl2",
			"email": "tester@email.com",
			"displayName": "S G",
			"passwordHash": "UkVEQUNURUQ=",
			"emailVerified": false,
			"passwordUpdatedAt": 1649521985669,
			"providerUserInfo": [
				{
					"providerId": "password",
					"displayName": "S G",
					"federatedId": "tester@email.com",
					"email": "tester@email.com",
					"rawId": "tester@email.com"
				}
			],
			"validSince": "1649521985",
			"lastLoginAt": "1649521985669",
			"createdAt": "1649521985669",
			"lastRefreshAt": "2022-04-09T16:33:05.669Z"
		}
	]
}

{
	"kind": "identitytoolkit#VerifyPasswordResponse",
	"localId": "rsuSYN3KyKbz3grMmwbZd5NKmnl2",
	"email": "tester@email.com",
	"displayName": "S G",
	"idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNGY4N2ZmNWQ5M2ZhNmVhMDNlNWM2ZTg4ZWVhMGFjZDJhMjMyYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUyBHIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2RpZ2l0YWwtdGVzdGltb255LWRldiIsImF1ZCI6ImRpZ2l0YWwtdGVzdGltb255LWRldiIsImF1dGhfdGltZSI6MTY0OTUyMjUwOSwidXNlcl9pZCI6InJzdVNZTjNLeUtiejNnck1td2JaZDVOS21ubDIiLCJzdWIiOiJyc3VTWU4zS3lLYnozZ3JNbXdiWmQ1TkttbmwyIiwiaWF0IjoxNjQ5NTIyNTA5LCJleHAiOjE2NDk1MjYxMDksImVtYWlsIjoidGVzdGVyQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZXJAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.NBoKnV38q6SzmGc8fLHQh_1U70VOfKm-I83dEQwGkncZJWp79SHA9rJYmpoN2ju0AdICUg_nsdELqFf2jfMV2zUDRNS5NE0iJif63LQOOSUeGjTnINc5eCD1C_gdUoqWe6dUifa2u4O1PLSjoZZ25Nd9X8RYiVtnq_hpD31M7BSg1_8oWFhT32ZGl0lY3zsGVW2pQhxgk-noAvbKqD0-HzcVp4elWCihhW5PT5OxKu4kXM_VZu1blWMJ1LXGmexezMPG-srfuh1bHkQG0cz6NM73mU50jD481ByRupuO36a9rwPJVm3PGrVXvfwLJHY_TxHqpwR0Sp80iSDAn0VtsQ",
	"registered": true,
	"refreshToken": "AIwUaOm9sgqVU9jFwQAQe7oiO0LrMK9gSieOUI-zsfWzrn4iOQLib4V3yt-N1Pu-kH_XaoUGzox0iht5bcc1jEu8u2zXmZebx5Rg6DJPsHCIxZr5sjGW8dZ8tp7yOWlzT6hR0I6dtwKWLM1QOOFW7QZ1vLgg21kVGO2j1bnMYwPefGNtpdaGvY9OcUCTgif2vW6NIYKia0lMRH-MN9ytbbVgUJe8MJeHZfFvEn3GSsJM2vJ0bCYiuMg",
	"expiresIn": "3600"
}



// idToken: eyJhbGciOiJSUzI1NiIsImtpZCI6IjZhNGY4N2ZmNWQ5M2ZhNmVhMDNlNWM2ZTg4ZWVhMGFjZDJhMjMyYTkiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiUyBHIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2RpZ2l0YWwtdGVzdGltb255LWRldiIsImF1ZCI6ImRpZ2l0YWwtdGVzdGltb255LWRldiIsImF1dGhfdGltZSI6MTY0OTUyMjUwOSwidXNlcl9pZCI6InJzdVNZTjNLeUtiejNnck1td2JaZDVOS21ubDIiLCJzdWIiOiJyc3VTWU4zS3lLYnozZ3JNbXdiWmQ1TkttbmwyIiwiaWF0IjoxNjQ5NTIyNTA5LCJleHAiOjE2NDk1MjYxMDksImVtYWlsIjoidGVzdGVyQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0ZXJAZW1haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.NBoKnV38q6SzmGc8fLHQh_1U70VOfKm-I83dEQwGkncZJWp79SHA9rJYmpoN2ju0AdICUg_nsdELqFf2jfMV2zUDRNS5NE0iJif63LQOOSUeGjTnINc5eCD1C_gdUoqWe6dUifa2u4O1PLSjoZZ25Nd9X8RYiVtnq_hpD31M7BSg1_8oWFhT32ZGl0lY3zsGVW2pQhxgk-noAvbKqD0-HzcVp4elWCihhW5PT5OxKu4kXM_VZu1blWMJ1LXGmexezMPG-srfuh1bHkQG0cz6NM73mU50jD481ByRupuO36a9rwPJVm3PGrVXvfwLJHY_TxHqpwR0Sp80iSDAn0VtsQ
//
*/


//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
