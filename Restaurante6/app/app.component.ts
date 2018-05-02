import { Component } from "@angular/core"

@Component
 ({
    selector: "user-app",
    template: `
                <div>
                    <nav class='navbar  navbar-default'>
                        <div class='container-fluid'>
                            <ul class='nav navbar-nav'>
                                <li><a [routerLink]="['home']">Home</a></li>         
                                 <li><a [routerLink]="['restaurante']">Restaurantes</a></li> 
                                 <li><a [routerLink]="['prato']">Pratos</a></li> 
                            </ul>
                        </div>
                    </nav>
                    <div class='container-fluid'>
                        <router-outlet></router-outlet>
                    </div>
                 </div>
                `
})

export class AppComponent { }