// @ts-ignore
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string
  readonly VITE_IMPORT: string
  readonly VITE_API: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
