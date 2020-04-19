import {ApiKey} from "../secret/apikey";

export const environment = {
  production: true,
  firebase: {
    'databaseUrl': 'https://amw061-recipes.firebaseio.com',
    'signUpUrl': 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + ApiKey,
    'signInUrl': 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + ApiKey
  }
};
