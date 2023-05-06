import type { NextPage } from 'next'
import HomeComponent from '../components/Home'

import Layout from '../components/Layout'

const HomePage: NextPage = () => {
  return (
   <Layout>
      <HomeComponent />
   </Layout>
  )
}

export default HomePage
