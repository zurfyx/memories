/*
 * @angular-seed https://github.com/mgechev/angular-seed/blob/master/src/client/app/app-routing.module.ts
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
        (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
      */
      { path: '', loadChildren: './home/home.module#HomeModule' },
      { path: 'about', loadChildren: './about/about.module#AboutModule' },
      { path: 'journeys', loadChildren: './journey/journey.module#JourneyModule' },
      { path: 'liquid-galaxy', loadChildren: './liquid-galaxy/lg.module#LgModule' },
      { path: 'physical-web', loadChildren: './physical-web/pw.module#PwModule' },
      { path: 'users', loadChildren: './user/user.module#UserModule' },
      { path: 'stories', loadChildren: './story/story.module#StoryModule' },
      { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule' },
      { path: '**', redirectTo: '404' },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
