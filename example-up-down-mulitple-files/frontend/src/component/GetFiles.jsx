import { useState, useEffect } from "react"
import { API } from "../API/API"



const GetFiles = ()=>{

    const initialInput = {
        name1: '',
        name2: '',
        image: ''
    }

    const [formData, setFormData] = useState(initialInput)
    const [image, setImage] = useState(null)
    const [displayImage, setDisplayImage] = useState(null)

    const handleImage = (e)=>{

        setImage([...e])

    }

    useEffect(()=>{
        const handleImage= async()=>{
            
            console.log(image)
            if(image){
    
                    const data1 = new FormData()

                    image.map((e)=>{
                        data1.append('name', e.name)
                        data1.append('photos', e)
                    })
            
                    try{
                        // 
                        let response = await API.saveImage(data1)
                            console.log(response.data);
                            setDisplayImage(response.data)
                    }catch(err){
                        console.log("error in frontend in saving image. error: ", err)
                    

                    }

            }else{
                console.log("image is empty")
            }
    
        }
        handleImage()

    },[image])
  
//    console.log( (image))
console.log(displayImage)

    const saveFormData = async()=>{
      
        // console.log(formData)

        // try{
        //     let response = await API.saveFormData(formData)
        //     console.log(response)
        // }catch(err){
        //     console.log(err)
        // }

    }

    
    const staticImage =  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flower_poster_2.jpg/800px-Flower_poster_2.jpg';

    return (<>

        <form>
            <input type="text" onChange={(e) => setFormData({...formData, name1: e.target.value})} placeholder="enter name" />
            <input type="text" onChange={(e) => setFormData({...formData, name2: e.target.value})} placeholder="enter image" />
            <input type="file" onChange={(e) => handleImage(e.target.files)} multiple/>

            <button type="button" onClick={()=>{saveFormData()}} >SUbmit</button>
        </form>

        <div>{
            
            (displayImage) ? (
                displayImage.map((e,index)=>(
                    <img key={index} src={e} alt='an image' style={{height: "500px;", width: "500px;"}} />
                ))
            ): 
            <img src={ staticImage} alt='an image' style={{height: "500px;", width: "500px;"}} />

        }

   </div>
       
        


    </>)
}

export default GetFiles