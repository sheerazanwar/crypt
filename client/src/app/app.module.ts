import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {AppRoutingModule} from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { AuthService } from './services/auth.service';
import { ChatService } from './services/chat.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { RatesComponent } from './components/exchange/rates/rates.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { DxChartModule } from 'devextreme-angular';
import { GraphComponent } from './components/exchange/graph/graph.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { OverviewComponent } from './components/funds/overview/overview.component';
import { DepositComponent } from './components/funds/deposit/deposit.component';
import { WithdrawalComponent } from './components/funds/withdrawal/withdrawal.component';
import { OpenordersComponent } from './components/funds/openorders/openorders.component';
import { TradehistoryComponent } from './components/funds/tradehistory/tradehistory.component';
import { HighchartsComponent } from './components/ui/highcharts/highcharts.component';



@NgModule(
{
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    RatesComponent,
    ExchangeComponent,
    GraphComponent,
    LoadingSpinnerComponent,
    OverviewComponent,
    DepositComponent,
    WithdrawalComponent,
    OpenordersComponent,
    TradehistoryComponent,
    HighchartsComponent
  ],
  imports: [
    BrowserModule,
    DxChartModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, ChatService, DepositComponent, WithdrawalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
