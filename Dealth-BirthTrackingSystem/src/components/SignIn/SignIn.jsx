import React,{useState} from 'react'
import govermentarm from '../../assets/governmentarm.png'
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import api from '../../api'
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN,REFRESH_TOKEN } from '../../constant';

const SignIn = () => {
    
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    // state to store form values and validate its state
    const [formData, setFormDate] = useState ({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    //handle input
    const handleChange = (e) => {
       const {name, value} = e.target;
       setFormDate({...formData, [name]: value});
    };

    //form Validation
    const validationForm = () => {
        let formErrors = {};

        if(!formData.username){
            formErrors.username = "Username is required"
        }

        if(!formData.password){
            formErrors.password = "Password is required"
        }

        return formErrors
    };

   //Handle form submission
   const handleSubmit = async (e) => {
    setIsLoading(true);
     e.preventDefault();
     const formErrors = validationForm();

     if(Object.keys(formErrors).length === 0){
        try {

            const res = await api.post('api/login/', 
              {
                
              username: formData.username,
              password: formData.password

              
              })
            localStorage.setItem(ACCESS_TOKEN,res.data.access);
            localStorage.setItem(REFRESH_TOKEN,res.data.access);
            navigate("/");
            
        } catch (error) {
          alert("Login failed: " + error.message);
            
        }finally{
            setIsLoading(false);
        }
       
        console.log('Form submitted successfully', formData);
     } else{
        setErrors(formErrors);
     }
  };


  return (
    <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <div className='flex justify-center mb-6'>
           <img src={govermentarm} alt='' className='w-24 h-24'/>
          </div>

          <div>

            <form onSubmit={handleSubmit}>

          <div className="relative mb-4">
            <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 pl-10 pr-2  mb-4 border rounded-md"
            />
            <BsFillPersonFill className='absolute left-3 top-2.5 text-gray-500 pointer-events-none'/>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className='relative mb-4'>
            <input
            text="Password"
            placeholder="Password"
            name="password"
            value={FormData.password}
            onChange={handleChange}
            className="w-full p-2 pl-10 pr-2 border rounded-md"
            />
            <BsFillEyeSlashFill className="absolute left-3 top-2.5 text-gray-500 pointer-events-none"/>
          
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}

          </div>
            
            
            
          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          </form>
            </div>

            
         

        </div>
        
    </div>
  )
}

export default SignIn