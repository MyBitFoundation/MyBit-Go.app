const blueMain = '#1890FF';
const blueSummer = '#3CBCF7';
const blueDenim = '#125AC4';
const blueViolet = '#0B3F9C';
const blueDark = '#001358';
const black = '#111111';
const black2 = '#383838';
const black3 = '#575757';
const blackish = '#333333';
const antBase = 'rgba(0, 0, 0, 0.65)';
const grayBase = '#6C6C6C';
const gray2 = '#868686';
const grayLight = '#B1B1B1';
const grayUltraLight = '#D9D9D9';

const lightBlue = '#e6f7FF';
const blueHover = '#40a9ff';
const blueActive = '#096dd9';
const green = '#00F281';
const greenHover = '#55EAA5';
const greenActive = '#00C368';

const Theming = {
  colors: {
    backgroundGradientHorizontal: 'linear-gradient(62deg, #001358, #125ac4);',
    backgroundGradientVertical: 'linear-gradient(to top, #001358, #125ac4);',
    blueMain,
    blueSummer,
    blueDenim,
    blueViolet,
    black,
    black2,
    black3,
    antBase,
    grayBase,
    gray2,
    grayLight,
    grayUltraLight,
    blackish,
    blueHover,
  },
  spin: {
    color: blueMain,
  },
  footer: {
    maxWidth: '1200px',
    backgroundColor: 'linear-gradient(114deg, #001358, #125ac4);',
    padding: '40px',
    titleColor: '#ffffff',
    linkColor: 'rgba(255,255,255,0.8)',
    linkColorHover: blueMain,
    textColor: 'rgba(255,255,255,0.8)',
    breakAt: '900px',
    titleSize: '18px',
    linkSize: '16px',
    textSize: '16px',
  },
  pagination: {
    color: 'rgba(0, 0, 0, 0.65)',
    borderColor: '#d9d9d9',
    backgroundColor: '#ffffff',
    itemActiveBorderColor: blueMain,
    itemHoverBorderColor: blueMain,
    disabledItemBorderColor: '#d9d9d9',
    disabledItemColor: 'rgba(0, 0, 0, 0.25)',
  },
  menu: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    itemHoverColor: blueMain,
    itemSelectedColor: blueMain,
    borderBottom: `2px solid ${blueMain}`,
    backgroundColorItem: lightBlue,
  },
  dropdown: {
    submenu: {
      colorHover: lightBlue,
    },
    trigger: {
      color: blueMain,
      colorHover: blueHover,
    },
  },
  filters: {
    checkedState: {
      color: blueMain,
      backgroundColor: lightBlue,
      borderColor: '#91d5ff',
    },
    uncheckedState: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: 'rgba(0, 0, 0, 0.65)',
    },
    hoverState: {
      color: blueMain,
    },
  },
  switch: {
    checked: {
      backgroundColor: blueMain,
    },
    unchecked: {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
    },
  },
  heading: {
    color: 'black',
  },
  buttons: {
    primary: {
      green: {
        color: 'white',
        colorHover: 'white',
        colorActive: '',
        backgroundColor: green,
        backgroundColorHover: greenHover,
        backgroundColorActive: greenActive,
        borderColor: green,
        borderColorHover: greenHover,
        borderColorActive: greenActive,
      },
      blue: {
        color: 'white',
        colorHover: 'white',
        colorActive: 'white',
        backgroundColor: blueMain,
        backgroundColorHover: blueHover,
        backgroundColorActive: blueActive,
        borderColor: blueMain,
        borderColorHover: blueHover,
        borderColorActive: blueActive,
      },
    },
    secondary: {
      default: {
        color: 'white',
        colorHover: blueHover,
        colorActive: blueActive,
        backgroundColor: 'transparent',
        backgroundColorHover: 'transparent',
        backgroundColorActive: 'transparent',
        borderColor: 'white',
        borderColorHover: blueHover,
        borderColorActive: blueActive,
      },
      back: {
        color: 'rgba(0, 0, 0, 0.65)',
        colorHover: blueHover,
        colorActive: blueActive,
        backgroundColor: 'transparent',
        backgroundColorHover: 'transparent',
        backgroundColorActive: '#ffffff',
        borderColor: '#d9d9d9',
        borderColorHover: blueHover,
        borderColorActive: blueActive,
      },
    },
  },
};

export default Theming;
