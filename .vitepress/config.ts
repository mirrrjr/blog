import { defineConfig } from 'vitepress'
import { getPosts } from './theme/serverUtils'

// Number of articles per page
const pageSize = 10

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
    title: 'MIRRR',
    base: '/',
    cacheDir: './node_modules/vitepress_cache',
    description: 'vitepress,blog,blog-theme',
    ignoreDeadLinks: true,
    themeConfig: {
        posts: await getPosts(pageSize),
        website: 'https://mirrrjr.vercel.app',
        // Comment repository address https://giscus.app/ Please overwrite after initializing according to the official instructions
        comment: {
            repo: 'mirrrjr/blog',
            repoId: 'R_kgDOPS_w_w',
            categoryId: 'DIC_kwDOPS_w_84CtbZn'
        },
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Category', link: '/pages/category' },
            { text: 'Archives', link: '/pages/archives' },
            { text: 'Tags', link: '/pages/tags' },
            { text: 'About', link: '/pages/about' }
        ],
        search: {
            provider: 'local'
        },
        //outline:[2,3],
        outline: {
            label: 'Article Summary'
        },
        socialLinks: [{ icon: 'github', link: 'https://github.com/mirrrjr' }]
    } as any,

    srcExclude: isProd
        ? [
            '**/trash/**/*.md', // 排除所有 trash 目录
            '**/draft/**/*.md', // 递归排除子目录
            '**/private-notes/*.md', // 排除特定文件
            'README.md'
        ]
        : ['README.md'],
    vite: {
        //build: { minify: false }
        server: { port: 5000 }
    }
    /*
      optimizeDeps: {
          keepNames: true
      }
      */
})
