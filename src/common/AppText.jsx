import React from 'react';
import {Text, StyleSheet, TextStyle, TextProps} from 'react-native';
import {
  fontFamily,
  fontFamilyBold,
  fontFamilyMedium,
  fontFamilySemiBold,
} from '../theme/typography';
import {colors} from '../theme/colors';

export const THIRTEEN = 'THIRTEEN';
export const FIFTEEN = 'FIFTEEN';
export const SIXTEEN = 'SIXTEEN';
export const TWENTY = 'TWENTY';
export const TWENTY_FOUR = 'TWENTY_FOUR';
export const TWENTY_SIX = 'TWENTY_SIX';
export const FOURTEEN = 'FOURTEEN';
export const EIGHTEEN = 'EIGHTEEN';
export const SEVENTEEN = 'SEVENTEEN';
export const NINETEEN = 'NINETEEN';
export const TWELVE = 'TWELVE';
export const FORTY = 'FORTY';
export const TWENTY_TWO = 'TWENTY_TWO';
export const THIRTY_FOUR = 'THIRTY_FOUR';
export const THIRTY = 'THIRTY';
export const ELEVEN = 'ELEVEN';
export const TEN = 'TEN';
export const EIGHT = 'EIGHT';
export const NINE = 'NINE';

export const NORMAL = 'normal';
export const SEMI_BOLD = 'semibold';
export const MEDIUM = 'MEDIUM';
export const BOLD = 'BOLD';

export const WHITE = 'WHITE';
export const BLACK = 'BLACK';
export const YELLOW = 'YELLOW';
export const SECOND = 'SECOND';
export const THIRD = 'THIRD';
export const RED = 'RED';
export const GREEN = 'GREEN';
export const AMBER = 'AMBER';
export const BLUE = 'BLUE';
export const CHANGETEXT = 'CHANGETEXT';
export const BELOWTEXT = 'BELOWTEXT';
export const TEXTCOLOR = "TEXTCOLOR";
export const KYCDARKBLUE = 'KYCDARKBLUE';
export const HISTORYTEXT = "HISTORYTEXT";
export const ORDERTEXT = "ORDERTEXT";

const AppText = ({
  type,
  weight,
  style,
  color,
  numberOfLines,
  ...props
}) => {
  const getTextStyle = (type, weight, color) => {
    var style = {
      fontFamily: fontFamily,
    };
    switch (type) {
      case FORTY:
        style['fontSize'] = 40;
        break;
      case THIRTY_FOUR:
        style['fontSize'] = 34;
        break;
      case THIRTY:
        style['fontSize'] = 30;
        break;
      case TWENTY_SIX:
        style['fontSize'] = 26;
        break;
      case TWENTY_FOUR:
        style['fontSize'] = 24;
        break;
      case TWENTY_TWO:
        style['fontSize'] = 22;
        break;
      case TWENTY:
        style['fontSize'] = 20;
        break;
      case NINETEEN:
        style['fontSize'] = 19;
        break;
      case EIGHTEEN:
        style['fontSize'] = 18;
        break;
      case SEVENTEEN:
        style['fontSize'] = 17;
        break;
      case SIXTEEN:
        style['fontSize'] = 16;
        break;
      case FIFTEEN:
        style['fontSize'] = 15;
        break;
      case FOURTEEN:
        style['fontSize'] = 14;
        break;
      case THIRTEEN:
        style['fontSize'] = 13;
        break;
      case ELEVEN:
        style['fontSize'] = 11;
        break;
      case TEN:
        style['fontSize'] = 10;
        break;
      case NINE:
        style['fontSize'] = 9;
        break;
      case EIGHT:
        style['fontSize'] = 8;
        break;
      default:
        style['fontSize'] = 12;
    }

    switch (weight) {
      case NORMAL:
        style['fontFamily'] = fontFamily;
        break;
      case MEDIUM:
        style['fontFamily'] = fontFamilyMedium;
        break;
      case SEMI_BOLD:
        style['fontFamily'] = fontFamilySemiBold;
        break;
      case BOLD:
        style['fontFamily'] = fontFamilyBold;
        break;
      default:
        style['fontFamily'] = fontFamily;
    }

    switch (color) {
      case WHITE:
        style['color'] = colors.white;
        break;
      case BLACK:
        style['color'] = colors.black;
        break;
      case YELLOW:
        style['color'] = colors.buttonBg;
        break;
      case SECOND:
        style['color'] = colors.secondaryText;
        break;
      case THIRD:
        style['color'] = colors.thirdText;
        break;
      case RED:
        style['color'] = colors.red;
        break;
      case GREEN:
        style['color'] = colors.green;
        break;
      case AMBER:
        style['color'] = colors.amber;
        break;
      case BLUE:
        style['color'] = colors.blue;
        break;
      case CHANGETEXT:
        style['color'] = colors.changeText;
        break;
        case BELOWTEXT:
        style['color'] = colors.belowText;
        break;
        case TEXTCOLOR:
        style['color'] = colors.textColor;
        break;
        case KYCDARKBLUE:
        style['color'] = colors.KycDarkBlue;
        break;
        case HISTORYTEXT:
        style['color'] = colors.historyText;
        break;
        case ORDERTEXT:
        style['color'] = colors.orderBookText;
        break;

      default:
        style['color'] = colors.white;
    }

    return style;
  };
  const styles = {
    text: (type, weight, color) => ({
      ...getTextStyle(type, weight, color),
    }),
  };
  return (
    <Text
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([styles.text(type, weight, color), style])}
      {...props}
    />
  );
};

export {AppText};
