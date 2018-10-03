// import React from 'react';

// class Bancor extends React.Component {

//   componentDidMount() {
//     let EmbedManager;
//     const script = document.createElement('script');
//     script.setAttribute(
//       'src', 
//       'https://widget-convert.bancor.network/v1');

//     script.addEventListener('load', () => {
//         BancorConvertWidget.init({
//             type: "1",
//             blockchainType: "ethereum",
//             baseCurrencyId: "594bb7e468a95e00203b048d",
//             pairCurrencyId: "5937d635231e97001f744267",
//             primaryColor: "#102644",
//             displayCurrency: "ETH"
//         });
//     });
//     document.body.appendChild(script);
//   }

//   render() {
//     return (
//       <div>
//         <div id="apply_form">
//           <a name="form" id="formAnchor"></a>
//         </div>
//       </div>
//     );
//   }
// }

// export default Bancor;