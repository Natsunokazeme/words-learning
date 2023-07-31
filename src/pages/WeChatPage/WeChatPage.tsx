import React, {FC} from 'react'
import './WeChatPage.scss'
import Header from '../../components/Header/Header'

interface WeChatPageProps {}

const WeChatPage: FC<WeChatPageProps> = () => (
  <div className='WeChatPage'>
    <Header></Header>
    WeChatPage Component
  </div>
)

export default WeChatPage
