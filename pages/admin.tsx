import { createPage } from "components/page"
import type { NextPage } from "next"
import dynamic from "next/dynamic"
// import App from '../components/admin/admin'

const App = dynamic(() => import("../components/admin/admin"), { ssr: false })

// const Admin: NextPage = () => {
// return <App />
// }

const Administration: NextPage = () => {
  return (
      <App />
  )
}

// export default createPage({
//   title: "Admin",
//   Page:
//   }
// })

export default Administration
