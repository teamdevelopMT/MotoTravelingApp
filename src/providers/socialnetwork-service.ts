
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';



@Injectable()
export class SocialNetworkProvider {
  constructor(private afAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
    private googlePlus: GooglePlus) {
  }

  signInWithFacebook() {

    let promise = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.fb.login(['email', 'public_profile']).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          firebase.auth().signInWithCredential(facebookCredential).then(res => {
            console.log(res);
            resolve();
          });
        }).catch(err => console.log(err))

      } else {
        this.afAuth.auth
          .signInWithPopup(new firebase.auth.FacebookAuthProvider())
          .then(res => {
            console.log(res);
            resolve();
          }).catch(err => console.log(err));
      }
    })
    return promise;
  }

  signInWithGooglePlus() {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.googlePlus.login({
          'webClientId': '1017500417926-gnkf6qo1q51at29q798obb0lm6cphbd7.apps.googleusercontent.com',
          'offline': true
        }).then(res => {
          firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then(success => {
              console.log("Firebase success: " + JSON.stringify(success));
              resolve();
            })
            .catch(error => {
              console.log("Firebase failure: " + JSON.stringify(error))
              reject();
            });
        }).catch(err => {
          console.error("Error: ", err)
          reject();
        });
      }
    });

    return promise;
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
