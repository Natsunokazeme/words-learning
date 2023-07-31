import React, {FC} from 'react'
import './NotebookPage.scss'
import Header from '../../components/Header/Header'

interface NotebookPageProps {}

const NotebookPage: FC<NotebookPageProps> = () => (
  <div className='NotebookPage'>
    <Header></Header>
    NotebookPage Component
  </div>
)

export default NotebookPage
