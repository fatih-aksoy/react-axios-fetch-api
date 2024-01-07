//? 1. React LifeCycle asamalari ve use Effect kullanimi

//! KISACA
//? Mounting: constructor(), render(), componentDidMount()
//? Updating: render(), componentDidUpdate()
//? Unmounting: componentWillUnmount()

//! a. Mounting(olusturmak)
// constructor: bilesenin baslatilmasi
// render: JSX in olusturulmasi
// componentDidMount: Bilesenin DOM a eklenmesi ve ilk render sonrasi calisan islemler. it is commonly used for performing side effects, such as fetching data from an API or subscribing to events. component, props ve state degisimlerinde re-render olur.

//! b. Updating(guncelleme)
// shouldComponentUpdate: Yeniden render isleminin gerceklestirilip gerceklestirilmeyecegni kontrol eder.
// render: Guncellenmis JSX olusturulur
// componentDidUpdate: guncellenen bilesenin  islemleri

//! c. Unmounting (Kaldirma)
// componentWillUnmount: Bilesenin DOM dan kaldiirlmasi oncesinde calisan islemler

// USEEFFECT: useEffect fonskiyonu componentlerde yasam dongusu metodlarinin yerine gecer ve ozellikle yan etkileri (API call lar, abonelikler, vs) yonetmek icin kullainilir.

//! ORNEK
// import React, { useState, useEffect } from "react";

// const LifecycleExample = () => {
//   // Mounting Aşaması
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     // componentDidMount
//     console.log("Component is mounted.");

//     // Cleanup işlemi için componentWillUnmount
//     return () => {
//       console.log("Component will unmount.");
//     };
//   }, []); // Boş bağımlılık dizisi, sadece ilk mount anında çalışmasını sağlar.

//   // Updating Aşaması
//   useEffect(() => {
//     // componentDidUpdate
//     console.log("Component is updated.");

//     // Cleanup işlemi için componentWillUnmount (previousProps ve previousState ile birlikte)
//     return () => {
//       console.log("Component is updated - Cleanup.");
//     };
//   }, [count]); // count state'i güncellendiğinde çalışır.

//   const handleIncrement = () => {
//     setCount((prevCount) => prevCount + 1);
//   };

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={handleIncrement}>Increment</button>
//     </div>
//   );
// };

// export default LifecycleExample;
//! *****************

//? 2. React'ta "props drilling" problemi nedir ve bu problemi nasıl çözebiliriz?

//Props drilling refers to passing props down to other components nested within a component. This means that intermediate or lower-level components receive data they may not necessarily need. As a solution, global state management tools such as Context API or Redux can be used.

// Props drilling, bir component in altındaki diğer bir component e data iletmek için props'ları geçirmek anlamına gelir. Bu, intermediate-level veya lover-level component lerin ihtiyaç duymadığı datalari alması anlamına gelir. Çözüm olarak, Context API veya Redux gibi global durum yönetim tools(arac) lari kullanılabilir.

//! ORNEK
// Varsayalım ki, bir uygulamada bir kullanıcı profili bileşeni (UserProfile) var ve bu bileşen içinde bir başlık (UserHeader) ve bir içerik alanı (UserContent) bulunuyor. UserHeader bileşeni, kullanıcı adını gösteriyor, ancak bu bilgi UserProfile bileşeninden gelmekte ve bu bilgi UserContent bileşenine aktarılmaktadır. Bu durumda props drilling kullanılıyor.

//! UserProfile.js
// import React from 'react';
// import UserHeader from './UserHeader';
// import UserContent from './UserContent';

// const UserProfile = ({ username }) => {
//   return (
//     <div>
//       <UserHeader username={username} />
//       <UserContent username={username} />
//     </div>
//   );
// };

// export default UserProfile;

// //! UserHeader.js
// import React from 'react';

// const UserHeader = ({ username }) => {
//   return <h2>Welcome, {username}!</h2>;
// };

// export default UserHeader;

// //! UserContent.js
// import React from 'react';

// const UserContent = ({ username }) => {
//   return <p>{username}'s content goes here.</p>;
// };

// export default UserContent;
//! *****************

//? 3. Redux nedir ve ne zaman kullanilmalidir?

