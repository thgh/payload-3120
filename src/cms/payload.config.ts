import { buildConfig } from 'payload/config'
import { Pages } from './collections/pages.collection'
import * as path from 'path'
import { Logo, LogoIcon } from './logo/logo.component'

import { UploadFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'

export default buildConfig({
  collections: [Pages],
  routes: {
    admin: '/cms/admin',
    api: '/cms/api',
    graphQL: '/cms/graphql',
    graphQLPlayground: '/cms/playground',
  },

  editor: lexicalEditor({}),
  localization: {
    locales: ['nl', 'fr', 'en'],
    defaultLocale: 'nl',
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/payload',
  }),
  admin: {
    bundler: webpackBundler(), // or viteBundler()
  },
  typescript: {
    outputFile: path.resolve(__dirname, './types/cms.types.ts'),
  },
})
