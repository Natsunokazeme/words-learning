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
    prop.searchCallback(searchValueRef.current)
  }

  return (
    <Typography
      className='search-wrapper'
      variant='h6'
      component='div'
      sx={{flexGrow: 1}}
    >
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
        type='search'
        inputProps={{'aria-label': 'search'}}
        color='primary'
        classes={{
          input: 'search-input',
        }}
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
