# AgriVision
AgriVision: Aplikasi Petani Cerdas untuk Deteksi Penyakit Tanaman dan Edukasi Pertanian

AgriVision adalah aplikasi petani cerdas berbasis web yang memanfaatkan machine learning untuk mendeteksi penyakit tanaman melalui foto serta menyediakan edukasi pertanian, forum komunitas, dan informasi harga pasar guna mendukung pertanian yang modern dan berkelanjutan. Proyek ini bertujuan mendukung swasembada pangan nasional dalam membantu petani Indonesia meningkatkan produktivitas dan pengambilan keputusan secara lebih cepat dan tepat.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (disarankan versi 12 atau lebih tinggi)
- [npm](https://www.npmjs.com/) (Node package manager)

### Project Structure

Proyek AgriVision ini dirancang agar kode tetap modular dan terorganisir.

```text
agri-vision/
├── dist/                   # Compiled files for production
├── src/                    # Source project files
│   ├── assets/             # Assets folder
│   │   |   images/         # Images files
│   │   └── styles/         # Source CSS files
│   ├── scripts/            # Source JavaScript files
│   │   └── index.js        # Main JavaScript entry file
│   └── index.html/         # Main HTML file
├── .prettirrc              # Formating files
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Project metadata and dependencies
├── README.md               # Project documentation
├── webpack.common.js       # Webpack common configuration
├── webpack.dev.js          # Webpack development configuration
└── webpack.prod.js         # Webpack production configuration
```
