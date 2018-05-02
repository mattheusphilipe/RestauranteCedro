import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home.component';
import { RestauranteComponent } from './Components/restaurante.component';
import { PratoComponent } from './Components/prato.component';

const appRoutes: Routes =
[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'restaurante', component: RestauranteComponent },  
    { path: 'prato', component: PratoComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);