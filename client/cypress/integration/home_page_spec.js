describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.visit('/') // change URL to match your dev URL
  })

  it('successfully logs in using create new user', function() {
    cy.contains('Don\'t have an account').click();

    // cy.url().should('include', '/newUrl');

    cy.get('.email_input')
    .type('example@example.com')

    cy.get('.pw_input')
    .type('test')

    cy.get('.login_submit_btn').click();
  })

  //add test that sends req to server to check for email and password validation
  // it('successfully authorizes email/pw for existing user', function() {

  // })
})