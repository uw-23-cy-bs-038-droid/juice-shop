import { Routes } from '@angular/router'
import { AdminGuard } from './guards/admin.guard'
import { AccountingGuard } from './guards/accounting.guard'
import { LoginGuard } from './guards/login.guard'

import {
  AdministrationComponent,
  AccountingComponent,
  AboutComponent,
  AddressSelectComponent,
  SavedAddressComponent,
  AddressCreateComponent,
  DeliveryMethodComponent,
  DeluxeUserComponent,
  SavedPaymentMethodsComponent,
  BasketComponent,
  OrderCompletionComponent,
  ContactComponent,
  PhotoWallComponent,
  ComplaintComponent,
  ChatbotComponent,
  OrderSummaryComponent,
  OrderHistoryComponent,
  PaymentComponent,
  WalletComponent,
  LoginComponent,
  ForgotPasswordComponent,
  RecycleComponent,
  RegisterComponent,
  SearchResultComponent,
  ScoreBoardComponent,
  TrackResultComponent,
  TwoFactorAuthEnterComponent,
  PrivacySecurityComponent,
  PrivacyPolicyComponent,
  ChangePasswordComponent,
  TwoFactorAuthComponent,
  DataExportComponent,
  LastLoginIpComponent,
  NFTUnlockComponent,
  OAuthComponent,
  TokenSaleComponent,
  ErrorPageComponent
} from './components'

import { oauthMatcher, tokenMatcher } from './matchers'
import {
  loadWeb3WalletModule,
  loadWeb3SandboxModule,
  loadFaucetModule
} from './lazy-loaders'

// Secure resolver to safely parse OAuth hash fragment
const OAuthHashResolver = {
  resolve: () => {
    if (typeof window === 'undefined') return null

    const fragment = window.location.hash || ''
    // Sanitization: allow only alphanumeric, /, ?, =, &, -
    return fragment.replace(/[^a-zA-Z0-9\/\?\=\&\-\_#]/g, '')
  }
}

export const routes: Routes = [
  // -------------------------------------------------------------
  // 🔐 ADMIN ROUTE (REPLACED OBFUSCATED STRING WITH CLEAN PATH)
  // -------------------------------------------------------------
  {
    path: 'admin',
    component: AdministrationComponent,
    canActivate: [AdminGuard]
  },

  {
    path: 'accounting',
    component: AccountingComponent,
    canActivate: [AccountingGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'address/select',
    component: AddressSelectComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'address/saved',
    component: SavedAddressComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'address/create',
    component: AddressCreateComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'address/edit/:addressId',
    component: AddressCreateComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'delivery-method',
    component: DeliveryMethodComponent
  },
  {
    path: 'deluxe-membership',
    component: DeluxeUserComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'saved-payment-methods',
    component: SavedPaymentMethodsComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'order-completion/:id',
    component: OrderCompletionComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'photo-wall',
    component: PhotoWallComponent
  },
  {
    path: 'complain',
    component: ComplaintComponent
  },
  {
    path: 'chatbot',
    component: ChatbotComponent
  },
  {
    path: 'order-summary',
    component: OrderSummaryComponent
  },
  {
    path: 'order-history',
    component: OrderHistoryComponent
  },
  {
    path: 'payment/:entity',
    component: PaymentComponent
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'recycle',
    component: RecycleComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: 'hacking-instructor',
    component: SearchResultComponent
  },
  {
    path: 'score-board',
    component: ScoreBoardComponent
  },
  {
    path: 'track-result',
    component: TrackResultComponent
  },
  {
    path: 'track-result/new',
    component: TrackResultComponent,
    data: {
      type: 'new'
    }
  },
  {
    path: '2fa/enter',
    component: TwoFactorAuthEnterComponent
  },
  {
    path: 'privacy-security',
    component: PrivacySecurityComponent,
    children: [
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'two-factor-authentication', component: TwoFactorAuthComponent },
      { path: 'data-export', component: DataExportComponent },
      { path: 'last-login-ip', component: LastLoginIpComponent }
    ]
  },
  {
    path: 'juicy-nft',
    component: NFTUnlockComponent
  },
  {
    path: 'wallet-web3',
    loadChildren: async () => await loadWeb3WalletModule()
  },
  {
    path: 'web3-sandbox',
    loadChildren: async () => await loadWeb3SandboxModule()
  },
  {
    path: 'bee-haven',
    loadChildren: async () => await loadFaucetModule()
  },

  // -------------------------------------------------------------
  // 🔐 SAFE OAUTH HASH PARSING (NO window.x IN ROUTES)
  // -------------------------------------------------------------
  {
    matcher: oauthMatcher,
    resolve: { hash: OAuthHashResolver },
    component: OAuthComponent
  },

  {
    matcher: tokenMatcher,
    component: TokenSaleComponent
  },

  // -------------------------------------------------------------
  // ERROR HANDLING
  // -------------------------------------------------------------
  {
    path: '403',
    component: ErrorPageComponent
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
]
