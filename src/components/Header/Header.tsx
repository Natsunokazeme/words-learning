import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import './Header.scss'
import {useRef, useState} from 'react'
import {Login, Search, Upload} from '@mui/icons-material'

const Header = (props: any) => {
  // const [searchValue, setSearchValue] = useState('')

  const SearchWrapper = () => {
    const searchValueRef = useRef<string>('')
    const search = () => {
      // TODO: search api
      console.log('search', searchValueRef.current)
    }
    return (
      <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
        <Tooltip arrow title='search'>
          <IconButton
            type='button'
            sx={{p: '10px'}}
            aria-label='search'
            onClick={() => search()}
          >
            <Search />
          </IconButton>
        </Tooltip>
        <InputBase
          sx={{ml: 1, flex: 1}}
          placeholder='Search'
          inputProps={{'aria-label': 'search'}}
          style={{width: 'calc(100% - 100px)'}}
          padding-left='50px'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              search()
            }
          }}
          onChange={(e) => {
            searchValueRef.current = e.target.value
          }}
        />
      </Typography>
    )
  }

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <SearchWrapper />
          <Tooltip arrow title='upload'>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='login'
            >
              <Upload />
            </IconButton>
          </Tooltip>
          <Tooltip arrow title='login'>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='login'
            >
              <Login />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </>
  )
}
export default Header
