// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';

import { ExplorerComponent } from './explorer/explorer.component';

import { AlbumTypesComponent } from './albumtypes/albumtypes.component';
import { AlbumTypeComponent } from './albumtype/albumtype.component';

import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';

// Components Routing
import { EditingRoutingModule } from './editing-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditingRoutingModule
  ],
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    CountriesComponent,
    CountryComponent,
    AlbumsComponent,
    AlbumComponent,
    AlbumTypesComponent,
    AlbumTypeComponent,
    ExplorerComponent,
    TripsComponent,
    TripComponent
  ]
})
export class EditingModule { }
