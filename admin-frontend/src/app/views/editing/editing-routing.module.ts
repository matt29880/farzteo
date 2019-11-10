import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';

import { CountriesComponent } from './countries/countries.component';
import { CountryComponent } from './country/country.component';

import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';

import { AlbumTypesComponent } from './albumtypes/albumtypes.component';
import { AlbumTypeComponent } from './albumtype/albumtype.component';

import { TripsComponent } from './trips/trips.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Base'
    },
    children: [
      {
        path: 'articles',
        component: ArticlesComponent,
        data: {
          title: 'Articles'
        }
      },
      {
        path: 'articles/:id',
        component: ArticleComponent,
        data: {
          title: 'Article'
        }
      },
      {
        path: 'articles/new',
        component: ArticleComponent,
        data: {
          title: 'Article'
        }
      },
      {
        path: 'countries',
        component: CountriesComponent,
        data: {
          title: 'Countries'
        }
      },
      {
        path: 'countries/:id',
        component: CountryComponent,
        data: {
          title: 'Country'
        }
      },
      {
        path: 'countries/new',
        component: CountryComponent,
        data: {
          title: 'Country'
        }
      },
      {
        path: 'albums',
        component: AlbumsComponent,
        data: {
          title: 'Albums'
        }
      },
      {
        path: 'albums/:id',
        component: AlbumComponent,
        data: {
          title: 'Album'
        }
      },
      {
        path: 'albums/new',
        component: AlbumComponent,
        data: {
          title: 'Album'
        }
      },
      {
        path: 'albumtypes',
        component: AlbumTypesComponent,
        data: {
          title: 'Album Types'
        }
      },
      {
        path: 'albumtypes/:id',
        component: AlbumTypeComponent,
        data: {
          title: 'Album Type'
        }
      },
      {
        path: 'albumtypes/new',
        component: AlbumTypeComponent,
        data: {
          title: 'Album Type'
        }
      },
      {
        path: 'trips',
        component: TripsComponent,
        data: {
          title: 'Trips'
        }
      },
      {
        path: 'trips/:id',
        component: TripComponent,
        data: {
          title: 'Trip'
        }
      },
      {
        path: 'trips/new',
        component: TripComponent,
        data: {
          title: 'Trip'
        }
      }
    ]
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditingRoutingModule {}
