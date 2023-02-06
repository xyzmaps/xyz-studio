module.exports = ({file, options, env}) => ({
  plugins: [
    require('autoprefixer')(),
    require('cssnano')({preset: 'default', discardUnused: false})
  ]
})
