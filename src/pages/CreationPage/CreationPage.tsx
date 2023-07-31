import React, {FC} from 'react'
import './CreationPage.scss'
import Header from '../../components/Header/Header'

interface CreationPageProps {}

const CreationPage: FC<CreationPageProps> = () => (
  <div className='CreationPage'>
    <Header></Header>
    CreationPage Component
  </div>
)

export default CreationPage
