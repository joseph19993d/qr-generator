import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import 'animate.css'


import { useRef } from 'react';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [myName, setMayname] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') || false
  );

  useEffect(() => {
    // Código para realizar efectos secundarios
    // Este código se ejecutará después de que el componente se monte o actualice
    // También se ejecutará antes de que el componente se desmonte
    async function delay() {
      console.log('Inicio');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 2 segundos
      setMayname(' animate__animated animate__hinge');
    }


    return () => {
      // Código para limpiar o cancelar los efectos secundarios, si es necesario
      // Este código se ejecutará antes de que el componente se desmonte
      delay();
    };
  }, [username]);
  
  const handleLogin = () => {
    // Verifica si el usuario y la contraseña son correctos
    if (username === 'gets@digital' && password === 'qrpaswore2024') {
      // Si son correctos, establece isLoggedIn a true
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', username);
    } else {
      // Si no son correctos, muestra un mensaje de error
      alert('Usuario o contraseña incorrectos');
    }
  };

  const handleLoginExit = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };



  // Inicializar qrCodes desde el localStorage o una lista vacía si no hay datos
  const [qrCodes, setQRCodes] = useState(() => {
    const storedCodes = localStorage.getItem('qrCodes');
    return storedCodes ? JSON.parse(storedCodes) : [];
  });
  const [inputValue, setInputValue] = useState('');

  // Cargar códigos QR del localStorage al montar el componente
  useEffect(() => {
    const storedCodes = localStorage.getItem('qrCodes');
    if (storedCodes) {
      setQRCodes(JSON.parse(storedCodes));
    }
  }, []);

  // Guardar códigos QR en el localStorage cuando cambia el estado
  useEffect(() => {
    localStorage.setItem('qrCodes', JSON.stringify(qrCodes));
  }, [qrCodes]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddQRCode = () => {
    if (inputValue.trim() !== '') {
      setQRCodes([...qrCodes, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleDownloadQRCode = (index) => {
    html2canvas(document.getElementById(`qr-code-${index}`)).then(canvas => {
      const dataUrl = canvas.toDataURL('image/png');

      // Crea un enlace temporal y simula un clic para descargar la imagen
      var link = document.createElement('a');
      link.download = `j-qr-code-${index}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div>

      <div className="App">
        {!isLoggedIn ? (
          <div className=" App mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">

            <div className='bg-gray-100 max-w-[500px] m-auto pb-[15px] rounded px-2 loginContent '>

            <div className="mx-auto max-w-lg text-center   ">
              <p className={`text-2xl font-bold sm:text-3xl ml-1 text-purple-600 ${myName}  `} >By joseph</p>
              <h1 className="text-2xl font-bold sm:text-3xl flex flex-col ">Welcome to </h1>
              <p className='text-2xl font-bold sm:text-3xl ml-1 text-purple-600 animate__animated animate__bounce'>J-QR-Generator</p>
              <p className="mt-4 text-gray-500">
                The application is designed to generate QR codes in large quantities, providing complete control over the process. Ideal for both businesses and individual users, its intuitive interface and advanced functionality ensure an efficient and secure experience in bulk QR code generation.
              </p>
            </div>

            <form action="#" className="mx-auto mb-0 mt-8 max-w-md space-y-4   ">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>

                <div className="relative">
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>

                <div className="relative ">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                  />


                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 text-gray-400" stroke="currentColor" transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#a00e0e" stroke-width="0.768"></g><g id="SVGRepo_iconCarrier"> <path d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13" stroke="#1C274C" stroke-width="0.624" stroke-linecap="round"></path> <path d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13" stroke="#1C274C" stroke-width="0.624" stroke-linecap="round"></path> <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13" stroke="#1C274C" stroke-width="0.624" stroke-linecap="round"></path> <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8" stroke="#1C274C" stroke-width="0.624" stroke-linecap="round"></path> </g></svg>
                    {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg> */}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <content className="flex flex-col md:flex-row text-gray-500 ">
                  <p className="text-sm t">
                    No account?
                    {/* <a className="underline" href="#">Sign up</a> */}

                  </p>
                  <a href='https://youtube.com/'>
                  <span>
                    <svg width="64px" height="35px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='ml-[13px] md:ml-0 mt-[-8px] '>
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31ZM16 28.8462C22.5425 28.8462 27.8462 23.5425 27.8462 17C27.8462 10.4576 22.5425 5.15385 16 5.15385C9.45755 5.15385 4.15385 10.4576 4.15385 17C4.15385 19.5261 4.9445 21.8675 6.29184 23.7902L5.23077 27.7692L9.27993 26.7569C11.1894 28.0746 13.5046 28.8462 16 28.8462Z" fill="#BFC8D0"></path>
                        <path d="M28 16C28 22.6274 22.6274 28 16 28C13.4722 28 11.1269 27.2184 9.19266 25.8837L5.09091 26.9091L6.16576 22.8784C4.80092 20.9307 4 18.5589 4 16C4 9.37258 9.37258 4 16 4C22.6274 4 28 9.37258 28 16Z" fill="url(#paint0_linear_87_7264)"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 30C23.732 30 30 23.732 30 16C30 8.26801 23.732 2 16 2C8.26801 2 2 8.26801 2 16C2 18.5109 2.661 20.8674 3.81847 22.905L2 30L9.31486 28.3038C11.3014 29.3854 13.5789 30 16 30ZM16 27.8462C22.5425 27.8462 27.8462 22.5425 27.8462 16C27.8462 9.45755 22.5425 4.15385 16 4.15385C9.45755 4.15385 4.15385 9.45755 4.15385 16C4.15385 18.5261 4.9445 20.8675 6.29184 22.7902L5.23077 26.7692L9.27993 25.7569C11.1894 27.0746 13.5046 27.8462 16 27.8462Z" fill="white"></path>
                        <path d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z" fill="white"></path>
                        <defs>
                          <linearGradient id="paint0_linear_87_7264" x1="26.5" y1="7" x2="4" y2="28" gradientUnits="userSpaceOnUse">
                            <stop stop-color="gray"></stop>
                            <stop offset="1" stop-color="gray"></stop>
                          </linearGradient>
                        </defs>
                      </g>
                    </svg>
                  </span>
                  </a>

                  <p className='whatsapp ext-gray-500'> 3007111546</p>
                </content>
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-purple-500 px-5 py-3 text-sm font-medium text-white"
                  onClick={handleLogin}
                >
                  Sign in
                </button>

              </div>
            </form>

            </div>
          </div>
        ) : (
          <div>
            <div className="fixed inset-x-0 bottom-0">
              <div className="bg-purple-900 px-4 py-3 text-white">
                <p className="text-center text-sm font-medium">
                  Not problem on exit, your data is on localStorage.
                  {/* <a href="#" className="inline-block underline"> Check out this new course! </a> */}
                  <button
                    type="submit"
                    className="inline-block rounded-lg bg-purple-600 px-5 py-3 text-sm font-medium text-white ml-2 "
                    onClick={handleLoginExit}
                  >
                    Exit
                  </button>
                </p>
              </div>
            </div>
            <h1 className='text-2xl font-bold sm:text-3xl ml-1 text-purple-600 animate__animated animate__bounce mt-5  welcomeSms' >Hello Gets, welcome.</h1>




            <section className='m-auto'>
              <h1> QR code Generator - last for ever</h1>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder=" Enter URL"
                />
                <button onClick={handleAddQRCode} className='ml-2 bg-purple-500 rounded px-3 py-2 mt-1'>Add</button>
              </div>
              <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">


                <div className="mt-1">
                  <p className="text-sm text-gray-500">Showing <span> All </span> of All</p>
                </div>

                <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4  p-2">
                  {/* AQUI COMIENZA LA IMAGEN QR*/}
                  {qrCodes.map((code, index) => (
                    <div key={index} className='group block overflow-hidden  bg-purple-600 rounded-b-[10px]  w-[265px] h-[365px] m-auto'>
                      <div id={`qr-code-${index}`} className=' bg-none w-[265px] h-[265px]  p-1 '>
                        <QRCode value={code}  />
                      </div>
                      <button onClick={() => handleDownloadQRCode(index)}  className='  ml-2 bg-purple-900 px-4 py-3 text-white rounded   '>Descargar</button>
                      <div><a href={code} className=' underline'>{code}</a></div>

                    </div>
                  ))}

                </ul>

                
              </div>
            </section>



          </div>
        )}
      </div>




    </div>
  );
}

export default App;
