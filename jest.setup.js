import { TextDecoder, TextEncoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// En caso de necesitar la implementación del FetchAPI
// import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
