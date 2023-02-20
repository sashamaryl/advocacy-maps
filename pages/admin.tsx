import { createPage } from "components/page"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
const App = dynamic(() => import("components/moderation/moderation"), { ssr: false })


export default createPage({
  title: "Admin",
  Page: () => {
    return <App />
  }
})