// Redux, React uygulamalarında global durumu yönetmek için kullanılan bir JavaScript kütüphanesidir. Redux, büyük ve karmaşık uygulamalarda durumun merkezi bir yerde tutulmasını sağlar. Redux, özellikle durumun paylaşılması gereken çok sayıda bileşen veya durumun karmaşık bir şekilde yönetilmesi durumunda tercih edilir.

// Redux is a JavaScript library used to manage global state in React applications. Redux ensures that the state is centrally located, especially in large and complex applications where the state needs to be shared among numerous components or when managing state becomes intricate.

// Redux är ett JavaScript-bibliotek som används för att hantera globalt tillstånd i React-applikationer. Redux säkerställer att tillståndet är centralt beläget, särskilt i stora och komplexa applikationer där tillståndet behöver delas mellan många komponenter eller när hanteringen av tillståndet blir intrikat.

//! ORNEK
// npm install redux react-redux

//?  A. Ardından, aşağıdaki gibi bir Redux store oluşturun:
//! actions.js
// export const increment = () => {
//   return {
//     type: "INCREMENT",
//   };
// };

// export const decrement = () => {
//   return {
//     type: "DECREMENT",
//   };
// };

//! reducers.js
// const counterReducer = (state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { count: state.count + 1 };
//     case "DECREMENT":
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// };

// export default counterReducer;

//? B. Redux store'unu oluşturun:
//! store.js
// import { createStore } from 'redux';
// import counterReducer from './reducers';

// const store = createStore(counterReducer);

// export default store;

//? C. React uygulamanızda Redux kullanın:
//! App.js
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement } from './actions';

// const App = () => {
//   const count = useSelector((state) => state.count);
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>Counter: {count}</h1>
//       <button onClick={() => dispatch(increment())}>Increment</button>
//       <button onClick={() => dispatch(decrement())}>Decrement</button>
//     </div>
//   );
// };

// export default App;
//! *****************

//? 3. What is the significance of the key prop in React lists?

// The key prop is used in React lists to give each item a unique identifier. It helps React identify which items have changed, been added, or been removed in a list improving performance and avoiding unnecessary re-rendering of components.

// key prop, React listelerinde her öğeye benzersiz bir tanımlayıcı vermek için kullanılır. Bu, React'in listenin içinde hangi öğelerin değiştiğini, eklenmiş olduğunu veya kaldırılmış olduğunu belirlemesine yardımcı olur. Bu durum, performansı artırır ve bileşenlerin gereksiz yeniden render edilmesini önler.

//? 4. React Lifting State Up kavramını açıklayınız ?

// React Lifting State Up, bir bileşenin durumunu bir üst bileşene taşıma işlemidir. Bu sayede farklı bileşenler arasında durum paylaşımı mümkün olur. Özellikle parent ve child bileşenler arasında durum paylaşımı gerekiyorsa kullanılır.

// React Lifting State Up" is the process of lifting the state of a component up to its parent component. This enables sharing state among different components, particularly when there is a need for state sharing between parent and child components.

//? 5.  What are the key features of React?

// Virtual DOM: React uses a virtual representation of the actual DOM, which improves performance by minimizing direct manipulations to the real DOM.
// Component-based architecture: React promotes the creation of reusable UI components.
// One-way data flow: React follows a unidirectional data flow, making it easier to track and manage changes in the application state.
// JSX: React uses JSX, a syntax extension that allows you to write HTML￾like code within JavaScript.

//? 6. React Context Api ve reducer'ın kullanımını örnekleyin ve hangi senaryolarda tercih edebileceğini açıklayabilir misiniz ?

// Context API, React uygulamalarında durumu paylaşmak için kullanılır. Reducer ise, durum yönetimi için kullanılan fonksiyonlardır. Aşağıda örnek bir kullanım gösterilmiştir:

// React Context API ve reducer, global durumu yönetmek için kullanılan araçlardır. İki konsepti birleştirerek, uygulama genelindeki durumu daha etkili bir şekilde kontrol edebilirsiniz. İşte bir örnek:

//? A. Context Olusturma
//! AppContext.js
// import { createContext, useReducer, useContext } from "react";

