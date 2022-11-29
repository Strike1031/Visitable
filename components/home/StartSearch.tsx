import React from 'react'
import styles from 'styles/Home.module.css'
import Grid from '@material-ui/core/Grid'
export interface StartSearchProps {
  className?: string
}

export const StartSearch: React.FC<StartSearchProps> = () => {
  return (
    <section className="justify-center">
      <div className={styles["container"]}>
      <p className="text-center mb-2 md:mb-4 text-2xl md:text-4xl lg:text-5xl">How it works</p>
      {/* <Grid className={styles['start-search-container']} container spacing={3}>
        {searchItems.map((item, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
          <SearchItem {...item}></SearchItem>
          </Grid>
          ))}
        </Grid> */}
      <div className='flex flex-col justify-between items-center md:flex-row md:justify-evenly md:items-start'>
        {searchItems.map((item, i) => (
          <SearchItem {...item}></SearchItem>
          ))}
      </div>
          
                </div>
    </section>
  )
}

interface SearchItemProps {
  title: string
  description: string
  iconPath: string
}
const SearchItem: React.FC<SearchItemProps> = ({ title, description, iconPath }) => {
  return (
    <div className="w-4/5 md:w-1/4 mt-10">
      <img className="w-2/5 mb-4 m-auto" src={iconPath}></img>
      <p className="text-center text-xl lg:text-3xl">{title}</p>
      <p className="text-center text-base lg:text-lg text-gray-500">{description}</p>
    </div>
  )
}

const searchItems: SearchItemProps[] = [
  {
    title: 'Bars',
    description: '',
    iconPath: 'Java.svg',
  },
  {
    title: 'Restaurants',
    description: '',
    iconPath: 'Python.svg',
  },
  {
    title: 'Cafes',
    description: '',
    iconPath: 'JavaScript.svg',
  },
]
