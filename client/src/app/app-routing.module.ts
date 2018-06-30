import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { RatesComponent } from './components/exchange/rates/rates.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { GraphComponent } from './components/exchange/graph/graph.component';
import { OverviewComponent } from './components/funds/overview/overview.component';
import { DepositComponent } from './components/funds/deposit/deposit.component';
import { PieChartComponent } from './components/ui/pie-chart/pie-chart.component';
import { SlidebarComponent } from './components/slidebar/slidebar.component';
import { WithdrawalComponent } from './components/funds/withdrawal/withdrawal.component';
import { OpenordersComponent } from './components/funds/openorders/openorders.component';
import { TradehistoryComponent } from './components/funds/tradehistory/tradehistory.component';
import { LoadingSpinnerComponent } from './components/ui/loading-spinner/loading-spinner.component';
import { UserDetailsComponent } from './components/dashboard/user-details/user-details.component';
import { TotalAssetsComponent } from './components/dashboard/total-assets/total-assets.component';
import { TradeHistoryComponent } from './components/dashboard/trade-history/trade-history.component';
import { CoinsComponent } from './components/dashboard/user-details/coins/coins.component';

const appRoutes: Routes =
[
  { path: 'home', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard] },
  { path: 'exchange', component: ExchangeComponent, canActivate:[AuthGuard] },
  { path: 'rates', component: RatesComponent, canActivate:[AuthGuard] },
  { path: 'graph', component: GraphComponent, canActivate:[AuthGuard] },
  { path: 'overview', component: OverviewComponent, canActivate:[AuthGuard] },
  { path: 'loading', component: LoadingSpinnerComponent, canActivate:[AuthGuard]},
  { path: 'deposit', component: DepositComponent, canActivate:[AuthGuard] },
  { path: 'withdrawal', component: WithdrawalComponent, canActivate:[AuthGuard] },
  { path: 'openorders', component: OpenordersComponent, canActivate:[AuthGuard] },
  { path: 'tradehistory', component: TradehistoryComponent, canActivate:[AuthGuard] },
  { path: 'coins/:id', component: CoinsComponent, canActivate:[AuthGuard] },
  { path: 'slidebar', component: SlidebarComponent, canActivate:[AuthGuard] },
  { path: 'piechart', component: PieChartComponent, canActivate:[AuthGuard] },
  { path: 'user-details', component: UserDetailsComponent, canActivate:[AuthGuard] },
  { path: 'total-assets', component: TotalAssetsComponent, canActivate:[AuthGuard] },
  { path: 'trade-history', component: TradeHistoryComponent, canActivate:[AuthGuard] },
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard] },
  { path: '**', component: HomeComponent}
];

@NgModule(
{
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes,{ enableTracing: true })],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})

export class AppRoutingModule { }