// const AppContext = createContext();

// const initialState = {
//   count: 0,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return { count: state.count + 1 };
//     case "DECREMENT":
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// };

// const AppProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <AppContext.Provider value={{ state, dispatch }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// const useAppContext = () => {
//   return useContext(AppContext);
// };

// export { AppProvider, useAppContext };

//? B. Reducer ve context olusturma

//! CounterComponent.js
// import React from "react";
// import { useAppContext } from "./AppContext";

// const CounterComponent = () => {
//   const { state, dispatch } = useAppContext();

//   const increment = () => {
//     dispatch({ type: "INCREMENT" });
//   };

//   const decrement = () => {
//     dispatch({ type: "DECREMENT" });
//   };

//   return (
//     <div>
//       <h1>Count: {state.count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

// export default CounterComponent;

//? C. Ana Uygulama İçinde ContextProvider Kullanımı:
//! App.js
// import React from 'react';
// import { AppProvider } from './AppContext';
// import CounterComponent from './CounterComponent';

// const App = () => {
//   return (
//     <AppProvider>
//       <div>
//         <h1>My React App</h1>
//         <CounterComponent />
//       </div>
//     </AppProvider>
//   );
// };

// export default App;

// Bu örnekte, AppContext adlı bir context oluşturuldu. AppProvider bileşeni, useReducer ile birlikte context içindeki durumu ve bir dispatcher'ı sağlar. Ardından, useAppContext özel bir hook ile bu context'e erişim sağlanır. CounterComponent bileşeni, bu context'ten durumu alır ve dispatcher'ı kullanarak durumu günceller.

// Bu yaklaşım, özellikle uygulamanızın genel durumunu etkili bir şekilde yönetmek istediğiniz karmaşık durumları ele almak için tercih edilebilir. Örneğin, büyük ölçekli uygulamalarda, tema, oturum durumu, kullanıcı yetkileri gibi durumları global olarak yönetmek için kullanılabilir.

//? 8. What is props in React?

// Props (short for properties) are used to pass data from a parent component to a child component. Props are read-only and cannot be modified by the child component. They are passed as attributes to the child component in JSX.

//? 9. What is state in React?

// State is a built-in object in React that holds component-specific data. It represents the mutable values that can change over time and trigger a re￾render of the component.

// State, React'te bileşen özel verilerini tutan yerleşik bir nesnedir. Bu, zaman içinde değişebilen ve bileşenin yeniden renderını tetikleyebilen değişken değerleri temsil eder.

//? 10. What is the difference between functional and class components?

//! FUNCTIONAL COMPONENT
// A functional component, also known as a stateless component, is a JavaScript function that returns JSX to define the structure and appearance of a React component. Functional components are primarily used for presenting UI and don't have their own internal state.

// Bir işlevsel bileşen, aynı zamanda durumsuz bir bileşen olarak da bilinen, bir JavaScript fonksiyonudur ve bir React bileşeninin yapısını ve görünümünü tanımlamak için JSX döndürür. İşlevsel bileşenler, temel olarak UI'yi sunmak için kullanılır ve kendi iç durumları yoktur.

//! ORNEK (FUNCTIONAL COMPONENT)
// import { useState, useEffect, useContext, useReducer } from "react"

// const UseStateCounter = () => {
//   //   let count = 0

//   //! count adinda bir state tanimlamis olduk ve baslangic degerine 0 atadik.
//   const [count, setCount] = useState(0)

//   const handleInc = () => {
//     // count = count + 1
//     //! Bir state'in degeri sadece setter metodu ile olabilir.
//     setCount(count + 1)
//   }

//   const handleDec = () => {
//     if (count <= 0) {
//       alert("count can not be less than 0")
//     } else {
//       setCount(count - 1)
//     }
//   }

//   return (
//     <div>
//       <h2>USE STATE HOOK</h2>
//       <h1>Count:{count}</h1>
//       <button onClick={handleInc}>INC</button>
//       <button onDoubleClick={() => setCount(0)}>CLR</button>

