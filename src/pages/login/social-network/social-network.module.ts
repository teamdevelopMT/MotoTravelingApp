import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SocialNetworkPage } from './social-network';

@NgModule({
  declarations: [
    SocialNetworkPage,
  ],
  imports: [
    IonicPageModule.forChild(SocialNetworkPage),
  ],
})
export class SocialNetworkPageModule {}
