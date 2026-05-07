describe('Regres API Testing', () => {
    it('List Category', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
        })
    })

    it('Single Category by ID', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/1')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.id).to.eq(1)
        })  
    })

    it('Single Category by ID Not Found', () => {
        cy.request(
            {
                method: 'GET',
                url: 'https://api.escuelajs.co/api/v1/categories/9999',
                failOnStatusCode: false
            }
        )
        .then((response) => {
            expect(response.status).to.eq(400)
        })
    })

    it('Single Category by slug', () => {
        cy.request('GET', 'https://api.escuelajs.co/api/v1/categories/slug/test-category-ammr-8')
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.slug).to.eq('test-category-ammr-8')
        })
    })
    

    it('Create Category', () => {
        const newCategory = {
            name: 'Test Category Ammr 9',
            image: 'https://example.com/image.jpg'
        }
        cy.request('POST', 'https://api.escuelajs.co/api/v1/categories', newCategory)
        .then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.not.be.null
            expect(response.body.name).to.eq(newCategory.name)
            expect(response.body.image).to.eq(newCategory.image)
        })
    })

    it

    it('Update Category', () => {
        const updatedCategory = {
            name: 'Updated Category Ammr 23',
            image: 'https://example.com/updated-image.jpg'
        }
        cy.request('PUT', 'https://api.escuelajs.co/api/v1/categories/1', updatedCategory)
        .then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.not.be.null
            expect(response.body.name).to.eq(updatedCategory.name)
            expect(response.body.image).to.eq(updatedCategory.image)
        })
    })

    it('Delete Category', () => {
        cy.request('DELETE', 'https://api.escuelajs.co/api/v1/categories/325')
        .then((response) => {
            expect(response.status).to.eq(200)
        })
    })

    it('Delete Category Not Found', () => {
        cy.request(
            {
                method: 'DELETE',
                url: 'https://api.escuelajs.co/api/v1/categories/9999',
                failOnStatusCode: false
            }
        )
        .then((response) => {
            expect(response.status).to.eq(400)
        })
    })


})