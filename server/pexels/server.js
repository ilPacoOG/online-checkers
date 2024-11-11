// "use strict";
// var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
//     function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
//     return new (P || (P = Promise))(function (resolve, reject) {
//         function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
//         function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
//         function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
//         step((generator = generator.apply(thisArg, _arguments || [])).next());
//     });
// };
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// const express_1 = __importDefault(require("express"));
// const axios_1 = __importDefault(require("axios"));
// const app = (0, express_1.default)();
// const PORT = 3000;
// // pexels API key
// const PEXELS_API_KEY = 'UR3ulVQekKy8xHa3dRt9s51wAyatfMS0Qr21ogHT7A858beywtQBEKDy';
// // endpoint to get space iamge
// app.get('/space-image', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
//     try {
//         const response = yield axios_1.default.get('https://api.pexels.com/v1/search', {
//             headers: {
//                 Authorization: PEXELS_API_KEY
//             },
//             params: {
//                 query: 'space background',
//                 per_page: 25
//             }
//         });
//         if (response.data.photos.length > 0) {
//             const randomIndex = Math.floor(Math.random() * response.data.photos.length);
//             const randomPhoto = response.data.photos[randomIndex];
//             const backgroundImage = randomPhoto.src.original;
//             res.json({ backgroundImage });
//         }
//         else {
//             res.status(404).json({ error: 'No space background image found' });
//         }
//         // console.log(response.data);
//     }
//     catch (error) {
//         console.error('Error fetching space background:', error);
//         res.status(500).json({ error: 'Error fetching space background' });
//     }
// }));
// app.use(express_1.default.static('public'));
// app.listen(PORT, () => {
//     console.log(`server is running on http://localhost:${PORT}`);
// });
