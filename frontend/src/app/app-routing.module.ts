import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoryDetailsComponent } from "./category-details/category-details.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {SearchComponent} from "./search/search.component";
import {ViewOrdersComponent} from "./view-orders/view-orders.component";
import { RegisterComponent } from "./register/register.component";
const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "home", component: DashboardComponent},
  {path: "home/:category/:name", component: ProductDetailsComponent},
  {path: "home/:category", component: CategoryDetailsComponent},
  {path: "searchdetails/:search", component: SearchComponent},
  {path : "view-orders", component: ViewOrdersComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
  {path: "**", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