//       {/* Eger setCount metodunu callback ile yazmazsak bu metot ilk acilistan itibaren doğrudan cagirilmis olur. Bu durumda da count state'inin gunceller. State guncellendigi icinde component re-render olur. Re-render ise yeninden setCount araciligi state'in guncellenmesine yol acar ve sonsuz donguye girer */}

//       {/* <button onClick={handleDec}>DEC</button> */}
//       <button onClick={() => count > 0 && setCount(count - 1)}>DEC</button>
//     </div>
//   )
// }

// export default UseStateCounter
//! ******************************************

//! CLASS COMPONENT
//* ================= CLASS COMPONENTS AND STATE ====================
//* React'da Class-Component'ler ES6 class yapisina dayanmaktadir.
//* Cok fazla boilerplate kod icermektedir.
//* Ancak Class-Component'ler React'da state'leri barindiran ilk component yapisidir.
//* State, aslinda bir component hakkinda bilgi tutan bir React nesnesidir.
//* Bir componentin state'i zaman icerisinde degisebilir.
//* State her degistiginde React bu componenti yeninden render eder.
//* Bir state'e baslangıc degeri constructor metodu icersinde this.state ile atanabilir
//* constructor'in disinda state, setState() metodu ile degistilebilir.
//* ====================================================================

//* Class Components in React are based on the ES6 class structure.
//* They contain a lot of boilerplate code.
//* However, Class Components are the initial component structure in React that holds state.
//* State is essentially a React object that holds information about a component.
//* The state of a component can change over time.
//* Whenever the state changes, React re-renders the component.
//* The initial value of a state can be assigned with this.state inside the constructor method.
//* Outside the constructor, the state can be changed using the setState() method.

//! ORNEK (CLASS COMPONENT)
import React from "react";

class Counter extends React.Component {
  constructor(props) {
    super(props);

    //!  State'e baslangic degeri verdik.
    this.state = {
      count: 0,
    };

    //? increment metodunun Counter class'ina baglanmasi (bind)
    //  this.increment = this.increment.bind(this)
  }

  //! Yazmis oldugumuz metotlar default olarak classa baglanmaz.
  //! Ancak, React built-in fonksiyonlari baglidir.

  //* Bunun icin metotlarimizi ya constructor icerisinde baglamaliyiz yada otomatik baglamayi saglayan arrow fonksiyonlarini kullanmaliyiz.

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    });
  };
  render() {
    return (
      <div>
        <h2>Class Components</h2>
        <h1>Count:{this.state.count}</h1>
        <button onClick={this.increment} className="btn btn-success">
          INC
        </button>
        <button onClick={() => this.setState({ count: 0 })}>CLR</button>
        <button onClick={this.decrement}>DEC</button>
      </div>
    );
  }
}

export default Counter;

//! ******************************************

//! DIFFERENCE
// Functional components are simpler and easier to read and test compared to class components. They don't have their own state or lifecycle methods. Class components, on the other hand, can manage their own state and have access to lifecycle methods such as componentDidMount() and componentDidUpdate().

// İşlevsel bileşenler, sınıf bileşenlerine göre daha basit, okunabilir ve test edilebilir. Kendi durumları veya yaşam döngü yöntemleri yoktur. Öte yandan, sınıf bileşenleri kendi durumlarını yönetebilir ve componentDidMount() ve componentDidUpdate() gibi yaşam döngü yöntemlerine erişebilir.

//? 11. What is react?

// React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them based on changes in data.

// React, kullanıcı arayüzleri oluşturmak için popüler bir JavaScript kütüphanesidir. Geliştiricilere yeniden kullanılabilir UI bileşenleri oluşturma imkanı tanır ve verideki değişikliklere dayalı olarak bunları etkili bir şekilde güncelleme ve render etme yeteneği sağlar.

//? 12. What is the difference between React and React Native?

// React is a library for building web applications, while React Native is a framework for building native mobile applications. React Native allows you to write components using React syntax, but it compiles them to native code rather than rendering them as HTML elements.

//? 13. What is the purpose of the virtual DOM in React?

// The virtual DOM is a lightweight copy of the actual DOM maintained by React. It allows React to perform efficient updates and minimize direct manipulations to the real DOM. React compares the virtual DOM with the previous version and updates only the necessary parts, improving performance.

