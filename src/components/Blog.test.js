import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

const blog = {
  title: 'test title',
  author: 'benny test',
  url: 'www.test.com',
  likes: 1
}


test('test Blog component', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikes={mockHandler}/>
  )
  const button = component.container.querySelector('button')

  console.log(prettyDOM(button))

  const buttonView = component.getByText('like')
  fireEvent.click(buttonView)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(component.container).toHaveTextContent(
    'test title'
  )
})
test('blog list shows by default title and author ', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.details')
  expect(div).toHaveStyle('display: none')
})
test('blog list shows details when view button is clicked', () => {
  const component = render(
    <Blog blog={blog} />
  )
  const div = component.container.querySelector('.details')
  const buttonView = component.container.querySelector('.viewButton')
  fireEvent.click(buttonView)
  expect(div).not.toHaveStyle('display: none')
})
test('blog list like button clicked twice', () => {
  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} handleLikes={mockHandler}/>
  )
  const buttonView = component.getByText('like')
  fireEvent.click(buttonView)
  fireEvent.click(buttonView)

  expect(mockHandler.mock.calls).toHaveLength(2)
})