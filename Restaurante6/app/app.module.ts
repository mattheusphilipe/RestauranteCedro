import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { HomeComponent } from './Components/home.component';
import { RestauranteService } from './Service/restaurante.service'
import { RestauranteComponent } from './Components/restaurante.component';
import { FormsModule} from '@angular/forms';
import { PratoComponent } from './Components/prato.component';
import { PratoService } from './Service/prato.service';

@NgModule
 ({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing, Ng2Bs3ModalModule, FormsModule],
    declarations: [AppComponent, HomeComponent, RestauranteComponent, PratoComponent ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' },RestauranteService, PratoService],
    bootstrap: [AppComponent]

})
export class AppModule { }