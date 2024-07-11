import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  accessToken: string = '';
  refreshToken: string = '';


  constructor(
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router:Router

  ) { }

  ngOnInit() {
      // Retrieve tokens from query parameters
    this.route.queryParams.subscribe(params => {
      const encodedAccessToken = params['access_token'];
      const encodedRefreshToken = params['refresh_token'];

      // Example: Send access_token to backend for validation
      if (encodedAccessToken) {
        this.router.navigate(['/protected']);
      }
    });
  }

// Function to decode token using jsonwebtoken library
// private decodeToken(encodedToken: string, tokenType: string, secret: string): string {
//   try {
//     const decodedToken = jwt_decode(encodedToken);
//     return decodedToken[tokenType];
//   } catch (error) {
//     console.error(`Error decoding ${tokenType} token:`, error);
//     return '';
//   }
// }
  loginWithGoogle() {
  }

}