// The virtual DOM, React tarafından sürdürülen actual DOM'un hafif bir kopyasıdır. Bu, React'in verimli güncellemeler gerçekleştirmesine ve actual DOM üzerinde doğrudan manipülasyonları en aza indirmesine olanak tanır. React, The virtual DOM'u önceki versiyonla karşılaştırır ve sadece gerekli olan kısımları günceller, performansı artırır.

//? 14. What are React Hooks?

// React Hooks are functions introduced in React 16.8 that allow you to use state and other React features in functional components. Hooks provide away to use local component state, lifecycle methods, and other React features without writing a class.

// React Hooks, React 16.8'de tanıtılan ve functional components lerde durum ve diğer React özelliklerini kullanmanıza olanak tanıyan fonksiyonlardır. Hooks, bir class yazmadan yerel bileşen durumu, life cycle methods ve diğer React özelliklerini kullanma yolu sağlar.

//? 15. What is the useState() Hook used for?

// The useState() Hook is a built-in Hook in React that allows functional components to manage local state. It returns an array with two elements: the current state value and a function to update the state. It replaces the need for using a class and this.setState() to manage state.

// useState() Hook, React'te yerel durumu yönetmeye olanak tanıyan yerleşik bir Hook'tur. Bu, functional component lere, mevcut durum değerini ve durumu güncelleme işlevini içeren bir dizi döndürür. Bu, bir sınıf ve this.setState() kullanma ihtiyacını ortadan kaldırarak durumu yönetir.

//? 16. What is the useEffect() Hook used for?

// The useEffect() Hook is a built-in Hook in React that allows functional components to perform side effects. It replaces the lifecycle methods like componentDidMount(), componentDidUpdate(), and componentWillUnmount(). The useEffect() Hook runs after every render by default.

//? 17. What is React Router used for?

// React Router, React uygulamalarında sayfa yönlendirmelerini ve gezinmeyi sağlar. Route guards ise belirli sayfalara erişim kontrolü sağlamak için kullanılır.

// React Router is a popular library for routing in React applications. It provides a way to handle navigation and routing between different components and views in a single-page application.

//! Örnek Route Guard
// import { Route, Redirect } from "react-router-dom";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
//     }
//   />
// );

// ! *************************************

//? 18. What is JSX in React?

// JSX is a syntax extension used in React that allows you to write HTML-like code within JavaScript. It provides a convenient way to define the structure and appearance of React components

// JSX, React'te kullanılan bir syntax uzantısıdır ve JavaScript içinde HTML benzeri kod yazmanıza olanak tanır. React bileşenlerinin yapısını ve görünümünü tanımlamak için pratik bir yol sağlar.

//? 19. Bir react projesinde neden redux ve neden contex api kullanirim

//! Redux:

// Global State Yönetimi: Redux, uygulamanızın genelinde paylaşılan bir global state yönetimi sağlar. Büyük uygulamalarda, birbiriyle etkileşimde bulunan birçok bileşen arasında veri paylaşımını kolaylaştırabilir.
// Zorlu Durumlar İçin Ideal: Büyük ve karmaşık uygulamalarda, state'in kapsamlı bir şekilde takip edilmesi ve yönetilmesi gerektiğinde Redux kullanışlı olabilir. Redux, state değişikliklerini tahmin edilebilir ve izlenebilir bir şekilde yapma konusunda yardımcı olabilir.
// Middleware Desteği: Redux, middleware kullanarak asenkron operasyonları yönetmeyi kolaylaştırır. Bu, özellikle ağ çağrıları veya diğer yan etkilerle ilgili işlemleri yönetmek için kullanışlıdır.
// Global yapi iceren multilanguage, dark light modu
// model react kullanicilari, Redux tool kits i kullanir.

//! Context API:

