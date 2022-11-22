import React from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  //Собираем данные из формы.
  const {
    register,
    handleSubmit,
  } = useForm();
  
  
  async function handleOnSubmit(data){
    //Эксперимент, закидываем все данные в формате x-www-form-urlencoded
    let formBody = [];
    for(let item in data){
      //Перекодируем ключ и значение по частям в URI
      let encodedKey = encodeURIComponent(item);
      let encodedValue = encodeURIComponent(data[item]);
      //Пушим в массив
      formBody.push(encodedKey + '=' + encodedValue);
    } 
    //Объединяем строку через & 
    let joinedForm = formBody.join('&'); //firstName=Danila&mail=dan%40dan&country=Country&phone=%2B123-22-456-1&password=QWERTY12345
    console.log(joinedForm);
    //Путь запроса
    const location = 'https://script.google.com/macros/s/AKfycby6FhamgccyrwkrgbPivqZdvd4YQ6OvFPE0kpIFL8zpSIfkqbC8PHvanCg5IEwMGZtvJg/exec';
    //Параметры запроса, head и body
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: joinedForm,
    };
    try{
      const fetchResponse = await fetch(location, settings);
      const dataResponse = await fetchResponse.json();
      if(dataResponse){
        console.log(dataResponse);
      }
    }
    catch(e){
      console.log(e);
    }
  }
  return (
    <div className="App">
     <div className="w-full h-auto overflow-scroll block h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-4 flex items-center justify-center" >
      <div className="bg-white py-6 px-10 sm:max-w-md w-full ">

        <div className="sm:text-3xl text-2xl font-semibold text-center text-sky-600  mb-12">
            Registration Form 
        </div>

        <form onSubmit={handleSubmit((data) => handleOnSubmit(data))}>
            <div>
              <input {...register('firstName')} required type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500" placeholder="Name "/>
            </div>

            <div>
              <input {...register('mail')} required type="email" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 my-8" placeholder="Email Adress"/>
            </div>

            <div>
              <input {...register('country')} required type="text" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" placeholder="Country "/>
            </div>

            <div>
              <input {...register('phone')} required type="phone" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8" placeholder="Phone "/>
            </div>

            <div className="">
              <input required {...register('password')} type="password" className="focus:outline-none border-b w-full pb-2 border-sky-400 placeholder-gray-500 mb-8"  placeholder="Password " />
            </div>

            <div className="flex">
              <input required type="checkbox" className="border-sky-400 " value="" />
                <div className="px-3 text-gray-500">
                  I accept terms & conditions 
                </div>
            </div>

            <div className="flex justify-center my-6">
                <button  className="rounded-full  p-3 w-full sm:w-56  bg-sky-500 text-white text-lg transition font-semibold hover:bg-teal-800 hover:text-teal-100">
                  Create Account
                </button>
            </div>

            <div className="flex justify-center ">
                <p className="text-gray-500">Already have an acount? </p>
                <a href="#" className="text-sky-600 pl-2"> Sign In</a>
            </div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default App;
