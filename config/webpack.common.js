const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const SitemapPlugin = require('sitemap-webpack-plugin').default;

const paths = [
  {
    path: './views/index.html',
    lastmod: '2021-10-16',
    prority: 0.8,
    changefreq: 'monthly',
  },
];

module.exports = {
  entry: {
    main: ['./src/assets/js/index.js', './src/assets/sass/main.scss'],
  },

  output: {
    filename: './assets/js/[name][contenthash].js',
    path: path.resolve(__dirname, '../dist/'),
    assetModuleFilename: './assets/img/[name][contenthash].[ext]',
    publicPath: '/',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {
                    tag: 'source',
                    attribute: 'src',
                    type: 'src',
                  },
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/views/index.html',
      filename: '/index.html',
      title: 'Frogie - meme generator',
      chunks: ['main'],

      meta: {
        charset: {
          charset: 'UTF-8',
        },
        'http-equiv': {
          'http-equiv': 'X-UA-Compatible',
          content: 'IE=edge',
        },
        viewport: {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0',
        },
        description: {
          name: 'description',
          content:
            'Frogie meme generator - simple to use #mem generator in retro style.',
        },
        keyword: {
          name: 'keywords',
          content: 'Meme generator, meme, frogie, pepe memes',
        },

        // robots
        robots: {
          name: 'robots',
          content: 'index,follow',
        },
        googlebot: {
          name: 'googlebot',
          content: 'index,follow',
        },
        google: {
          name: 'google',
          content: 'notranslate',
        },
        type: {
          property: 'type',
          content: 'website',
        },

        // Custom
        'format-detection': {
          name: 'format-detection',
          content: 'telephone=no',
        },
        theme_color: {
          name: 'theme_color',
          content: '#ffd100',
        },

        // og
        'og:type': {
          property: 'og:type',
          content: 'website',
        },
        'og:title': {
          property: 'og:title',
          content: 'Frogie - meme generator',
        },
        'og:description': {
          property: 'og:description',
          content:
            'Frogie meme generator - simple to use #mem generator in retro style.',
        },
        'og:site_name': {
          property: 'site_name',
          content: 'Frogie - meme generator',
        },
        'og:url': { property: 'og:url', href: 'https://frogiememe.com' },
        'og:locale': { property: 'og:locale', content: 'en_US' },

        author: {
          article: 'author',
          content: 'Mieszko Paluchowski',
        },
      },
    }),

    new MiniCssExtractPlugin({
      filename: './assets/css/[name][contenthash].css',
    }),

    new FaviconsWebpackPlugin({
      logo: './src/assets/static/favicons/frogie.png',
      cache: true,
      prefix: 'assets/favicons/',
      inject: true,

      favicons: {
        appName: 'Frogie - meme generator',
        appDescription:
          'Frogie meme generator - simple to use #mem generator in retro style.',
        appShortName: 'frogiememe',
        start_url: '/',
        scope: '/',
        orientation: 'portrait',
        display: 'standalone',
        background: '#FFD100',
        theme_color: '#FFD100',
      },
    }),

    new SitemapPlugin({
      // change later to https
      base: 'https://frogiememe.com',
      paths,
      options: {
        filename: 'sitemap.xml',
      },
    }),
  ],
};
