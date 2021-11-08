import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm onSubmit={createBlog} />
  )
  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
})

test('<BlogForm /> check if received right details when a new blog is created', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm onSubmit={createBlog} />
  )
  const input = component.container.querySelector('#author')
  const form = component.container.querySelector('form')
  fireEvent.change(input, {
    target:{ value: 'Benny Carogna' }
  })
  fireEvent.submit(form)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Benny Carogna')
})