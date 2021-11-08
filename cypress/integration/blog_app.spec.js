describe('Blog list app', function(){
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Bennyy Test',
      username: 'benny',
      passwordHash: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })
  it('front page can be opened', function(){
    cy.contains('blogs')
  })
  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('benny')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()
    cy.contains('benny')
  })
  describe('when user is logged', () => {
    beforeEach(function() {
      cy.login({ username: 'benny', password: 'sekret' })
    })
    it('create new blog', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('benny test')
      cy.get('#url').type('www.test.com')
      cy.get('#button-create').click()
    })
    describe('and a blog exits', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'another note cypress',
          author: 'cypress',
          url:'www.test.com'
        })
      })
      it('can like a blog', () => {
        cy.get('.viewButton').click({ multiple: true })
        cy.get('#like').click({ multiple: true })
      })
      it('can like delete a blog', () => {
        cy.get('.viewButton').click({ multiple: true })
        cy.contains('delete').click()
      })
      it('check ordered by likes', function(){
        cy.createBlog({
          title: 'another note cypress10',
          author: 'cypress10',
          url:'www.test2.com',
          'likes': 7
        })
        cy.createBlog({
          title: 'another note cypress2',
          author: 'cypress2',
          url:'www.test2.com',
          'likes': 10
        })
        cy.get('.viewButton').click({ multiple: true })
        cy.get('.numberLikes').then( elements => {
          let strings = elements.map($el => $el.innerText)
          cy.wrap(strings).should('equal', strings.sort())
        })
      })
    })
  })
})