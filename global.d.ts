declare module '*.svg' {
  import { FC, SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string
      NEXTAUTH_URL: string
      NEXTAUTH_SECRET: string
      GOOGLE_CLIENT_ID: string
      GOOGLE_CLIENT_SECRET: string
      GOOGLE_REDIRECT_URI: string
      EMAIL: string
      EMAIL_PASSWORD: string
    }
  }
}

export {}
