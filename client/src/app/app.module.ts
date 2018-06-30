import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
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
import { GraphComponent } from './components/exchange/graph/graph.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { OverviewComponent } from './components/funds/overview/overview.component';
import { DepositComponent } from './components/funds/deposit/deposit.component';
import { WithdrawalComponent } from './components/funds/withdrawal/withdrawal.component';
import { OpenordersComponent } from './components/funds/openorders/openorders.component';
import { TradehistoryComponent } from './components/funds/tradehistory/tradehistory.component';
import { HighchartsComponent } from './components/ui/highcharts/highcharts.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { PieChartComponent } from './components/ui/pie-chart/pie-chart.component';
import { UserDetailsComponent } from './components/dashboard/user-details/user-details.component';
import { TotalAssetsComponent } from './components/dashboard/total-assets/total-assets.component';
import { TradeHistoryComponent } from './components/dashboard/trade-history/trade-history.component';
import { CoinsComponent } from './components/dashboard/user-details/coins/coins.component';



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
    HighchartsComponent,
    SlidebarComponent,
    PieChartComponent,
    UserDetailsComponent,
    TotalAssetsComponent,
    TradeHistoryComponent,
    CoinsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ChartsModule,
    HttpModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, ChatService, DepositComponent, WithdrawalComponent, GraphComponent, DashboardComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