// Daha Basit Projeler İçin: Küçük ve orta ölçekli projelerde, Context API kullanmak genellikle yeterlidir. Redux kullanmak bu tür projelerde gereksiz karmaşıklığa neden olabilir.
// React'in Kendi Çözümü: Context API, React tarafından sunulan bir özelliktir ve bu nedenle React ekosistemiyle daha iyi entegre olabilir. Redux, genellikle ek bir bağımlılık getirir.
// Component-Scoped State: Context API, bir bileşen ağacı içindeki belirli bileşenlere özgü state yönetimi sağlar. Bu, belirli bir bileşenin durumunu başka bir bileşenle paylaşmak istediğinizde kullanışlıdır.
// Proje ihtiyaçlarına bağlı olarak, küçük ve orta ölçekli projelerde Context API kullanmak yeterli olabilir. Ancak büyük ve karmaşık uygulamalarda, özellikle state yönetimine dair gelişmiş özelliklere ihtiyaç duyulduğunda Redux daha uygun olabilir. Ayrıca, Redux ve Context API'yi bir arada kullanmak da mümkündür. Örneğin, küçük bileşenlerde yerel state yönetiminde Context API'yi kullanabilirken, genel uygulama durumu için Redux'i kullanabilirsiniz.

//? 20. React in ana ozellikleri nelerdir, avantaji nedir, JSX kavrami nedir? Felix Hoca
// JSX yaziyoruz. JSX gercek bir HTML degil. Peki bunu browser nasil anliyor? get elementler yapiyoruz. create elementler yapiyoruz. bunlarin donusturulmesi lazim. bunu yapen babeldir.

//? 21. Babel nedir? What is the Babel? Felix Hoca
// Babel, JavaScript kodunu farklı tarayıcılarda veya platformlarda çalışabilmesi için dönüştüren bir JavaScript derleyicisidir. React projelerinde genellikle JSX (JavaScript XML) sözdizimini ve ECMAScript 6 (ES6) veya daha sonraki sürümlerdeki JavaScript özelliklerini desteklemek için kullanılır.

// React uygulamaları genellikle JSX kullanarak UI (Kullanıcı Arayüzü) oluştururlar. JSX, JavaScript'e benzer bir sözdizimi sağlar ancak HTML benzeri bir görünüme sahiptir. Tarayıcılar doğrudan JSX kodunu anlayamazlar, bu nedenle bu JSX kodu Babel gibi araçlar kullanılarak standart JavaScript'e çevrilir.

// Babel, kaynak kodunuzu tarayıcılar tarafından anlaşılabilir JavaScript'e dönüştürmenin yanı sıra, farklı JavaScript sürümlerini destekleme ve farklı tarayıcılarda çalışabilme yeteneği sağlar. Bu, geliştiricilere modern JavaScript özelliklerini kullanma özgürlüğü tanır ve projelerin farklı tarayıcılarda sorunsuz çalışmasını sağlar.

// React projelerinde genellikle bir dizi Babel paketi ve konfigürasyon dosyası kullanılır. Bu, geliştiricilere proje ihtiyaçlarına göre Babel'i yapılandırma esnekliği sağlar.

//* Babel is a JavaScript compiler that transforms JavaScript code to make it work on different browsers or platforms. In React projects, it is commonly used to support JSX (JavaScript XML) syntax and JavaScript features from ECMAScript 6 (ES6) or later versions.

//* React applications often use JSX to create the User Interface (UI). JSX has a syntax that resembles JavaScript but looks similar to HTML. Since browsers cannot directly understand JSX code, tools like Babel are used to transpile it into standard JavaScript.

//* Babel not only translates your source code into JavaScript understandable by browsers but also provides support for different versions of JavaScript and ensures compatibility across various browsers. This allows developers the freedom to use modern JavaScript features and ensures smooth operation of projects on different browsers.

//* In React projects, a set of Babel packages and a configuration file are typically used. This allows developers the flexibility to configure Babel based on the specific needs of their projects.

//? 22. Webpack nedir? What is the Webpack? Felix Hoca
// react projesi nasil canliya geciyor? ben bunu nasil host ederim? bana host edecek bir alan lazim. BUILT etmek kavrami ile cozerim. projeyi build ediyoruz ve build edilmis halini koyuyoruz. cunku bizim yazdigimiz react kodunu browser anlamaz. build edilip o halini koymak lazim. Gereken Dosyalari derleyen skistiran ise webpack oluyor. webpack gereken programlari paketleme yapar. Bundler gibi

