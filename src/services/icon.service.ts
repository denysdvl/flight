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

const CALENDAR_CART = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#47A7FF"/>
<path d="M1 3.5H15" stroke="#47A7FF"/>
<path d="M5.5 1.5L5.5 15.5" stroke="#47A7FF"/>
<path d="M10.5 1.5L10.5 15.5" stroke="#47A7FF"/>
<path d="M1 7.5H15" stroke="#47A7FF"/>
<path d="M1 11.5H15" stroke="#47A7FF"/>
<path d="M0 2C0 0.895431 0.895431 0 2 0H14C15.1046 0 16 0.895431 16 2V4H0V2Z" fill="#47A7FF"/>
</svg>`;

const SEARCH = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 12C9.53757 12 12 9.53757 12 6.5C12 3.46243 9.53757 1 6.5 1C3.46243 1 1 3.46243 1 6.5C1 9.53757 3.46243 12 6.5 12ZM13 6.5C13 10.0899 10.0899 13 6.5 13C2.91015 13 0 10.0899 0 6.5C0 2.91015 2.91015 0 6.5 0C10.0899 0 13 2.91015 13 6.5Z" fill="white"/>
<path d="M10.3439 11.7422C10.3734 11.7822 10.4062 11.8204 10.4424 11.8566L14.2929 15.7071C14.6834 16.0976 15.3166 16.0976 15.7071 15.7071C16.0976 15.3166 16.0976 14.6834 15.7071 14.2929L11.8566 10.4424C11.8204 10.4062 11.7822 10.3734 11.7422 10.3439C11.3499 10.878 10.878 11.3499 10.3439 11.7422Z" fill="white"/>
</svg>
`;

const ARROW_RIGHT_8 = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 4.27614 0.223858 4.5 0.5 4.5H6.29289L4.14645 6.64645C3.95118 6.84171 3.95118 7.15829 4.14645 7.35355C4.34171 7.54882 4.65829 7.54882 4.85355 7.35355L7.85355 4.35355C8.04882 4.15829 8.04882 3.84171 7.85355 3.64645L4.85355 0.646447C4.65829 0.451184 4.34171 0.451184 4.14645 0.646447C3.95118 0.841709 3.95118 1.15829 4.14645 1.35355L6.29289 3.5L0.5 3.5C0.223858 3.5 0 3.72386 0 4Z" fill="black"/>
</svg>
`;

const ARROW_LEFT = `
<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 4.5C14 4.77614 13.7761 5 13.5 5L1.70711 5L4.85355 8.14645C5.04882 8.34171 5.04882 8.65829 4.85355 8.85355C4.65829 9.04882 4.34171 9.04882 4.14645 8.85355L0.146446 4.85355C-0.0488157 4.65829 -0.0488157 4.34171 0.146446 4.14645L4.14645 0.146447C4.34171 -0.0488155 4.65829 -0.0488155 4.85355 0.146447C5.04882 0.341709 5.04882 0.658292 4.85355 0.853554L1.70711 4L13.5 4C13.7761 4 14 4.22386 14 4.5Z" fill="black" fill-opacity="0.8"/>
</svg>
`

const ARROW_RIGHT = `
<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4.5C0 4.77614 0.223858 5 0.5 5L12.2929 5L9.14645 8.14645C8.95118 8.34171 8.95118 8.65829 9.14645 8.85355C9.34171 9.04882 9.65829 9.04882 9.85355 8.85355L13.8536 4.85355C14.0488 4.65829 14.0488 4.34171 13.8536 4.14645L9.85355 0.146447C9.65829 -0.0488155 9.34171 -0.0488155 9.14645 0.146447C8.95118 0.341709 8.95118 0.658292 9.14645 0.853554L12.2929 4L0.5 4C0.223858 4 0 4.22386 0 4.5Z" fill="black" fill-opacity="0.8"/>
</svg>
`;

const ARROW_LEFT_RIGHT = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 11.5C1 11.7761 1.22386 12 1.5 12H13.2929L10.1464 15.1464C9.95118 15.3417 9.95118 15.6583 10.1464 15.8536C10.3417 16.0488 10.6583 16.0488 10.8536 15.8536L14.8536 11.8536C15.0488 11.6583 15.0488 11.3417 14.8536 11.1464L10.8536 7.14645C10.6583 6.95118 10.3417 6.95118 10.1464 7.14645C9.95118 7.34171 9.95118 7.65829 10.1464 7.85355L13.2929 11H1.5C1.22386 11 1 11.2239 1 11.5Z" fill="#47A7FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 4.5C15 4.77614 14.7761 5 14.5 5L2.70711 5L5.85355 8.14645C6.04882 8.34171 6.04882 8.65829 5.85355 8.85355C5.65829 9.04882 5.34171 9.04882 5.14645 8.85355L1.14645 4.85355C0.951184 4.65829 0.951184 4.34171 1.14645 4.14645L5.14645 0.146447C5.34171 -0.0488155 5.65829 -0.0488155 5.85355 0.146447C6.04882 0.341709 6.04882 0.658292 5.85355 0.853554L2.70711 4L14.5 4C14.7761 4 15 4.22386 15 4.5Z" fill="#47A7FF"/>
</svg>
`;
/**
 * @title SVG icons
 */

 @Injectable({
  providedIn: 'root',
})
export class IconService  {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('user-icon', sanitizer.bypassSecurityTrustHtml(USER_ICON));
    iconRegistry.addSvgIconLiteral('shopping-cart', sanitizer.bypassSecurityTrustHtml(SHOPPING_CART));
    iconRegistry.addSvgIconLiteral('calendar-cart', sanitizer.bypassSecurityTrustHtml(CALENDAR_CART));
    iconRegistry.addSvgIconLiteral('search', sanitizer.bypassSecurityTrustHtml(SEARCH));
    iconRegistry.addSvgIconLiteral('arrow-right-8', sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT_8));
    iconRegistry.addSvgIconLiteral('arrow-right', sanitizer.bypassSecurityTrustHtml(ARROW_RIGHT));
    iconRegistry.addSvgIconLiteral('arrow-left', sanitizer.bypassSecurityTrustHtml(ARROW_LEFT));
    iconRegistry.addSvgIconLiteral('arrow-left-right', sanitizer.bypassSecurityTrustHtml(ARROW_LEFT_RIGHT));
  }
}