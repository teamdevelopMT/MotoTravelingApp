import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SocialNetworkProvider } from "../../../providers/socialnetwork-service";

@IonicPage()
@Component({
  selector: 'page-social-network',
  templateUrl: 'social-network.html',
})
export class SocialNetworkPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialNetworservice: SocialNetworkProvider,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SocialNetworkPage');
  }

  signInWithFacebook() {
    this.socialNetworservice.signInWithFacebook().then(res => {
      this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['OK']
      }).present();
    });
  }

  signInWithGoogle() {
    this.socialNetworservice.signInWithGooglePlus().then(res=>{
      this.alertCtrl.create({
        title: 'New Friend!',
        subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
        buttons: ['OK']
      }).present();
    });
  }

}
