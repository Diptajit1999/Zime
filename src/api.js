

const fetchData=async ()=>{


    try {
        const res= await fetch(`https://dummyjson.com/posts`)
        const data=await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }


}

export default fetchData