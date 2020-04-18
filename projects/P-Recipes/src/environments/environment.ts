import {ApiKey} from "../secret/apikey";


export const environment = {
  production: false,
  firebase: {
    'databaseUrl': 'https://amw061-recipes.firebaseio.com',
    'signUpUrl': 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + ApiKey,
    'signInUrl': 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + ApiKey
  }
};
