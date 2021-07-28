import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

const USER_ICON = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13.4681 12.3707C12.7571 11.2252 11.1954 10 8.00001 10C4.80464 10 3.24293 11.2252 2.53186 12.3707C3.81463 13.9735 5.78744 15 8.00001 15C10.2126 15 12.1854 13.9735 13.4681 12.3707Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 9C9.65685 9 11 7.65685 11 6C11 4.34315 9.65685 3 8 3C6.34315 3 5 4.34315 5 6C5 7.65685 6.34315 9 8 9Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
</svg>`;

const SHOPPING_CART = `
<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0.5C0 0.223858 0.223858 0 0.5 0H2C2.22943 0 2.42943 0.156149 2.48507 0.378732L2.89039 2H14.5C14.654 2 14.7993 2.07094 14.8941 2.19229C14.9889 2.31365 15.0224 2.4719 14.9851 2.62127L13.4851 8.62127C13.4294 8.84385 13.2294 9 13 9H4C3.77057 9 3.57057 8.84385 3.51493 8.62127L1.60961 1H0.5C0.223858 1 0 0.776142 0 0.5ZM3.14039 3L4.39039 8H12.6096L13.8596 3H3.14039ZM5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11ZM3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12ZM12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z" fill="white"/>
</svg>`;
/**
 * @title SVG icons
 */

 @Injectable({
  providedIn: 'root',
})
export class IconService  {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    console.log('init icon');
    iconRegistry.addSvgIconLiteral('user-icon', sanitizer.bypassSecurityTrustHtml(USER_ICON));
    iconRegistry.addSvgIconLiteral('shopping-cart', sanitizer.bypassSecurityTrustHtml(SHOPPING_CART));
  }
}