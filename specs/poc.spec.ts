import  supertest from 'supertest'
const request = supertest('http://localhost:4000')

describe('Checking Service Up', () =>{
    it('GET /status', async () => {
        const response = await request.get('/status')
        expect(response.status).toBe(200);
    })
})


describe('TEST APIs', () => {  
    const userId = -1;

    it('Add Items', async () => { 
        const data = {userId, items: "M23,M24,T1,T2,T3"}
        const response = await request.post('/addItems').send(data)
        expect(response.status).toBe(200)
    })

    it('get Items', async () => { 
        const response = await request.get(`/getItems?userId=${userId}`)
        expect(response.status).toBe(200);
        const reqRes = JSON.parse(response.text)[0];

        const movieList = reqRes.movieList;
        const tvShowList = reqRes.tvShowList;

        let correctness = true; 
        if(!(movieList.length === 2 && movieList.includes("23") && movieList.includes("24"))){
            correctness = false;
        }
        else if(!(tvShowList.length === 3 && tvShowList.includes("1") && tvShowList.includes("2") && tvShowList.includes("3"))){
            correctness = false;
        }

        expect(correctness).toBe(true);
    })

    it('Remove Items', async () => { 
        const data = {userId, items: "M23,T1,T2"}
        const response = await request.post('/removeItems').send(data)
        expect(response.status).toBe(200)
    })

    it('get Items', async () => { 
        const response = await request.get(`/getItems?userId=${userId}`)
        expect(response.status).toBe(200);
        const reqRes = JSON.parse(response.text)[0];

        const movieList = reqRes.movieList;
        const tvShowList = reqRes.tvShowList;

        let correctness = true; 
        if(!(movieList.length === 1 && movieList.includes("24"))){
            correctness = false;
        }
        else if(!(tvShowList.length === 1 && tvShowList.includes("3") )){
            correctness = false;
        }

        expect(correctness).toBe(true);
    })

    it('Remove Items', async () => { 
        const data = {userId, items: "M24,T3"}
        const response = await request.post('/removeItems').send(data)
        expect(response.status).toBe(200)
    })

    it('get Items', async () => { 
        const response = await request.get(`/getItems?userId=${userId}`)
        expect(response.status).toBe(200);
        const reqRes = JSON.parse(response.text)[0];

        const movieList = reqRes.movieList;
        const tvShowList = reqRes.tvShowList;

        let correctness = true; 
        if(!(movieList.length === 0 && tvShowList.length === 0)){
            correctness = false;
        }
        expect(correctness).toBe(true);
    })
})