// React'te "build" terimi, geliştirilen bir React uygulamasının üretim ortamına hazır hale getirilmesi anlamına gelir. Geliştirme aşamasında, genellikle kaynak kodu üzerinde çalışılır ve bu kodunun düzenlenmesi, hata ayıklanması ve geliştirme sırasında kullanılan diğer araçlarla işlenir. Ancak, bir uygulama kullanıma hazır hale geldiğinde ve kullanıcılara sunulacağında, bu kaynak kodu genellikle optimize edilir, birleştirilir ve sıkıştırılır. Bu sürecin sonucunda elde edilen dosyaların bütününe "build" denir.

// Webpack ise, modüler JavaScript uygulamalarının ve diğer dosyaların paketlenmesi için kullanılan bir araçtır. Webpack, proje içindeki farklı modülleri birleştirir, gerekirse dönüştürür (transpile), ve uygulamanın performansını artırmak için çeşitli optimizasyonlar uygular. Ayrıca, Webpack, bir uygulamanın geliştirme ve üretim ortamları arasında geçiş yapmayı kolaylaştıran bir dizi özellik sunar.

// React projelerinde, genellikle Webpack kullanılarak bir "build" süreci oluşturulur. Bu süreç, kaynak kodunu optimize eder, gerekli bağımlılıkları yönetir ve kullanıma hazır bir şekilde teslim edilecek üretim dosyalarını üretir. Bu sayede, daha hızlı yükleme süreleri, daha küçük dosya boyutları ve genel olarak daha iyi bir performans elde edilebilir.

//* In React, the term "build" refers to the process of preparing a developed React application for the production environment. During the development phase, developers typically work on the source code, making edits, debugging, and using other tools for development purposes. However, when an application is ready for deployment and delivery to users, the source code is often optimized, bundled, and compressed. The entirety of these resulting files is referred to as the "build."

//* Webpack, on the other hand, is a tool used for bundling modular JavaScript applications and other files. Webpack combines different modules within a project, transpiles them if necessary, and applies various optimizations to enhance the performance of the application. Additionally, Webpack provides features that facilitate transitioning between development and production environments.

//* In React projects, a "build" process is typically created using Webpack. This process optimizes the source code, manages dependencies, and generates production-ready files that are ready for deployment. This results in faster loading times, smaller file sizes, and overall improved performance when delivering the application.

//? 23. React te life cycle lar nelerdir? Felix Hoca
//

//? 24. Suan canli olarak Api den veri ceker misiniz? Felix Hoca

// ornek api = "https://jsonplaceholder.typicode.com/users"

//! ORNEK  axios, get, then ,catch
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://jsonplaceholder.typicode.com/users")
//       .then((response) => setData(response.data))
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       {data.map((item) => {
//         return <div key={item.id}>{item.name}</div>;
//       })}
//     </div>
//   );
// };

// export default App;
//! *********

//! ORNEK  fetch data, try , if, catch
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const url = "https://reqres.in/api/users";

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);

//         if (!response.ok) {
//           throw new Error("API request failed");
//         }
//         const responseData = await response.json();
//         setData(responseData);
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     console.log(data.data);
//     fetchData();
//   }, []);

//   return <div></div>;
// };

// export default App;
//! *********

//! ORNEK  fetch, then, catch

//! *********

// FEEDBACK
// stajda calistignizi goster, pratik olarak da gostermen lazim, teorik in yani sira.
// syntax lari yazamya calis, useEffect, useState. bakmadan yazicak gibi hazir ol.
// JS in temelelrine hakim ol. temel concept. tekrar gixden gecir.
// tamamen kendini goster. eksiklerini gor ve calis.
// teorik kavramlari unutmusum.
// canli kod yazma her an karsina cikabilir. yada sana task verecektir. code challenge de yapilabilir.
// Neyi yaptgimi tam olarak bilmek istiyorum.!!!!
// kafa karisikligini yenmek istiyorum.
// Belli basli tanimlari bil.
// Tedirginligimi ve heyecanimi yenmek istiyorum.
// butun tuslara basip bolum gecmeye calisma
// JavaScriptin super seti. Basta sadece Type definition yapiyoruz.

//? 25. Typescript nedir? Nathan Hoca
// JavaScriptin super seti. Basta sadece Type definition yapiyoruz.
