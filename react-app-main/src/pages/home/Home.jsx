import React from "react"
import { Card } from "../../components/blog/Card"
import { Category } from "../../components/category/Category"

export const Home = () => {
  return (
    <>
    <div>
      <h1>
        Home Page
      </h1>
    </div>
      <Category />
      <Card />
    </>
  )
}
