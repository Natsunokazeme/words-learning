import React, {FC} from 'react'
import './AccountPage.scss'
import Header from '../../components/Header/Header'

interface AccountPageProps {}

const AccountPage: FC<AccountPageProps> = () => (
  <div className='AccountPage'>
    <Header></Header>
    AccountPage Component
  </div>
)

export default AccountPage
