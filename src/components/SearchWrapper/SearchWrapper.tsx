import {Typography, Tooltip, IconButton, InputBase} from '@mui/material'
import React, {FC, useRef} from 'react'
import {Search} from '@mui/icons-material'
import './SearchWrapper.scss'

interface SearchWrapperProps {
  searchCallback: (value: string) => void
}

const SearchWrapper: FC<SearchWrapperProps> = (prop: SearchWrapperProps) => {
  const searchValueRef = useRef<string>('')
  const search = () => {
    // TODO: search api
    prop.searchCallback(searchValueRef.current)
  }
  return (
    <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
      <Tooltip arrow title='search'>
        <IconButton
          type='button'
          sx={{p: '10px'}}
          aria-label='search'
          color='inherit'
          onClick={() => search()}
        >
          <Search />
        </IconButton>
      </Tooltip>
      <InputBase
        sx={{ml: 1, flex: 1}}
        placeholder='Search'
        inputProps={{'aria-label': 'search'}}
        color='primary'
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

export default SearchWrapper
